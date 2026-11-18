import { describe, test, expect } from 'vitest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/server.js';

chai.use(chaiHttp);

describe('Express Server API Endpoints', () => {
  test('GET /api/game/state returns current state object', async () => {
    // TODO: Step 6 - Use `await chai.request(app).get('/api/game/state')`
    // Assert that `res.status` is 200, and `res.body` has properties 'board' and 'status'.
  });

  test('POST /api/game/reset resets the board and status', async () => {
    // TODO: Step 7 - Use `await chai.request(app).post('/api/game/reset')`
    // Assert that `res.status` is 200, `res.body.status` is 'WAITING',
    // and `res.body.board` has length 9.
  });
});

