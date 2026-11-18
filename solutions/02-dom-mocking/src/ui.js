export function attachGameHandlers() {
  const statusEl = document.getElementById('status');
  const aiBtn = document.getElementById('vs-computer-btn');
  const cells = document.querySelectorAll('.cell');

  if (aiBtn) {
    aiBtn.addEventListener('click', async () => {
      const response = await fetch('/api/game/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'AI' })
      });
      const data = await response.json();
      statusEl.textContent = `Game Started: ${data.mode} Mode`;
    });
  }

  cells.forEach((cell) => {
    cell.addEventListener('click', async () => {
      const index = Number(cell.dataset.index);
      const response = await fetch('/api/game/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index })
      });
      const data = await response.json();
      cell.textContent = data.symbol;
      statusEl.textContent = data.message;
    });
  });
}

