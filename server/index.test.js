const request = require("supertest");
const app = require("./index");

describe("API Gimnasio Valus", () => {
  test("GET / debe retornar 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  test("POST /api/auth/register debe retornar 201", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: `test${Date.now()}@test.com`,
        password: "123456",
      });
    expect(res.statusCode).toBe(201);
  });

  test("POST /api/auth/login con credenciales inválidas debe retornar 401", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "noexiste@test.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toBe(401);
  });

  test("GET /api/reviews debe retornar 200", async () => {
    const res = await request(app).get("/api/reviews");
    expect(res.statusCode).toBe(200);
  });

  test("POST /api/reviews sin token debe retornar 401", async () => {
    const res = await request(app).post("/api/reviews").send({
      rating: 5,
      comment: "Excelente gimnasio",
    });
    expect(res.statusCode).toBe(401);
  });

  test("DELETE /api/reviews/:id sin token debe retornar 401", async () => {
    const res = await request(app).delete("/api/reviews/1");
    expect(res.statusCode).toBe(401);
  });
});