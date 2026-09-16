from datetime import datetime,timedelta,timezone
import hashlib
from jose import jwt,JWTError
from passlib.context import CryptContext
from .config import settings
pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")
ALGORITHM="HS256"
def _bcrypt_input(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()
def hash_password(password:str)->str: return pwd_context.hash(_bcrypt_input(password))
def verify_password(password:str,hashed:str)->bool: return pwd_context.verify(_bcrypt_input(password),hashed)
def create_access_token(subject:str)->str:
    exp=datetime.now(timezone.utc)+timedelta(minutes=settings.access_token_expire_minutes)
    return jwt.encode({"sub":subject,"exp":exp},settings.jwt_secret_key,algorithm=ALGORITHM)
def decode_token(token:str)->str:
    try:
        payload=jwt.decode(token,settings.jwt_secret_key,algorithms=[ALGORITHM])
        sub=payload.get("sub")
        if not sub: raise ValueError
        return sub
    except (JWTError,ValueError) as e: raise ValueError("Invalid token") from e
