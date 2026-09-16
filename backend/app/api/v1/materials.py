import os,uuid
from pathlib import Path
from fastapi import APIRouter,Depends,HTTPException,UploadFile,File,Form
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from pypdf import PdfReader
from app.db.session import get_db
from app.models import Material,MaterialTier,MaterialStatus,ClassMaterial,Class,UserRole,Verification
from app.core.config import settings
from app.api.deps import current_user,require_verified,require_roles
from app.services.rag_service import rag
router=APIRouter();ALLOWED={"application/pdf":"pdf","image/png":"image","image/jpeg":"image","text/plain":"notes"}
@router.post("/upload")
async def upload(file:UploadFile=File(...),title:str=Form(...),subject_id:str=Form(...),chapter_id:str|None=Form(None),class_id:str|None=Form(None),user=Depends(current_user),db:AsyncSession=Depends(get_db)):
 if user.verification_status!=Verification.verified:raise HTTPException(403,"Account pending institutional verification")
 if file.content_type not in ALLOWED:raise HTTPException(415,"Unsupported file type")
 data=await file.read();
 if len(data)>25*1024*1024:raise HTTPException(413,"Maximum file size is 25 MB")
 tier=MaterialTier.student if user.role==UserRole.student else MaterialTier.teacher if user.role==UserRole.teacher else MaterialTier.official
 status=MaterialStatus.pending if tier==MaterialTier.student else MaterialStatus.verified
 mid=str(uuid.uuid4()); folder=Path(settings.upload_dir)/mid;folder.mkdir(parents=True);path=folder/file.filename;path.write_bytes(data)
 m=Material(id=mid,title=title,subject_id=subject_id,chapter_id=chapter_id,file_path=str(path),type=ALLOWED[file.content_type],source_tier=tier,status=status,uploader_id=user.id);db.add(m)
 if class_id:db.add(ClassMaterial(class_id=class_id,material_id=mid,assigned_by=user.id))
 await db.commit();return {"id":mid,"status":status.value,"file_path":str(path)}
@router.post("/{material_id}/verify")
async def verify(material_id:str,user=Depends(current_user),db:AsyncSession=Depends(get_db)):
 m=await db.get(Material,material_id);
 if not m:raise HTTPException(404,"Material not found")
 if user.role not in [UserRole.management,UserRole.admin,UserRole.teacher]:raise HTTPException(403,"Not allowed")
 if user.role == UserRole.teacher:
  assigned = await db.scalar(select(ClassMaterial).join(Class, Class.id == ClassMaterial.class_id).where(ClassMaterial.material_id == material_id, Class.rep_teacher_id == user.id))
  if not assigned: raise HTTPException(403,"Only the representative teacher of an assigned class may verify this material")
 m.status=MaterialStatus.verified; m.source_tier=MaterialTier.teacher if user.role==UserRole.teacher else m.source_tier;await db.commit();return {"id":m.id,"status":m.status.value}
@router.post("/{material_id}/index")
async def index(material_id:str,user=Depends(require_roles("teacher","management","admin")),db:AsyncSession=Depends(get_db)):
 m=await db.get(Material,material_id);
 if not m:raise HTTPException(404,"Material not found")
 if m.source_tier==MaterialTier.student and m.status!=MaterialStatus.verified:raise HTTPException(409,"Student material must be verified before indexing")
 m.status=MaterialStatus.extracting;await db.commit();text=""
 assignment=await db.scalar(select(ClassMaterial).where(ClassMaterial.material_id==m.id))
 if m.type=="pdf":text="\n".join((p.extract_text() or "") for p in PdfReader(m.file_path).pages)
 elif m.type=="notes":text=Path(m.file_path).read_text(errors="ignore")
 if text:
  m.status=MaterialStatus.embedding;await db.commit();rag.index(m.id,text,{"subject_id":m.subject_id,"chapter_id":m.chapter_id or "","source_tier":m.source_tier.value,"verification_status":m.status.value,"class_id":assignment.class_id if assignment else ""});m.is_indexed_for_rag=True;m.status=MaterialStatus.completed
 else:m.status=MaterialStatus.failed
 await db.commit();return {"id":m.id,"status":m.status.value,"is_indexed_for_rag":m.is_indexed_for_rag}
