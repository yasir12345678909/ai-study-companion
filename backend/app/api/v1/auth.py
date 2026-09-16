from fastapi import APIRouter,Depends,HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.models import User,AcademicProfile,UserRole,Verification
from app.schemas import RegisterIn,TokenOut,ProfileIn
from app.core.security import hash_password,verify_password,create_access_token
from app.api.deps import current_user
router=APIRouter()
@router.post("/token",response_model=TokenOut)
async def token(form:OAuth2PasswordRequestForm=Depends(),db:AsyncSession=Depends(get_db)):
    email=form.username.strip().lower(); u=await db.scalar(select(User).where(User.email==email))
    if not u or not verify_password(form.password,u.hashed_password): raise HTTPException(401,"Incorrect email or password")
    return {"access_token":create_access_token(u.id),"token_type":"bearer"}
@router.post("/register",response_model=TokenOut)
async def register(data:RegisterIn,db:AsyncSession=Depends(get_db)):
    if data.role=="admin": raise HTTPException(403,"Public admin registration is disabled")
    if data.role not in ["student","teacher","management"]: raise HTTPException(400,"Invalid registration role")
    email=str(data.email).strip().lower()
    if await db.scalar(select(User).where(User.email==email)): raise HTTPException(409,"Email is already registered")
    status=Verification.verified if data.role=="student" else Verification.pending
    u=User(email=email,name=data.name.strip(),hashed_password=hash_password(data.password),role=UserRole(data.role),verification_status=status)
    db.add(u); await db.commit(); await db.refresh(u)
    return {"access_token":create_access_token(u.id),"token_type":"bearer"}
@router.get("/me")
async def me(user=Depends(current_user)):
    p=user.academic_profile
    return {"id":user.id,"email":user.email,"name":user.name,"role":user.role.value,"verification_status":user.verification_status.value,"is_active":user.is_active,"academic_profile":({"boardId":p.board_id,"boardName":p.board_name,"classLevel":p.class_level,"streamId":p.stream_id,"streamName":p.stream_name,"combinationId":p.combination_id,"combinationName":p.combination_name,"subjects":p.subjects,"rollNumber":p.roll_number} if p else None)}
@router.put("/academic-profile")
@router.post("/academic-profile")
async def profile(data:ProfileIn,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
    if user.role != UserRole.student: raise HTTPException(403,"Only students may set academic profiles")
    p=await db.scalar(select(AcademicProfile).where(AcademicProfile.user_id==user.id))
    if not p:p=AcademicProfile(user_id=user.id);db.add(p)
    for k,v in data.model_dump().items():setattr(p,k,v)
    try: await db.commit()
    except Exception: await db.rollback();raise HTTPException(409,"Roll number is already registered for this board and class")
    return {"status":"saved"}
