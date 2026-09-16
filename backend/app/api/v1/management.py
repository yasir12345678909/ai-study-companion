from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import require_roles
from app.db.session import get_db
from app.models import Class, ClassMember, Material, MaterialStatus, MembershipStatus, User, UserRole, Verification

router = APIRouter()

@router.get("/teachers/pending")
async def pending(user=Depends(require_roles("management", "admin")), db: AsyncSession = Depends(get_db)):
    rows = (await db.scalars(select(User).where(User.role == UserRole.teacher, User.verification_status == Verification.pending))).all()
    return [{"id": u.id, "email": u.email, "name": u.name, "verification_status": u.verification_status.value} for u in rows]

async def set_status(teacher_id, status, user, db):
    u = await db.get(User, teacher_id)
    if not u or u.role != UserRole.teacher: raise HTTPException(404, "Teacher not found")
    u.verification_status = status; await db.commit()
    return {"id": u.id, "verification_status": status.value}

@router.post("/teachers/{teacher_id}/verify")
async def verify(teacher_id, user=Depends(require_roles("management", "admin")), db: AsyncSession = Depends(get_db)):
    return await set_status(teacher_id, Verification.verified, user, db)

@router.post("/teachers/{teacher_id}/reject")
async def reject(teacher_id, user=Depends(require_roles("management", "admin")), db: AsyncSession = Depends(get_db)):
    return await set_status(teacher_id, Verification.rejected, user, db)

@router.get("/overview")
async def overview(user=Depends(require_roles("management", "admin")), db: AsyncSession = Depends(get_db)):
    pending_teachers = await db.scalar(select(func.count()).select_from(User).where(User.role == UserRole.teacher, User.verification_status == Verification.pending))
    active_classes = await db.scalar(select(func.count()).select_from(Class))
    enrolled_students = await db.scalar(select(func.count(func.distinct(ClassMember.student_id))).where(ClassMember.status == MembershipStatus.approved))
    verified_materials = await db.scalar(select(func.count()).select_from(Material).where(Material.status.in_([MaterialStatus.verified, MaterialStatus.completed])))
    return {"pending_teachers": pending_teachers or 0, "active_classes": active_classes or 0, "enrolled_students": enrolled_students or 0, "verified_materials": verified_materials or 0}
