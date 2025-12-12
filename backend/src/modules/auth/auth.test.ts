import request from "supertest";
import app from "../../app";

describe("Auth - Register", () => {
  it("should register a new user and return 201", async () => {
    const email = `api-${Date.now()}@example.com`;

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email,
        password: "StrongPass123!"
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email", email);
    expect(response.body).not.toHaveProperty("password");
  });

  it("should return 400 if email is missing", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        password: "StrongPass123!"
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should return 400 if password is missing", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: `missing-pass-${Date.now()}@example.com`
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should return 400 if password is too weak", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: `weak-pass-${Date.now()}@example.com`,
        password: "123"
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
