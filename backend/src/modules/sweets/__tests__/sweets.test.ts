import request from "supertest";
import app from "../../../app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let adminToken: string;
let userToken: string;
let sweetId: string;

describe("Sweets Module (RBAC + Inventory)", () => {
  beforeAll(async () => {
    // register admin
    await request(app).post("/api/auth/register").send({
      email: "admin@sweet.com",
      password: "AdminPass123!"
    });

    // promote admin to ADMIN role (TEST ONLY)
    await prisma.user.update({
      where: { email: "admin@sweet.com" },
      data: { role: "ADMIN" }
    });

    // register user
    await request(app).post("/api/auth/register").send({
      email: "user@sweet.com",
      password: "UserPass123!"
    });

    // login admin
    const adminLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@sweet.com",
        password: "AdminPass123!"
      });

    adminToken = adminLogin.body.token;

    // login user
    const userLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user@sweet.com",
        password: "UserPass123!"
      });

    userToken = userLogin.body.token;
  });

  it("ADMIN should create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Gulab Jamun",
        category: "Indian",
        price: 10,
        quantity: 50
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");

    sweetId = res.body.id;
  });

  it("USER should view sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
  });

  it("USER should search sweets by name", async () => {
    const res = await request(app)
      .get("/api/sweets/search?name=Gulab")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    // Depends on test execution order, but at least checking it exists
  });

  it("USER should NOT create sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Rasgulla",
        category: "Indian",
        price: 12,
        quantity: 20
      });

    expect(res.status).toBe(403);
  });

  it("USER should purchase sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
  });

  it("ADMIN should restock sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: 20 });

    expect(res.status).toBe(200);
  });

  it("ADMIN should delete sweet", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
  });
});

