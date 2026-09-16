# StudyPilot Backend

FastAPI + SQLAlchemy async SQLite + ChromaDB backend for the existing StudyPilot frontend. The frontend was not modified.

## Run locally

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env  # Windows
# cp .env.example .env  # macOS/Linux
python -m app.db.seed
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Health check: `GET http://localhost:8000/health`. OpenAPI documentation is available at `/docs` and `/redoc`.

## Seed accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@studypilot.pk` | `Admin@12345` |
| Verified teacher | `teacher@studypilot.pk` | `Teacher@12345` |
| Student | `student@studypilot.pk` | `Student@12345` |

The seeded demo class is **FB2A7K**. Generated class codes use the strict alphabet `23456789ABCDEFGHJKLMNPQRSTUVWXYZ`, excluding `0`, `O`, `1`, and `I`.

## Test

```bash
pytest -q
```

The smoke suite verifies health/authentication, pending-teacher restrictions, class-code lookup and joining, and the invariant that student material cannot be indexed before teacher/management verification.

## Scope notes

Materials are stored under `uploads/materials/{material_id}` and are excluded from version control. Student conversations are private to their owning account. The backend currently provides buffered tutor responses at `/api/v1/tutor/ask`; the streaming endpoint remains a follow-up implementation item.
