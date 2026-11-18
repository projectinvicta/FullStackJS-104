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
    expect(checkWinner(board)).toBe('X');
  });

  test('detects a diagonal win for O', () => {
    const board = [
      'O', 'X', 'X',
      null, 'O', null,
      null, null, 'O'
    ];
    expect(checkWinner(board)).toBe('O');
  });

  test('returns Draw when the board is full with no winner', () => {
    const board = [
      'X', 'O', 'X',
      'X', 'O', 'O',
      'O', 'X', 'X'
    ];
    expect(checkWinner(board)).toBe('Draw');
  });
});

