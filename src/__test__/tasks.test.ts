import request from "supertest";
import app from "../index";
import { describe, it, expect } from "vitest";

describe(" Tasks API Endpoints", () => {
    it("should create a new task", async () => {
        const res = await request(app).post("/tasks")
        .send({ title: "New Task from Test" });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.title).toBe("New Task from Test");
        expect(res.body.completed).toBeTypeOf("boolean");
    });

    it("should reject invalid task payload", async () => {
        const res = await request(app).post("/tasks")
        .send({ });
        expect(res.status).toBe(400);
    });
});