import json
import time
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy import delete, desc, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import current_user
from app.db.session import get_db
from app.models import ClassMember, MembershipStatus, TutorMessage, TutorSession
from app.schemas import TutorAsk
from app.services.llm_service import complete
from app.services.rag_service import rag

router = APIRouter()


def _sources(metas):
    return [{
        "id": m.get("material_id"),
        "title": "Curriculum material",
        "page": m.get("page_number"),
        "type": "textbook" if m.get("source_tier") in ["official", "administration"] else "teacher",
    } for m in metas]


async def _session_and_history(data, user, db):
    if data.session_id:
        session = await db.get(TutorSession, data.session_id)
        if not session or session.user_id != user.id:
            raise HTTPException(404, "Session not found")
    else:
        session = TutorSession(user_id=user.id, subject_id=data.subject, title=data.prompt[:80])
        db.add(session)
        await db.flush()
    previous = (await db.scalars(
        select(TutorMessage)
        .where(TutorMessage.session_id == session.id)
        .order_by(desc(TutorMessage.created_at))
        .limit(6)
    )).all()
    return session, list(reversed(previous))


async def _answer(data, user, db):
    started = time.time()
    session, previous = await _session_and_history(data, user, db)
    user_message = TutorMessage(session_id=session.id, role="user", content=data.prompt)
    db.add(user_message)
    await db.flush()
    history = [{"role": message.role, "content": message.content} for message in previous]
    history.append({"role": "user", "content": data.prompt})
    enrolled_class_ids = list(await db.scalars(select(ClassMember.class_id).where(ClassMember.student_id == user.id, ClassMember.status == MembershipStatus.approved)))
    where = rag.build_where(data.subject, data.include_class_materials, enrolled_class_ids)
    chunks = rag.query(data.prompt, where, 4)
    docs = (chunks.get("documents") or [[]])[0]
    metas = (chunks.get("metadatas") or [[]])[0]
    context = "\n\n".join(docs)
    prompt = (
        "You are StudyPilot Curriculum AI Tutor for Pakistan Board exams. "
        "Use verified curriculum excerpts only.\n"
        f"Question: {data.prompt}\nConversation history: {json.dumps(history[-6:])}\n"
        f"Excerpts:\n{context}"
    )
    content, model = await complete(prompt, history[-6:])
    if model == "unavailable":
        await db.rollback()
        raise HTTPException(503, "AI Tutor service is temporarily unavailable. Please try again shortly.", headers={"code": "LLM_SERVICE_UNAVAILABLE"})
    sources = _sources(metas)
    blocks = [{"type": "text", "content": content}]
    assistant = TutorMessage(
        session_id=session.id, role="assistant", content=content,
        sources=sources, response_blocks=blocks, model_name=model,
        latency_ms=int((time.time() - started) * 1000),
    )
    db.add(assistant)
    await db.commit()
    return assistant, session.id, sources, blocks


@router.post("/ask")
async def ask(data: TutorAsk, user=Depends(current_user), db: AsyncSession = Depends(get_db)):
    assistant, session_id, sources, blocks = await _answer(data, user, db)
    return {
        "id": assistant.id, "role": "assistant", "content": assistant.content,
        "sources": sources, "responseBlocks": blocks,
        "suggestedActions": ["Explain with diagram", "Give FBISE past paper example"],
        "session_id": session_id,
    }


@router.post("/ask/stream")
async def ask_stream(data: TutorAsk, user=Depends(current_user), db: AsyncSession = Depends(get_db)):
    assistant, session_id, sources, blocks = await _answer(data, user, db)

    async def events():
        for token in assistant.content.split(" "):
            yield f"data: {json.dumps({'content': token + ' '})}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(events(), media_type="text/event-stream", headers={"Cache-Control": "no-cache", "X-Session-Id": session_id})


@router.get("/sessions")
async def sessions(user=Depends(current_user), db: AsyncSession = Depends(get_db)):
    rows = (await db.scalars(select(TutorSession).where(TutorSession.user_id == user.id).order_by(desc(TutorSession.updated_at)))).all()
    return [{"id": s.id, "subject_id": s.subject_id, "title": s.title, "created_at": s.created_at, "updated_at": s.updated_at} for s in rows]


@router.get("/sessions/{session_id}")
async def session(session_id: str, user=Depends(current_user), db: AsyncSession = Depends(get_db)):
    s = await db.get(TutorSession, session_id)
    if not s or s.user_id != user.id:
        raise HTTPException(404, "Session not found")
    rows = (await db.scalars(select(TutorMessage).where(TutorMessage.session_id == s.id).order_by(TutorMessage.created_at))).all()
    return {"id": s.id, "title": s.title, "messages": [{"id": m.id, "role": m.role, "content": m.content, "sources": m.sources, "responseBlocks": m.response_blocks, "created_at": m.created_at} for m in rows]}


@router.patch("/sessions/{session_id}")
async def rename_session(session_id: str, payload: dict, user=Depends(current_user), db: AsyncSession = Depends(get_db)):
    s = await db.get(TutorSession, session_id)
    if not s or s.user_id != user.id:
        raise HTTPException(404, "Session not found")
    title = str(payload.get("title", "")).strip()
    if not title:
        raise HTTPException(422, "Session title is required")
    s.title = title[:120]
    await db.commit()
    return {"id": s.id, "title": s.title}


@router.delete("/sessions/{session_id}")
async def delete_session(session_id: str, user=Depends(current_user), db: AsyncSession = Depends(get_db)):
    s = await db.get(TutorSession, session_id)
    if not s or s.user_id != user.id:
        raise HTTPException(404, "Session not found")
    await db.delete(s)
    await db.commit()
    return {"status": "deleted"}
