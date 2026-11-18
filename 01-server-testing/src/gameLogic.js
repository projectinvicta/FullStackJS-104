/**
 * Evaluates a 3x3 Tic-Tac-Toe board array of length 9.
 * @param {Array<'X' | 'O' | null>} board
 * @returns {'X' | 'O' | 'Draw' | null}
 */
export function checkWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // TODO: Step 1 - Loop through each [a, b, c] combination in `lines`.
  // If board[a] is non-null and board[a] === board[b] && board[a] === board[c],
  // return the winning symbol (board[a]).

  // TODO: Step 2 - If there is no winner yet:
  // Return `null` if the board still includes `null` (empty spaces left),
  // otherwise return `'Draw'`.
  return null;
}

