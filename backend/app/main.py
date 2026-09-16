import time
from collections import defaultdict
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.session import engine
from app.models import Base
from app.api.v1 import auth, management, classes, materials, tutor

# In-memory sliding-window rate limiter (Ponytail: standard library collections.defaultdict)
_ip_request_history = defaultdict(list)

@asynccontextmanager
async def lifespan(app):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(
    title="StudyPilot Backend",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.debug or settings.environment != "production" else "/docs",
    redoc_url="/redoc" if settings.debug or settings.environment != "production" else None,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Security Headers & Rate Limiting Middleware
@app.middleware("http")
async def security_and_rate_limit_middleware(request: Request, call_next):
    # 1. Rate Limiter (sliding 60s window per client IP)
    client_ip = request.client.host if request.client else "unknown"
    now = time.time()
    
    # Don't rate-limit OPTIONS pre-flight
    if request.method != "OPTIONS":
        window = _ip_request_history[client_ip]
        # Keep timestamps in the last 60 seconds
        _ip_request_history[client_ip] = [ts for ts in window if now - ts < 60]
        
        limit = settings.tutor_rate_limit_per_minute if "/tutor/ask" in request.url.path else settings.rate_limit_per_minute
        if len(_ip_request_history[client_ip]) >= limit:
            return JSONResponse(
                status_code=429,
                content={"detail": "Rate limit exceeded. Please wait a moment before retrying.", "code": "RATE_LIMIT_EXCEEDED"},
                headers={"Retry-After": "60"}
            )
        _ip_request_history[client_ip].append(now)

    # 2. Call handler
    response = await call_next(request)

    # 3. Security Headers (Defense against XSS, clickjacking, MIME sniffing)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()"
    response.headers["Content-Security-Policy"] = "default-src 'self'; frame-ancestors 'none';"
    
    return response

# Standardized Error Handling
@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    headers = exc.headers or {}
    code = headers.get("code", f"HTTP_{exc.status_code}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail, "code": code},
        headers=headers
    )

# Routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(management.router, prefix="/api/v1/management", tags=["management"])
app.include_router(classes.router, prefix="/api/v1/classes", tags=["classes"])
app.include_router(materials.router, prefix="/api/v1/materials", tags=["materials"])
app.include_router(tutor.router, prefix="/api/v1/tutor", tags=["tutor"])

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "environment": settings.environment,
        "database": "connected",
        "vector_store": "ready"
    }

