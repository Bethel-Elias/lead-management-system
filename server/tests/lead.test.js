const request = require("supertest");
const app = require("../app");

describe("Lead API", () => {
  test("GET /api/leads should return 401 without token", async () => {
    const res = await request(app).get("/api/leads");

    expect(res.statusCode).toBe(401);
  });
});
