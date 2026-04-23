from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_main():
    """
    Test the main application mounts and serves static files correctly,
    or at least responds without a 500 server error when hitting unresolved routes.
    """
    response = client.get("/")
    assert response.status_code in [200, 404] # 404 expected if static assets aren't built yet during testing

def test_signup_login_flow():
    """
    Simulates the entire user end-to-end authentication flow to ensure Security and Consistency.
    """
    test_email = "grader@example.com"
    test_password = "secure_password_123!"

    # 1. Signup
    response = client.post(
        "/api/auth/signup",
        json={"email": test_email, "password": test_password}
    )
    # Allow 200 (created) or 400 (already exists if test is re-run)
    assert response.status_code in [200, 400]

    # 2. Login
    login_response = client.post(
        "/api/auth/login",
        data={"username": test_email, "password": test_password}
    )
    assert login_response.status_code == 200
    
    token = login_response.json().get("access_token")
    assert token is not None

    # 3. Read Protected Route
    me_response = client.get(
        "/api/user/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert me_response.status_code == 200
    assert me_response.json().get("email") == test_email
