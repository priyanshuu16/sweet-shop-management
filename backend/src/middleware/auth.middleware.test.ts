import request from "supertest";
import app from "../app";

describe("Auth Middleware", () => {
  beforeAll(() => {
    process.env.JWT_SECRET = "test-jwt-secret";
  });

  it("should block access without token", async () => {
    const response = await request(app).get("/api/protected");
    expect(response.status).toBe(401);
  });

  it("should allow access with valid token", async () => {
    const email = `mw-${Date.now()}@example.com`;
    const password = "StrongPass123!";

    await request(app)
      .post("/api/auth/register")
      .send({ email, password });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email, password });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toHaveProperty("token");

    const token = loginRes.body.token;

    const response = await request(app)
      .get("/api/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});

