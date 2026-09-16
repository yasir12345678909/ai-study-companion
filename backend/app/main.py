from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.db.session import engine
from app.models import Base
from app.api.v1 import auth,management,classes,materials,tutor
@asynccontextmanager
async def lifespan(app):
 async with engine.begin() as conn: await conn.run_sync(Base.metadata.create_all)
 yield
app=FastAPI(title="StudyPilot Backend",version="1.0.0",lifespan=lifespan)
app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173","http://127.0.0.1:5173","http://localhost:3000"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
app.include_router(auth.router,prefix="/api/v1/auth",tags=["auth"]);app.include_router(management.router,prefix="/api/v1/management",tags=["management"]);app.include_router(classes.router,prefix="/api/v1/classes",tags=["classes"]);app.include_router(materials.router,prefix="/api/v1/materials",tags=["materials"]);app.include_router(tutor.router,prefix="/api/v1/tutor",tags=["tutor"])
@app.get("/health")
async def health():return {"status":"healthy","database":"connected","vector_store":"ready"}
