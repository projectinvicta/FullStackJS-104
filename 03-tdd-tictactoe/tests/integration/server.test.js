import { describe, test, expect, beforeEach } from 'vitest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/server.js';

chai.use(chaiHttp);

describe('Tic-Tac-Toe Express Server API', () => {
  beforeEach(async () => {
    await chai.request(app).post('/api/game/reset');
  });

  test('GET /api/game/state returns initial waiting state', async () => {
    const res = await chai.request(app).get('/api/game/state');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('WAITING');
    expect(res.body.board).toHaveLength(9);
  });

  /*
   * TODO: Step 5 - Uncomment once your GameEngine tests pass and implement the routes in `src/server.js`!
   */
  // test('POST /api/game/join starts a PvP match once two players join', async () => {
  //   await chai.request(app).post('/api/game/join').send({ name: 'Alice' });
  //   const res = await chai.request(app).post('/api/game/join').send({ name: 'Bob' });
  //
  //   expect(res.status).toBe(200);
  //   expect(res.body.status).toBe('IN_PROGRESS');
  //   expect(Object.keys(res.body.players)).toEqual(['Alice', 'Bob']);
  // });
  //
  // test('POST /api/game/start-ai starts an AI match', async () => {
  //   const res = await chai.request(app).post('/api/game/start-ai').send({ name: 'Alice' });
  //
  //   expect(res.status).toBe(200);
  //   expect(res.body.mode).toBe('AI');
  //   expect(res.body.status).toBe('IN_PROGRESS');
  //   expect(res.body.players).toHaveProperty('Alice');
  //   expect(res.body.players).toHaveProperty('COMPUTER');
  // });
});

