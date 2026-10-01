let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

const grid = document.getElementById('grid');
const squares = document.querySelectorAll('.square');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Returns the winning line (e.g. [0, 1, 2]) or undefined if nobody has won
function getWinningLine() {
  return winningLines.find(([a, b, c]) =>
    board[a] !== '' && board[a] === board[b] && board[a] === board[c]
  );
}

function isDraw() {
  return board.every(cell => cell !== '');
}

grid.addEventListener('click', (e) => {
  const square = e.target.closest('.square');
  if (!square || gameOver || square.textContent) return;

  const index = Number(square.dataset.index);

  // place the current player's mark
  square.textContent = currentPlayer;
  board[index] = currentPlayer;

  const winLine = getWinningLine();

  if (winLine) {
    status.textContent = `${currentPlayer} wins!`;
    winLine.forEach(i => squares[i].classList.add('winner'));
    gameOver = true;
  } else if (isDraw()) {
    status.textContent = "It's a draw!";
    gameOver = true;
  } else {
    // switch turns
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `${currentPlayer}'s turn`;
  }
});

resetButton.addEventListener('click', () => {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  status.textContent = "X's turn";
  squares.forEach(square => {
    square.textContent = '';
    square.classList.remove('winner');
  });
});