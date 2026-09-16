from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path
class Settings(BaseSettings):
    database_url: str = "sqlite+aiosqlite:///./studypilot.db"
    jwt_secret_key: str = "dev-only-change-me"
    access_token_expire_minutes: int = 1440
    gemini_api_key: str|None = None
    gemini_model: str = "gemini-2.5-flash"
    ollama_base_url: str = "http://localhost:11434/v1"
    ollama_model: str = "qwen2.5:7b"
    upload_dir: str = "./uploads/materials"
    chroma_dir: str = "./chroma_db"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
settings=Settings()
Path(settings.upload_dir).mkdir(parents=True, exist_ok=True)
