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
    if (Object.keys(this.state.players).length >= 2) return;
    this.state.players[name] = null;
  }

  start() {
    const playerNames = Object.keys(this.state.players);
    if (playerNames.length < 2) {
      throw new Error('Need 2 players to start');
    }

    const firstIsX = Math.random() < 0.5;
    this.state.players[playerNames[0]] = firstIsX ? 'X' : 'O';
    this.state.players[playerNames[1]] = firstIsX ? 'O' : 'X';
    this.state.status = 'IN_PROGRESS';
    this.state.currentTurn = 'X';
  }

  startVSComputer(humanName) {
    this.reset();
    this.state.mode = 'AI';
    const humanIsX = Math.random() < 0.5;
    this.state.players[humanName] = humanIsX ? 'X' : 'O';
    this.state.players['COMPUTER'] = humanIsX ? 'O' : 'X';
    this.state.status = 'IN_PROGRESS';
    this.state.currentTurn = 'X';

    if (this.state.players['COMPUTER'] === 'X') {
      this.triggerAIMove();
    }
  }

  makeMove(playerName, cellIndex) {
    if (this.state.status !== 'IN_PROGRESS') return false;
    const playerSymbol = this.state.players[playerName];
    if (!playerSymbol || playerSymbol !== this.state.currentTurn) return false;
    if (cellIndex < 0 || cellIndex >= 9 || this.state.board[cellIndex] !== null) return false;

    this.state.board[cellIndex] = playerSymbol;

    const result = checkWinner(this.state.board);
    if (result) {
      this.state.status = 'FINISHED';
      this.state.winner = result;
      return true;
    }

    this.state.currentTurn = this.state.currentTurn === 'X' ? 'O' : 'X';

    // Trigger AI move if next turn belongs to Computer
    if (
      this.state.mode === 'AI' &&
      this.state.players['COMPUTER'] === this.state.currentTurn &&
      this.state.status === 'IN_PROGRESS'
    ) {
      this.triggerAIMove();
    }

    return true;
  }

  triggerAIMove() {
    if (this.aiTimer) {
      clearTimeout(this.aiTimer);
    }
    this.aiTimer = setTimeout(() => {
      const emptyIndices = this.state.board
        .map((val, idx) => (val === null ? idx : null))
        .filter((val) => val !== null);

      if (emptyIndices.length === 0 || this.state.status !== 'IN_PROGRESS') return;

      const randomChoice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      this.makeMove('COMPUTER', randomChoice);
    }, 500);
  }
}

