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

  /*
   * TODO: Uncomment Test 1 (Red -> Green -> Refactor)
   * HINT 1: Check player count before starting.
   * Return error or throw when starting with fewer than 2 players in standard mode.
   */
  // test('Game cannot start without two players', () => {
  //   game.addPlayer('Alice');
  //   expect(() => game.start()).toThrow('Need 2 players to start');
  //   expect(game.state.status).toBe('WAITING');
  // });

  /*
   * TODO: Uncomment Test 2 (Red -> Green -> Refactor)
   * HINT 2: When game starts, randomly assign 'X' and 'O' roles.
   * Math.random() can determine which player gets assigned 'X'.
   */
  // test('O and X are randomly assigned to players on game start', () => {
  //   game.addPlayer('Alice');
  //   game.addPlayer('Bob');
  //   game.start();
  //
  //   const roles = Object.values(game.state.players);
  //   expect(roles).toContain('X');
  //   expect(roles).toContain('O');
  //   expect(game.state.status).toBe('IN_PROGRESS');
  // });

  /*
   * TODO: Uncomment Test 3 (Red -> Green -> Refactor)
   * HINT 3: Check for win condition after every valid move.
   * If a player gets 3 symbols in a row (horizontally, vertically, or diagonally),
   * update state.status to 'FINISHED' and store the winner symbol.
   */
  // test('game ends when a player gets 3 in a row', () => {
  //   game.addPlayer('Alice');
  //   game.addPlayer('Bob');
  //   game.start();
  //
  //   // Force deterministic assignment for test predictability
  //   game.state.players['Alice'] = 'X';
  //   game.state.players['Bob'] = 'O';
  //   game.state.currentTurn = 'X';
  //
  //   // X: 0, 1, 2 (Top Row Win)
  //   game.makeMove('Alice', 0); // X
  //   game.makeMove('Bob', 3);   // O
  //   game.makeMove('Alice', 1); // X
  //   game.makeMove('Bob', 4);   // O
  //   game.makeMove('Alice', 2); // X Win!
  //
  //   expect(game.state.status).toBe('FINISHED');
  //   expect(game.state.winner).toBe('X');
  // });

  /*
   * TODO: Uncomment Test 4 (Red -> Green -> Refactor)
   * HINT 4: In 'AI' mode, when the human player finishes their turn,
   * trigger a computer move after a short delay (e.g. 500ms).
   * Use vi.useFakeTimers() to simulate timer progression in tests.
   */
  // test('computer plays random moves after a short delay in AI mode', async () => {
  //   vi.useFakeTimers();
  //
  //   game.startVSComputer('Alice'); // Human is 'X' or 'O', computer gets remaining
  //   const humanSymbol = game.state.players['Alice'];
  //   const aiSymbol = humanSymbol === 'X' ? 'O' : 'X';
  //
  //   // Set human turn first
  //   game.state.currentTurn = humanSymbol;
  //   game.makeMove('Alice', 0);
  //
  //   // Fast-forward timers to fire AI move
  //   vi.advanceTimersByTime(600);
  //
  //   // AI should have picked one of the remaining empty spots (1-8)
  //   const board = game.state.board;
  //   const aiMovesCount = board.filter((cell) => cell === aiSymbol).length;
  //   expect(aiMovesCount).toBe(1);
  //
  //   vi.useRealTimers();
  // });
});

