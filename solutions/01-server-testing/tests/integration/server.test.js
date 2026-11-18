import { describe, test, expect } from 'vitest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/server.js';

chai.use(chaiHttp);

describe('Express Server API Endpoints', () => {
  test('GET /api/game/state returns current state object', async () => {
    const res = await chai.request(app).get('/api/game/state');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('board');
    expect(res.body).toHaveProperty('status');
  });

  test('POST /api/game/reset resets the board and status', async () => {
    const res = await chai.request(app).post('/api/game/reset');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('WAITING');
    expect(res.body.board).toHaveLength(9);
  });
});

