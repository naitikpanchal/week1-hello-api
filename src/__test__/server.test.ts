import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../index';

describe(" GET /", ()=> {
    it("should return status 200 and server running message", async ()=>{
        const res = await request(app).get("/");
        expect (res.status).toBe(200);
    });
});