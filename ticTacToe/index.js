const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const btnrestart = document.querySelector("#restart");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
const winningOptions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let running = false;

init();

function init() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  btnrestart.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (board[cellIndex] !== "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinning();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  //changePlayer();
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinning() {
  let won = false;

  for (let i = 0; i < winningOptions.length; i++) {
    let conditions = winningOptions[i];

    const cellA = board[conditions[0]];
    const cellB = board[conditions[1]];
    const cellC = board[conditions[2]];

    if (cellA === "" || cellB === "" || cellC == "") {
      continue;
    }

    if (cellA == cellB && cellB == cellC) {
      won = true;
      break;
    }
  }

  if (won) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!board.includes("")) {
    statusText.textContent = "Draw!";
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.textContent = ""));
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}
