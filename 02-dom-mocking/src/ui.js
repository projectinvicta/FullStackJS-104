/**
 * Attaches DOM click listeners for starting an AI game and clicking board cells.
 */
export function attachGameHandlers() {
  const statusEl = document.getElementById('status');
  const aiBtn = document.getElementById('vs-computer-btn');
  const cells = document.querySelectorAll('.cell');

  if (aiBtn) {
    aiBtn.addEventListener('click', async () => {
      // TODO: Step 1 - Call `fetch('/api/game/start', ...)` with:
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ mode: 'AI' })
      // Parse `const data = await response.json()` and update:
      //   statusEl.textContent = `Game Started: ${data.mode} Mode`;
    });
  }

  cells.forEach((cell) => {
    cell.addEventListener('click', async () => {
      const index = Number(cell.dataset.index);

      // TODO: Step 2 - Call `fetch('/api/game/move', ...)` with:
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ index })
      // Parse `const data = await response.json()` and update:
      //   cell.textContent = data.symbol;
      //   statusEl.textContent = data.message;
    });
  });
}

