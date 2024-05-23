let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");

let rows = 60;
let cols = 80;
let cellSize = 20;
let interval = 100; // ms

let grid = createGrid();
let generations = 0; // Initialisiere den Generationszähler
let lifespanGrid = createEmptyGrid(); // Gitter zur Lebensdauer-Überwachung
let colorGrid = createEmptyGrid(); // Gitter zur Farbüeberwachung

function createGrid() {
  let grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = Math.random() > 0.5 ? 1 : 0; // Zufällig lebende und tote Zellen
    }
  }
  return grid;
}

function drawGrid() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let color = colorGrid[i][j] || "white"; // Verwende die gespeicherte Farbe oder weiß für tote Zellen
      context.beginPath();
      context.rect(j * cellSize, i * cellSize, cellSize, cellSize);
      context.fillStyle = grid[i][j] ? color : "white";
      context.fill();
      context.stroke();
    }
  }

  context.fillStyle = "black";
            context.font = "20px Arial";
            context.fillText("Generation: " + generations, 10, canvas.height - 10);
}

function updateGrid() {
  let newGrid = createEmptyGrid();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let neighbors = countNeighbors(i, j);
      if (grid[i][j] === 1) {
        lifespanGrid[i][j]++; // Inkrementiere die Lebensdauer der lebenden Zelle
        if (neighbors < 2 || neighbors > 3) {
          newGrid[i][j] = 0; // Zelle stirbt
        } else {
          newGrid[i][j] = 1; // Zelle bleibt lebendig
        }
      } else {
        if (neighbors === 3) {
          newGrid[i][j] = 1; // Zelle wird geboren
          lifespanGrid[i][j] = 1; // Lebensdauer der neu geborenen Zelle initialisieren
          colorGrid[i][j] = `hsl(${(generations * 10) % 360}, 80%, 70%)`; // Neue Farbe für die Zelle
        } else {
          newGrid[i][j] = 0; // Zelle bleibt tot
        }
      }
    }
  }
  grid = newGrid; // Aktualisiere das Gitter
}

function createEmptyGrid() {
  let grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }
  return grid;
}

function countNeighbors(x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // Überspringe die aktuelle Zelle
      let row = (x + i + rows) % rows;
      let col = (y + j + cols) % cols;
      sum += grid[row][col];
    }
  }
  return sum;
}

function gameLoop() {
  drawGrid();
  updateGrid();
  generations++;
  setTimeout(gameLoop, interval);
}

gameLoop();
