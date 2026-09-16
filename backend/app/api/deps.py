from fastapi import Depends,HTTPException,status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.models import User,UserRole,Verification
from app.core.security import decode_token
oauth2=OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")
async def current_user(token:str=Depends(oauth2),db:AsyncSession=Depends(get_db)):
    try: uid=decode_token(token)
    except ValueError: raise HTTPException(401,"Invalid authentication credentials")
    user=await db.scalar(select(User).options(selectinload(User.academic_profile)).where(User.id==uid))
    if not user or not user.is_active: raise HTTPException(403,"Inactive or unavailable account")
    return user
def require_roles(*roles):
    async def dep(user=Depends(current_user)):
        if user.role.value not in roles: raise HTTPException(403,"Insufficient permissions")
        return user
    return dep
def require_verified(user=Depends(current_user)):
    if user.verification_status != Verification.verified: raise HTTPException(403,"Account pending institutional verification",headers={"code":"VERIFICATION_PENDING"})
    return user
