import { fileURLToPath } from 'node:url';
import express from 'express';

const app = express();
app.use(express.json());

const gameState = {
  board: Array(9).fill(null),
  status: 'WAITING'
};

// TODO: Step 4 - Define `GET /api/game/state`
// Respond with status 200 and `gameState` as JSON.

// TODO: Step 5 - Define `POST /api/game/reset`
// Reset `gameState.board` to `Array(9).fill(null)` and `gameState.status` to `'WAITING'`,
// then return `gameState` as JSON.

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;

