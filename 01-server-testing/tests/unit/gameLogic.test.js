import { describe, test, expect } from 'vitest';
import { checkWinner } from '../../src/gameLogic.js';

describe('Game Logic Unit Tests', () => {
  test('returns null for an empty board', () => {
    const board = Array(9).fill(null);
    expect(checkWinner(board)).toBeNull();
  });

  test('detects a horizontal win for X', () => {
    const board = [
      'X', 'X', 'X',
      'O', 'O', null,
      null, null, null
    ];
    // TODO: Step 3a - Assert that checkWinner(board) returns 'X'
    expect(checkWinner(board)).toBe('X');
  });

  test('detects a diagonal win for O', () => {
    // TODO: Step 3b - Create a 9-element board where 'O' occupies indices 0, 4, and 8
    // and assert that checkWinner(board) returns 'O'
  });

  test('returns Draw when the board is full with no winner', () => {
    // TODO: Step 3c - Create a full 9-element board with no 3-in-a-row winner
    // (e.g. ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'])
    // and assert that checkWinner(board) returns 'Draw'
  });
});

