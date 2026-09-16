import secrets
from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy import select,and_
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.models import Class,ClassMember,ClassTeacher,MembershipStatus,UserRole,Verification
from app.schemas import ClassCreate
from app.api.deps import current_user,require_verified,require_roles
router=APIRouter(); alphabet="23456789ABCDEFGHJKLMNPQRSTUVWXYZ"
def code():return "".join(secrets.choice(alphabet) for _ in range(6))
@router.post("/")
async def create(data:ClassCreate,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
 if user.role not in [UserRole.teacher,UserRole.management,UserRole.admin] or user.verification_status!=Verification.verified: raise HTTPException(403,"Verified account required")
 c=Class(code=code(),name=data.name,board_id=data.board_id,class_level=data.class_level,rep_teacher_id=user.id);db.add(c);await db.flush()
 if user.role==UserRole.teacher:
  for s in data.subject_ids or ["general"]:db.add(ClassTeacher(class_id=c.id,teacher_id=user.id,subject_id=s,teacher_role="representative"))
 await db.commit();return {"id":c.id,"code":c.code,"name":c.name,"board_id":c.board_id,"class_level":c.class_level}
@router.get("/code/{class_code}")
async def lookup(class_code:str,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
 c=await db.scalar(select(Class).where(Class.code==class_code.upper()));
 if not c:raise HTTPException(404,"Class not found")
 teacher=await db.get(__import__('app.models',fromlist=['User']).User,c.rep_teacher_id);return {"id":c.id,"name":c.name,"board_id":c.board_id,"class_level":c.class_level,"rep_teacher_name":teacher.name if teacher else None}
@router.post("/join/{class_code}")
async def join(class_code:str,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
 if user.role!=UserRole.student:raise HTTPException(403,"Only students can join classes")
 c=await db.scalar(select(Class).where(Class.code==class_code.upper()));
 if not c:raise HTTPException(404,"Class not found")
 m=await db.scalar(select(ClassMember).where(and_(ClassMember.class_id==c.id,ClassMember.student_id==user.id)))
 if m and m.status==MembershipStatus.pending:raise HTTPException(400,"Join request is already pending approval")
 if m and m.status==MembershipStatus.approved:raise HTTPException(400,"You are already an active member of this class")
 if m:m.status=MembershipStatus.pending
 else:m=ClassMember(class_id=c.id,student_id=user.id);db.add(m)
 await db.commit();return {"id":m.id,"class_id":c.id,"student_id":user.id,"status":m.status.value}
def rep(class_id,user,db):return select(Class).where(Class.id==class_id,Class.rep_teacher_id==user.id)
@router.get("/{class_id}/requests")
async def requests(class_id:str,user=Depends(require_verified),db:AsyncSession=Depends(get_db)):
 c=await db.scalar(rep(class_id,user,db));
 if not c:raise HTTPException(403,"Only the representative teacher may manage requests")
 rows=(await db.scalars(select(ClassMember).where(ClassMember.class_id==class_id,ClassMember.status==MembershipStatus.pending))).all();return [{"id":m.id,"student_id":m.student_id,"class_id":m.class_id,"status":m.status.value} for m in rows]
async def review(class_id,membership_id,status,user,db):
 c=await db.scalar(rep(class_id,user,db));
 if not c:raise HTTPException(403,"Only the representative teacher may manage requests")
 m=await db.scalar(select(ClassMember).where(ClassMember.id==membership_id,ClassMember.class_id==class_id));
 if not m:raise HTTPException(404,"Membership request not found")
 m.status=status;await db.commit();return {"id":m.id,"status":m.status.value}
@router.post("/{class_id}/requests/{membership_id}/approve")
async def approve(class_id,membership_id,user=Depends(require_verified),db:AsyncSession=Depends(get_db)):return await review(class_id,membership_id,MembershipStatus.approved,user,db)
@router.post("/{class_id}/requests/{membership_id}/reject")
async def reject(class_id,membership_id,user=Depends(require_verified),db:AsyncSession=Depends(get_db)):return await review(class_id,membership_id,MembershipStatus.rejected,user,db)
@router.delete("/{class_id}/members/{student_id}")
async def remove(class_id,student_id,user=Depends(require_verified),db:AsyncSession=Depends(get_db)):
 c=await db.scalar(rep(class_id,user,db));
 if not c:raise HTTPException(403,"Only the representative teacher may remove members")
 m=await db.scalar(select(ClassMember).where(ClassMember.class_id==class_id,ClassMember.student_id==student_id));
 if not m:raise HTTPException(404,"Membership not found")
 await db.delete(m);await db.commit();return {"status":"removed"}
