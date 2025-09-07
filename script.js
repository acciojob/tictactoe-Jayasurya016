const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const submitBtn = document.getElementById('submit');
const setupDiv = document.querySelector('.setup');
const gameDiv = document.querySelector('.game');
const messageDiv = document.querySelector('.message');
const boardDiv = document.querySelector('.board');

let players = [];
let currentPlayer = 0;
let boardState = Array(9).fill(null);
let gameOver = false;

submitBtn.addEventListener('click', () => {
  const name1 = player1Input.value.trim();
  const name2 = player2Input.value.trim();

  if (!name1 || !name2) {
    alert('Please enter both player names.');
    return;
  }

  players = [name1, name2];
  setupDiv.style.display = 'none';
  gameDiv.style.display = 'block';
  messageDiv.textContent = `${players[currentPlayer]}, you're up`;

  createBoard();
});

function createBoard() {
  boardDiv.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = i + 1;
    cell.addEventListener('click', () => handleMove(i, cell));
    boardDiv.appendChild(cell);
  }
}

function handleMove(index, cell) {
  if (boardState[index] || gameOver) return;

  const symbol = currentPlayer === 0 ? 'x' : 'o';
  boardState[index] = symbol;
  cell.textContent = symbol;

  if (checkWin(symbol)) {
    messageDiv.textContent = `${players[currentPlayer]} congratulations you won!`;
    gameOver = true;
  } else if (boardState.every(cell => cell)) {
    messageDiv.textContent = `It's a draw!`;
    gameOver = true;
  } else {
    currentPlayer = 1 - currentPlayer;
    messageDiv.textContent = `${players[currentPlayer]}, you're up`;
  }
}

function checkWin(symbol) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => boardState[index] === symbol)
  );
}