let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");

let sizeSeg = 20;
const canvasSize = canvas.width;

let snake = [];
snake[0] = { x: 9 * sizeSeg, y: 10 * sizeSeg };

// Zufällige Position der Nahrung generieren
let food = generateFood();

// Initiale Bewegungsrichtung und Punktestand
let dx = sizeSeg;
let dy = 0;
let score = 0;


function startGame() {
    snake = [{ x: 9 * sizeSeg, y: 10 * sizeSeg }];
    food = generateFood();
    score = 0;
    dx = sizeSeg;
    dy = 0;
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("scoreValue").textContent = score;
    gameInterval = setInterval(drawGame, 200);
}

// Tastendrücke überwachen
document.addEventListener("keydown", changeDirection);

// Richtungsänderung basierend auf den Pfeiltasten
function changeDirection(event) {
  const keyPressed = event.key;

  const up = dy === -sizeSeg;
  const down = dy === sizeSeg;
  const right = dx === sizeSeg;
  const left = dx === -sizeSeg;

  if (keyPressed === "w" || keyPressed === "W" || keyPressed === "ArrowUp" && !down) {
    dx = 0;
    dy = -sizeSeg;
  } else if (keyPressed === "s" || keyPressed === "S" || keyPressed === "ArrowDown" && !up) {
    dx = 0;
    dy = sizeSeg;
  } else if (keyPressed === "a" || keyPressed === "A" || keyPressed === "ArrowLeft" && !right) {
    dx = -sizeSeg;
    dy = 0;
  } else if (keyPressed === "d" || keyPressed === "D" || keyPressed === "ArrowRight" && !left) {
    dx = sizeSeg;
    dy = 0;
  }
}

// Spielfeld bei jedem Frame neu zeichnen
function drawGame() {
    if (collision()) {
        endGame();
    }

    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
    updateScore(); 
    
}

function updateScore() {
    document.getElementById("scoreValue").textContent = score; // Aktualisiere den Score-Wert im HTML
}

// Canvas löschen
function clearCanvas() {
  context.fillStyle = "white";
  context.strokeStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeRect(0, 0, canvas.width, canvas.height);
}

// Schlange zeichnen
function drawSnake() {
  snake.forEach(drawSnakeSegment);
}

// Ein Segment der Schlange zeichnen
function drawSnakeSegment(snakeSegment) {
  context.fillStyle = "lightgreen";
  context.strokeStyle = "darkgreen";
  context.fillRect(snakeSegment.x, snakeSegment.y, sizeSeg, sizeSeg);
  context.strokeRect(snakeSegment.x, snakeSegment.y, sizeSeg, sizeSeg);
}

// Nahrung zeichnen
function drawFood() {
  context.fillStyle = "red";
  context.strokeStyle = "darkred";
  context.fillRect(food.x, food.y, sizeSeg, sizeSeg);
  context.strokeRect(food.x, food.y, sizeSeg, sizeSeg);
}

// Neue Position des Kopfsegments der Schlange berechnen
function advanceSnake() {
  let head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    food = generateFood();
  } else {
    // Nur das letzte Segment der Schlange entfernen, wenn keine Nahrung erreicht wurde
    snake.pop();
  }
}


// Zufällige Position für die Nahrung generieren
function generateFood() {
  const randomX = Math.floor(Math.random() * (canvas.width / sizeSeg)) * sizeSeg;
  const randomY = Math.floor(Math.random() * (canvas.height / sizeSeg)) * sizeSeg;
  return { x: randomX, y: randomY };
}

// Prüft auf Collision -> Ende Spiel
function collision() {
  let head = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y || head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
      return true;
    }
  }
  return false;
}

function endGame() {
    clearInterval(gameInterval);
    document.getElementById("gameOver").style.display = "block";
}


function restartGame() {
    clearInterval(gameInterval);
    startGame();
}


// Starte das Spiel
startGame();
