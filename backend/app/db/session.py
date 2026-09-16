from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker,AsyncSession
from sqlalchemy import event
from app.core.config import settings
engine=create_async_engine(settings.database_url,connect_args={"check_same_thread":False} if settings.database_url.startswith("sqlite") else {})
@event.listens_for(engine.sync_engine,"connect")
def sqlite_pragmas(dbapi_connection,connection_record):
    if settings.database_url.startswith("sqlite"):
        cur=dbapi_connection.cursor(); cur.execute("PRAGMA foreign_keys=ON"); cur.execute("PRAGMA journal_mode=WAL"); cur.close()
SessionLocal=async_sessionmaker(engine,expire_on_commit=False,class_=AsyncSession)
async def get_db():
    async with SessionLocal() as session: yield session
