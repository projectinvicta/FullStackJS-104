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
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        mode: 'AI',
        status: 'IN_PROGRESS',
        players: { player1: 'X', computer: 'O' }
      })
    });

    const statusEl = document.getElementById('status');
    const aiBtn = document.getElementById('vs-computer-btn');

    aiBtn.click();

    expect(global.fetch).toHaveBeenCalledWith('/api/game/start', expect.any(Object));

    await vi.waitFor(() => {
      expect(statusEl.textContent).toBe('Game Started: AI Mode');
    });
  });

  test('updates clicked grid cell and status after mocked move', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        symbol: 'X',
        message: 'Turn: O'
      })
    });

    const statusEl = document.getElementById('status');
    const firstCell = document.querySelector('.cell[data-index="0"]');

    firstCell.click();

    expect(global.fetch).toHaveBeenCalledWith('/api/game/move', expect.any(Object));

    await vi.waitFor(() => {
      expect(firstCell.textContent).toBe('X');
      expect(statusEl.textContent).toBe('Turn: O');
    });
  });
});

