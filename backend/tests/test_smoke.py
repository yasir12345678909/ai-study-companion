from fastapi.testclient import TestClient
from app.main import app


def token(client, email, password):
    response = client.post("/api/v1/auth/token", data={"username": email, "password": password})
    assert response.status_code == 200, response.text
    return response.json()["access_token"]


def test_health_and_auth():
    with TestClient(app) as client:
        assert client.get("/health").json()["status"] == "healthy"
        response = client.post("/api/v1/auth/register", json={"email":"pending@example.com","password":"Password123","name":"Pending","role":"teacher"})
        assert response.status_code in (200, 409)
        access = response.json().get("access_token") if response.status_code == 200 else token(client, "pending@example.com", "Password123")
        me = client.get("/api/v1/auth/me", headers={"Authorization":f"Bearer {access}"})
        assert me.json()["verification_status"] == "pending"


def test_pending_teacher_cannot_create_class():
    with TestClient(app) as client:
        access = token(client, "pending@example.com", "Password123")
        response = client.post("/api/v1/classes/", headers={"Authorization":f"Bearer {access}"}, json={"name":"Blocked","board_id":"fbise","class_level":10,"subject_ids":["phy"]})
        assert response.status_code == 403


def test_seeded_class_code_and_student_join():
    with TestClient(app) as client:
        access = token(client, "student@studypilot.pk", "Student@12345")
        preview = client.get("/api/v1/classes/code/FB2A7K", headers={"Authorization":f"Bearer {access}"})
        assert preview.status_code == 200
        join = client.post("/api/v1/classes/join/FB2A7K", headers={"Authorization":f"Bearer {access}"})
        assert join.status_code in (200, 400)


def test_student_material_cannot_index_before_verification(tmp_path):
    with TestClient(app) as client:
        access = token(client, "student@studypilot.pk", "Student@12345")
        response = client.post("/api/v1/materials/upload", headers={"Authorization":f"Bearer {access}"}, files={"file":("note.txt", b"momentum", "text/plain")}, data={"title":"Student Note","subject_id":"phy"})
        assert response.status_code == 200, response.text
        material_id = response.json()["id"]
        admin = token(client, "admin@studypilot.pk", "Admin@12345")
        indexed = client.post(f"/api/v1/materials/{material_id}/index", headers={"Authorization":f"Bearer {admin}"})
        assert indexed.status_code == 409
