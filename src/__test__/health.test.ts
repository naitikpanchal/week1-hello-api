import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Health controller Check', () => {
  it('should return status ok and uptime', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.uptime).toBeTypeOf('number');
    expect(response.body.uptime).toBeGreaterThan(0);
  });
});
