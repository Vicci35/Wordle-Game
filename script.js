//Ställer in variabler och inställningar för spelet
let targetWord = "";
let currentGuess = "";
let currentAttempt = 0;
let maxAttempts = 6;
let words = "";
let gameOver = false;

//ställer in tangentbordet samt hur hantering av tangentbordet ska ske
createKeyboard();
keyboardInput();

startGame();

// Hämta ord från wordle.json-Kontrollerar om svaret är okej
// Konverterar svaret till JSON och väljer ett slumpmässigt ord
async function fetchWord() {
  try {
    const response = await fetch("wordle.json");
    if (!response.ok) {
      throw new Error("response didn't work");
    }

    const data = await response.json();
    words = data.words;

    targetWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    console.log(targetWord);
  } catch (error) {
    console.error("Catching didn't work", error);
  }
}

// Hantering av inmatning av gissning
function handleKeyPress(key) {
  console.log(gameOver);

  const currentSquareIndex = currentAttempt * 5 + currentGuess.length;
  const square = document.getElementById(`square-${currentSquareIndex}`);

  if (key === "BACK") {
    if (currentGuess.length > 0) {
      currentGuess = currentGuess.slice(0, -1);
      document.getElementById(`square-${currentSquareIndex - 1}`).textContent =
        "";
    }
  } else if (key === "ENTER") {
    if (currentGuess.length !== 5) {
      alert("The word must contain 5 letters");
      return;
    }
    if (!words.includes(currentGuess.toLowerCase())) {
      alert("The word does not exist");
      return;
    }
    checkGuess();
    currentGuess = "";
    currentAttempt++;
  } else if (currentGuess.length < 5) {
    currentGuess += key;
    square.textContent = key;
  }
}

// Hantering av användarens gissning
function checkGuess() {
  const messageDiv = document.getElementById("message");

  // Kontrollerar om gissningen är rätt
  //Loopen kollar igenom varje bokstav i gissningen och jämför med targetordet

  if (currentGuess === targetWord) {
    for (let i = 0; i < 5; i++) {
      const square = document.getElementById(
        `square-${currentAttempt * 5 + i}`
      );
      square.classList.add("correct-position");
      const keyDiv = document.getElementById(`key-${currentGuess[i]}`);
      updateKeyColor(keyDiv, "correct-position");
    }

    messageDiv.textContent = "Congratulations! You had the right word!";
    messageDiv.classList.remove("hidden");
    gameOver = true;
    return;
  }

  if (currentAttempt === maxAttempts - 1) {
    messageDiv.textContent = `Sorry, you didn't make it this time! The word was ${targetWord}`;
    messageDiv.classList.remove("hidden");
    gameOver = true;
    return;
  }

  for (let i = 0; i < 5; i++) {
    const letter = currentGuess[i];
    const square = document.getElementById(`square-${currentAttempt * 5 + i}`);
    const keyDiv = document.getElementById(`key-${letter}`);

    if (keyDiv) {
      // Kontrollera att knappen hittas
      if (targetWord[i] === letter) {
        square.classList.add("correct-position");
        updateKeyColor(keyDiv, "correct-position");
      } else if (targetWord.includes(letter)) {
        square.classList.add("wrong-position");
        updateKeyColor(keyDiv, "wrong-position");
      } else {
        square.classList.add("incorrect");
        updateKeyColor(keyDiv, "incorrect");
      }
    } else {
      console.error(`Tangenten ${letter} kunde inte hittas`);
    }
  }
}

function resetGame() {
  currentGuess = "";
  currentAttempt = 0;
  gameOver = false;

  const board = document.getElementById("board");

  const messageDiv = document.getElementById("message");
  messageDiv.classList.add("hidden");

  document.querySelectorAll(".square").forEach((square) => {
    square.textContent = "";
    square.classList.remove("correct-position", "wrong-position", "incorrect");
  });

  document.querySelectorAll(".key").forEach((key) => {
    key.classList.remove("correct-position", "wrong-position", "incorrect");
  });

  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }

  startGame();
}

document.getElementById("reset-game").addEventListener("click", function () {
  resetGame();
  this.blur();
});

document
  .getElementById("colorblind-mode")
  .addEventListener("click", function () {
    toogleColorblindMode();
    this.blur();
  });

function toogleColorblindMode() {
  document.body.classList.toggle("colorblind");
  console.log(document.body.classList.contains("colorblind"));
}

document.getElementById("light-mode").addEventListener("click", function () {
  document.body.classList.toggle("light-mode");
  this.blur();
});

async function startGame() {
  await fetchWord();
  createBoard();
}
