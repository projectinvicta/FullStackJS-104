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

// TODO: Step 5a - Define `POST /api/game/join`
// Extract `{ name }` from `req.body`, call `game.addPlayer(name)`,
// automatically call `game.start()` if 2 players have joined, and return `game.state`.

// TODO: Step 5b - Define `POST /api/game/start-ai`
// Extract `{ name }` from `req.body`, call `game.startVSComputer(name || 'Player 1')`,
// and return `game.state`.

// TODO: Step 5c - Define `POST /api/game/move`
// Extract `{ player, index }` from `req.body`, call `const success = game.makeMove(player, index)`,
// and return `{ success, state: game.state }`.

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Tic-Tac-Toe Server running at http://localhost:${PORT}`);
  });
}

export default app;

