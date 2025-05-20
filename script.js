const WORD = "APPLE";
let currentRow = 0;
let currentGuess = "";
let gameOver = false;

const board = document.getElementById("game-board");
const message = document.getElementById("message");

// Spielfeld erstellen
for (let i = 0; i < 6; i++) {
  const row = document.createElement("div");
  row.className = "row";
  for (let j = 0; j < 5; j++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    row.appendChild(tile);
  }
  board.appendChild(row);
}

// Tastatur-Ereignisse
document.addEventListener("keydown", (e) => {
  if (gameOver || currentRow >= 6) return;
  const key = e.key.toUpperCase();

  if (key === "BACKSPACE") {
    currentGuess = currentGuess.slice(0, -1);
  } else if (key === "ENTER") {
    if (currentGuess.length === 5) {
      checkGuess();
    }
  } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
    currentGuess += key;
  }

  updateRow();
});

function updateRow() {
  const row = board.children[currentRow];
  for (let i = 0; i < 5; i++) {
    row.children[i].textContent = currentGuess[i] || "";
  }
}

function checkGuess() {
  const row = board.children[currentRow];
  const guessArray = currentGuess.split("");
  const wordArray = WORD.split("");
  const tileStates = new Array(5).fill("absent");

  // Zuerst "correct"
  for (let i = 0; i < 5; i++) {
    if (guessArray[i] === WORD[i]) {
      tileStates[i] = "correct";
      wordArray[i] = null;
    }
  }

  // Dann "present"
  for (let i = 0; i < 5; i++) {
    if (tileStates[i] === "correct") continue;
    const idx = wordArray.indexOf(guessArray[i]);
    if (idx !== -1) {
      tileStates[i] = "present";
      wordArray[idx] = null;
    }
  }

  // Flip-Animation nacheinander
  guessArray.forEach((letter, i) => {
    const tile = row.children[i];
    tile.textContent = letter;
    setTimeout(() => {
      tile.classList.add("flip");
      tile.classList.add(tileStates[i]);
    }, i * 300);
  });

  setTimeout(() => {
    if (currentGuess === WORD) {
      showMessage("🎉 Gewonnen!");
      gameOver = true;
    } else if (currentRow === 5) {
      showMessage("Das Wort war: " + WORD);
      gameOver = true;
    }
    currentGuess = "";
    currentRow++;
  }, 5 * 300 + 500);
}

function showMessage(msg) {
  message.textContent = msg;
}
