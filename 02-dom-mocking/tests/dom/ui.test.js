/**
 * @vitest-environment jsdom
 */
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { attachGameHandlers } from '../../src/ui.js';

describe('Frontend UI DOM & API Mocking', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="status">Waiting to start</div>
      <button id="vs-computer-btn">Play Against Computer</button>
      <div id="grid">
        <button class="cell" data-index="0"></button>
      </div>
    `;
    attachGameHandlers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('mocks fetch call when clicking Play Against Computer', async () => {
    // TODO: Step 3a - Mock `global.fetch` with `vi.fn().mockResolvedValue(...)`
    // returning `{ ok: true, json: async () => ({ mode: 'AI', status: 'IN_PROGRESS', players: { player1: 'X', computer: 'O' } }) }`

    const statusEl = document.getElementById('status');
    const aiBtn = document.getElementById('vs-computer-btn');

    aiBtn.click();

    // TODO: Step 3b - Verify `global.fetch` was called with '/api/game/start' and expect.any(Object),
    // then use `await vi.waitFor(...)` to assert `statusEl.textContent` becomes 'Game Started: AI Mode'.
  });

  test('updates clicked grid cell and status after mocked move', async () => {
    // TODO: Step 4 - Mock `global.fetch` to resolve with:
    // `{ ok: true, json: async () => ({ symbol: 'X', message: 'Turn: O' }) }`
    // Click `.cell[data-index="0"]`, verify `global.fetch` was called with '/api/game/move',
    // and use `await vi.waitFor(...)` to assert the cell text is 'X' and `#status` is 'Turn: O'.
  });
});

