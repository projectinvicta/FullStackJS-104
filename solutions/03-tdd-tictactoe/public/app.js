const statusEl = document.getElementById('status');
const bannerEl = document.getElementById('players-banner');
const pvpBtn = document.getElementById('pvp-btn');
const aiBtn = document.getElementById('vs-computer-btn');
const resetBtn = document.getElementById('reset-btn');
const cells = document.querySelectorAll('.cell');

let pollTimer = null;

function findPlayerBySymbol(players, symbol) {
  return Object.entries(players).find(([, role]) => role === symbol)?.[0] || null;
}

function renderState(state) {
  state.board.forEach((symbol, idx) => {
    const cell = cells[idx];
    cell.textContent = symbol || '';
    cell.dataset.symbol = symbol || '';
    cell.disabled = Boolean(symbol) || state.status !== 'IN_PROGRESS';
  });

  const entries = Object.entries(state.players || {});
  bannerEl.textContent = entries.length
    ? entries.map(([name, sym]) => `${name}: ${sym || '?'}`).join('  •  ')
    : '';

  if (state.status === 'WAITING') {
    statusEl.textContent = 'Choose PvP or Play Against Computer to begin';
  } else if (state.status === 'FINISHED') {
    statusEl.textContent =
      state.winner === 'Draw' ? "It's a Draw!" : `Winner: ${state.winner}!`;
  } else {
    const activePlayer = findPlayerBySymbol(state.players, state.currentTurn);
    statusEl.textContent = `Turn: ${state.currentTurn} (${activePlayer})`;
  }

  if (
    state.status === 'IN_PROGRESS' &&
    state.mode === 'AI' &&
    state.players.COMPUTER === state.currentTurn
  ) {
    clearTimeout(pollTimer);
    pollTimer = setTimeout(fetchState, 550);
  }
}

async function fetchState() {
  const res = await fetch('/api/game/state');
  const state = await res.json();
  renderState(state);
  return state;
}

pvpBtn.addEventListener('click', async () => {
  await fetch('/api/game/reset', { method: 'POST' });
  await fetch('/api/game/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Player 1' })
  });
  const res = await fetch('/api/game/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Player 2' })
  });
  renderState(await res.json());
});

aiBtn.addEventListener('click', async () => {
  const res = await fetch('/api/game/start-ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Player 1' })
  });
  renderState(await res.json());
});

resetBtn.addEventListener('click', async () => {
  clearTimeout(pollTimer);
  const res = await fetch('/api/game/reset', { method: 'POST' });
  renderState(await res.json());
});

cells.forEach((cell) => {
  cell.addEventListener('click', async () => {
    const current = await (await fetch('/api/game/state')).json();
    const activePlayer = findPlayerBySymbol(current.players, current.currentTurn);
    if (!activePlayer || activePlayer === 'COMPUTER') return;

    const index = Number(cell.dataset.index);
    const res = await fetch('/api/game/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: activePlayer, index })
    });
    const payload = await res.json();
    renderState(payload.state);
  });
});

fetchState();
