import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { GameEngine } from './gameEngine.js';

const app = express();
app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, '../public')));

// In-Memory Game State Instance
const game = new GameEngine();

app.get('/api/game/state', (req, res) => {
  res.json(game.state);
});

app.post('/api/game/reset', (req, res) => {
  game.reset();
  res.json(game.state);
});

app.post('/api/game/join', (req, res) => {
  const { name } = req.body;
  game.addPlayer(name);
  if (Object.keys(game.state.players).length === 2) {
    game.start();
  }
  res.json(game.state);
});

app.post('/api/game/start-ai', (req, res) => {
  const { name } = req.body;
  game.startVSComputer(name || 'Player 1');
  res.json(game.state);
});

app.post('/api/game/move', (req, res) => {
  const { player, index } = req.body;
  const success = game.makeMove(player, index);
  res.json({ success, state: game.state });
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Tic-Tac-Toe Server running at http://localhost:${PORT}`);
  });
}

export default app;

