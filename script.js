const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = parseInt(cell.dataset.index, 10);

  if (gameState[cellIndex] || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  if (currentPlayer === 'X') {
    cell.classList.add('playerX');
  } else {
    cell.classList.add('playerO');
  }

  if (checkWinner()) {
    statusEl.innerHTML = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes(null)) {
    statusEl.innerHTML = "It's a Draw! 🤝";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusEl.innerHTML = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      highlightWinningCells(combination);
      break;
    }
  }
  return roundWon;
}

function highlightWinningCells(winningCells) {
  winningCells.forEach(index => {
    cells[index].classList.add('winning');
  });
}

function resetGame() {
  gameState.fill(null);
  gameActive = true;
  currentPlayer = 'X';
  statusEl.innerHTML = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
