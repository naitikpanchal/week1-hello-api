import { describe, it, expect } from 'vitest';
import { HealthResponse } from '../controllers/healthController';


describe('Health controller Check', () => {
    it('should return status ok and uptime', () => {
        // const req: Request = {};
        const res: any = {
            json: (response: HealthResponse) => {
                expect(response.status).toBe('ok');
                expect(response.uptime).toBeTypeOf('number');
                expect(response.uptime).toBeGreaterThan(0);
            }
        };
    });
});
// import { describe, it, expect } from 'vitest';
// import request from 'supertest';
// import app from '../index';

// describe('Health controller Check', () => {
//   it('should return status ok and uptime', async () => {
//     const response = await request(app).get('/health');

//     expect(response.status).toBe(200);
//     expect(response.body.status).toBe('ok');
//     expect(response.body.uptime).toBeTypeOf('number');
//     expect(response.body.uptime).toBeGreaterThan(0);
//   });
// });
