import asyncio
from fastapi.testclient import TestClient
from app.main import app
from app.services.rag_service import rag


def auth(client, email="student@studypilot.pk", password="Student@12345"):
    return client.post("/api/v1/auth/token", data={"username": email, "password": password}).json()["access_token"]


def test_exact_rag_filters():
    public = rag.build_where("phy", False, [])
    assert public == {"$and": [{"subject_id": "phy"}, {"source_tier": {"$in": ["official", "administration"]}}]}
    private = rag.build_where("phy", True, ["class-1"])
    assert private["$and"][1]["$or"][1]["$and"][1] == {"class_id": {"$in": ["class-1"]}}


def test_management_overview_and_session_lifecycle(monkeypatch):
    async def fake_complete(prompt, history):
        return "A streamed answer", "test"
    monkeypatch.setattr("app.api.v1.tutor.complete", fake_complete)
    with TestClient(app) as client:
        admin = auth(client, "admin@studypilot.pk", "Admin@12345")
        overview = client.get("/api/v1/management/overview", headers={"Authorization": f"Bearer {admin}"})
        assert overview.status_code == 200
        assert overview.json()["active_classes"] >= 1
        student = auth(client)
        headers = {"Authorization": f"Bearer {student}"}
        response = client.post("/api/v1/tutor/ask", headers=headers, json={"prompt":"What is momentum?", "subject":"phy"})
        assert response.status_code == 200, response.text
        session_id = response.json()["session_id"]
        messages = client.get(f"/api/v1/tutor/sessions/{session_id}", headers=headers).json()["messages"]
        assert [message["role"] for message in messages[-2:]] == ["user", "assistant"]
        stream = client.post("/api/v1/tutor/ask/stream", headers=headers, json={"prompt":"Explain again", "subject":"phy", "session_id":session_id})
        assert stream.status_code == 200
        assert "data: [DONE]" in stream.text
        renamed = client.patch(f"/api/v1/tutor/sessions/{session_id}", headers=headers, json={"title":"Momentum review"})
        assert renamed.json()["title"] == "Momentum review"
        deleted = client.delete(f"/api/v1/tutor/sessions/{session_id}", headers=headers)
        assert deleted.status_code == 200
