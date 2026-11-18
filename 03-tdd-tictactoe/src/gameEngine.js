import { checkWinner } from './gameLogic.js';

export class GameEngine {
  constructor() {
    this.aiTimer = null;
    this.reset();
  }

  reset() {
    if (this.aiTimer) {
      clearTimeout(this.aiTimer);
      this.aiTimer = null;
    }
    this.state = {
      board: Array(9).fill(null),
      players: {}, // maps playerName -> 'X' or 'O'
      currentTurn: 'X',
      status: 'WAITING', // 'WAITING', 'IN_PROGRESS', 'FINISHED'
      winner: null,
      mode: 'PVP' // 'PVP' or 'AI'
    };
  }

  addPlayer(name) {
    // TODO: Step 1a - If 2 players are already registered, ignore additional players.
    // Otherwise register `this.state.players[name] = null`.
  }

  start() {
    // TODO: Step 1b - Check player count; if fewer than 2 players, throw new Error("Need 2 players to start").
    // TODO: Step 2 - Randomly assign 'X' and 'O' to the two players using Math.random() < 0.5,
    // set `this.state.status = 'IN_PROGRESS'`, and set `this.state.currentTurn = 'X'`.
  }

  startVSComputer(humanName) {
    // TODO: Step 4a - Reset the engine, set `this.state.mode = 'AI'`,
    // randomly assign 'X' and 'O' between `humanName` and `'COMPUTER'`,
    // set `status = 'IN_PROGRESS'` and `currentTurn = 'X'`.
    // If `'COMPUTER'` was assigned `'X'`, call `this.triggerAIMove()`.
  }

  makeMove(playerName, cellIndex) {
    // TODO: Step 3 - Validate the move:
    // 1. Return `false` if `status !== 'IN_PROGRESS'`.
    // 2. Return `false` if `playerName` has no symbol or it is not their `currentTurn`.
    // 3. Return `false` if `cellIndex` is out of bounds or `board[cellIndex] !== null`.
    // 4. Record the player's symbol at `board[cellIndex]`.
    // 5. Check `checkWinner(this.state.board)`. If truthy, set `status = 'FINISHED'`
    //    and `winner = result`, then return `true`.
    // 6. Toggle `currentTurn` between 'X' and 'O'.
    // TODO: Step 4b - If `mode === 'AI'` and it is now `'COMPUTER'`'s turn while `IN_PROGRESS`,
    //    call `this.triggerAIMove()`.
    // 7. Return `true`.
    return false;
  }

  triggerAIMove() {
    // TODO: Step 4c - Schedule a 500ms `setTimeout` that finds all `null` indices on `board`,
    // picks one at random, and calls `this.makeMove('COMPUTER', randomChoice)`.
  }
}

