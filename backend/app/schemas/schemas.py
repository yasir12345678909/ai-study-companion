from pydantic import BaseModel,Field,EmailStr,ConfigDict
from typing import Any
class ErrorOut(BaseModel): detail:str; code:str; field:str|None=None
class RegisterIn(BaseModel): email:EmailStr; password:str=Field(min_length=8,max_length=128); name:str; role:str="student"; subject_specialization:str|None=None; institution_name:str|None=None; designation:str|None=None
class TokenOut(BaseModel): access_token:str; token_type:str="bearer"
class ProfileIn(BaseModel): board_id:str; board_name:str; class_level:int=Field(ge=9,le=12); stream_id:str; stream_name:str; combination_id:str; combination_name:str; subjects:list[str]; roll_number:str
class UserOut(BaseModel): model_config=ConfigDict(from_attributes=True); id:str; email:str; name:str; role:str; verification_status:str; is_active:bool; academic_profile:dict|None=None
class ClassCreate(BaseModel): name:str; board_id:str; class_level:int=Field(ge=9,le=12); subject_ids:list[str]=[]
class JoinOut(BaseModel): id:str; class_id:str; student_id:str; status:str
class MaterialAssign(BaseModel): class_id:str
class TutorAsk(BaseModel): prompt:str=Field(min_length=1,max_length=10000); subject:str; chapter_id:str|None=None; mode:str="explain"; include_class_materials:bool=False; session_id:str|None=None
