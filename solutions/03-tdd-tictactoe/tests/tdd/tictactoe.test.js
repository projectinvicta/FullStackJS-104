import { describe, test, expect, beforeEach, vi } from 'vitest';
import { GameEngine } from '../../src/gameEngine.js';

describe('TDD Tic-Tac-Toe Game Engine', () => {
  let game;

  beforeEach(() => {
    game = new GameEngine();
  });

  test('initializes in WAITING status with an empty 9-cell board', () => {
    expect(game.state.status).toBe('WAITING');
    expect(game.state.board).toHaveLength(9);
    expect(game.state.board.every((cell) => cell === null)).toBe(true);
  });

  test('Game cannot start without two players', () => {
    game.addPlayer('Alice');
    expect(() => game.start()).toThrow('Need 2 players to start');
    expect(game.state.status).toBe('WAITING');
  });

  test('O and X are randomly assigned to players on game start', () => {
    game.addPlayer('Alice');
    game.addPlayer('Bob');
    game.start();

    const roles = Object.values(game.state.players);
    expect(roles).toContain('X');
    expect(roles).toContain('O');
    expect(game.state.status).toBe('IN_PROGRESS');
  });

  test('game ends when a player gets 3 in a row', () => {
    game.addPlayer('Alice');
    game.addPlayer('Bob');
    game.start();

    // Force deterministic assignment for test predictability
    game.state.players['Alice'] = 'X';
    game.state.players['Bob'] = 'O';
    game.state.currentTurn = 'X';

    // X: 0, 1, 2 (Top Row Win)
    game.makeMove('Alice', 0); // X
    game.makeMove('Bob', 3);   // O
    game.makeMove('Alice', 1); // X
    game.makeMove('Bob', 4);   // O
    game.makeMove('Alice', 2); // X Win!

    expect(game.state.status).toBe('FINISHED');
    expect(game.state.winner).toBe('X');
  });

  test('computer plays random moves after a short delay in AI mode', async () => {
    vi.useFakeTimers();

    game.startVSComputer('Alice'); // Human is 'X' or 'O', computer gets remaining
    const humanSymbol = game.state.players['Alice'];
    const aiSymbol = humanSymbol === 'X' ? 'O' : 'X';

    // Set human turn first
    game.state.currentTurn = humanSymbol;
    game.makeMove('Alice', 0);

    // Fast-forward timers to fire AI move
    vi.advanceTimersByTime(600);

    // AI should have picked one of the remaining empty spots (1-8)
    const board = game.state.board;
    const aiMovesCount = board.filter((cell) => cell === aiSymbol).length;
    expect(aiMovesCount).toBe(1);

    vi.useRealTimers();
  });
});

