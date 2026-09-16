import asyncio
from sqlalchemy import select
from app.core.security import hash_password
from app.db.curriculum_data import BOARDS, SSC_STREAMS, HSSC_STREAMS
from app.db.session import SessionLocal, engine
from app.models import Base, Class, CurriculumBoard, CurriculumClass, CurriculumCombination, CurriculumStream, CurriculumSubject, User, UserRole, Verification

async def seed_curriculum(db):
    for board_data in BOARDS:
        board = await db.get(CurriculumBoard, board_data["id"])
        if not board:
            board = CurriculumBoard(**board_data); db.add(board)
        for level in range(9, 13):
            class_id = f'{board_data["id"]}-class-{level}'
            curriculum_class = await db.get(CurriculumClass, class_id)
            if not curriculum_class:
                curriculum_class = CurriculumClass(id=class_id, board_id=board_data["id"], level=level, name=f"Class {level}", code=f"CLASS-{level}")
                db.add(curriculum_class); await db.flush()
            streams = SSC_STREAMS if level <= 10 else HSSC_STREAMS
            for stream_data in streams:
                stream_id = f'{class_id}-{stream_data["id"]}'
                stream = await db.get(CurriculumStream, stream_id)
                if not stream:
                    stream = CurriculumStream(id=stream_id, class_id=class_id, name=stream_data["name"], code=stream_data["code"], description=stream_data["description"])
                    db.add(stream); await db.flush()
                for combo_data in stream_data["combinations"]:
                    combo_id = f'{stream_id}-{combo_data["id"]}'
                    combo = await db.get(CurriculumCombination, combo_id)
                    if not combo:
                        combo = CurriculumCombination(id=combo_id, stream_id=stream_id, name=combo_data["name"], description=combo_data["description"])
                        db.add(combo); await db.flush()
                    for subject in combo_data["subjects"]:
                        subject_id = f'{combo_id}-{subject["id"]}'
                        if not await db.get(CurriculumSubject, subject_id):
                            db.add(CurriculumSubject(id=subject_id, combination_id=combo_id, name=subject["name"], code=subject["code"], is_compulsory=subject["is_compulsory"]))

async def main():
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    async with SessionLocal() as db:
        await seed_curriculum(db)
        accounts = [("admin@studypilot.pk", "Admin@12345", "Admin", UserRole.admin, Verification.verified), ("teacher@studypilot.pk", "Teacher@12345", "Demo Teacher", UserRole.teacher, Verification.verified), ("student@studypilot.pk", "Student@12345", "Demo Student", UserRole.student, Verification.verified)]
        users = []
        for email, password, name, role, status in accounts:
            user = await db.scalar(select(User).where(User.email == email))
            if not user:
                user = User(email=email, hashed_password=hash_password(password), name=name, role=role, verification_status=status); db.add(user); await db.flush()
            users.append(user)
        if not await db.scalar(select(Class).where(Class.code == "FB2A7K")):
            db.add(Class(code="FB2A7K", name="Class 10-A Science", board_id="fbise", class_level=10, rep_teacher_id=users[1].id))
        await db.commit()

if __name__ == "__main__": asyncio.run(main())
