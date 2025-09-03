// script.js
const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      status.textContent = Player ${gameState[a]} wins! 🎉;
      gameActive = false;
      return;
    }
  }

  if (!gameState.includes(null)) {
    status.textContent = "It's a draw!";
    gameActive = false;
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || gameState[index]) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = Player ${currentPlayer}'s turn;
  }
}

function resetGame() {
  gameState.fill(null);
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = Player ${currentPlayer}'s turn;
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

board.addEventListener('click', handleClick);
resetBtn.addEventListener('click', resetGame);