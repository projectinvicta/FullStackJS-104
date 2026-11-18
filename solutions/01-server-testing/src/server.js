import { fileURLToPath } from 'node:url';
import express from 'express';

const app = express();
app.use(express.json());

const gameState = {
  board: Array(9).fill(null),
  status: 'WAITING'
};

app.get('/api/game/state', (req, res) => {
  res.status(200).json(gameState);
});

app.post('/api/game/reset', (req, res) => {
  gameState.board = Array(9).fill(null);
  gameState.status = 'WAITING';
  res.status(200).json(gameState);
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;

