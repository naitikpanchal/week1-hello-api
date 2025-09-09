import { describe, it, expect, test } from 'vitest';
import { HealthResponse } from '../controllers/healthController';
import { Request, Response } from 'express';

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