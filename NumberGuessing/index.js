// NUMBER GUESSING GAME

const MIN_NUM = 1;
const MAX_NUM = 100;

let ANSWER = Math.floor(Math.random() * (MAX_NUM - MIN_NUM + 1)) + MIN_NUM;
let guessInput = document.getElementById("guess");
let attemps = 0;
let statusText = document.getElementById("statusText");
let tries = document.getElementById("tries");


let running = true;

document.getElementById("submit").addEventListener("click", function () {
  if (running) {
    let guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < MIN_NUM || guess > MAX_NUM) {
        statusMessage.textContent = "Please enter a valid number between 1 and 100.";
    }
    else if (guess > ANSWER) {
      statusText.textContent = "Your guess is to high! Try again";
      attemps++;
      tries.textContent = ` Attemps: ${attemps}`;
    }
    else if (guess < ANSWER) {
      statusText.textContent = "Your guess is to low! Try again";
      attemps++;
      tries.textContent = ` Attemps: ${attemps}`;
    }
    else if (guess == ANSWER) {
      statusText.textContent = "Your guess is right! Congrats!";
      attemps++;
      tries.textContent = ` Attemps: ${attemps}`;
      running = false;
    }
  }
});

document.getElementById("restart").addEventListener("click", function(){
    attemps = 0;
    tries.textContent = "";
    statusText.textContent = "";
    guessInput.value = 0;
    running = true;
    ANSWER = Math.floor(Math.random() * (MAX_NUM - MIN_NUM + 1)) + MIN_NUM;
    
})

