const WORD = "APPLE"; // Zielwort (immer 5 Buchstaben, Großbuchstaben)
let currentRow = 0;
let currentGuess = "";

const board = document.getElementById("game-board");

// Board erstellen
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

// Tastatureingabe
document.addEventListener("keydown", (e) => {
  if (currentRow >= 6) return;
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
  const matchedIndices = new Array(5).fill(false); // Track matched letters in WORD

  // First pass: Check for correct letters in the correct position
  for (let i = 0; i < 5; i++) {
    const tile = row.children[i];
    const letter = guessArray[i];

    if (letter === WORD[i]) {
      tile.classList.add("correct");
      matchedIndices[i] = true; // Mark this letter as matched
      wordArray[i] = null; // Remove matched letter from consideration
    }
  }

  // Second pass: Check for correct letters in the wrong position
  for (let i = 0; i < 5; i++) {
    const tile = row.children[i];
    const letter = guessArray[i];

    if (!tile.classList.contains("correct") && wordArray.includes(letter)) {
      tile.classList.add("present");
      wordArray[wordArray.indexOf(letter)] = null; // Remove matched letter from consideration
    } else if (!tile.classList.contains("correct")) {
      tile.classList.add("absent");
    }
  }

  if (currentGuess === WORD) {
    setTimeout(() => alert("Gewonnen!"), 100);
  } else if (currentRow === 5) {
    setTimeout(() => alert("Verloren! Das Wort war: " + WORD), 100);
  }

  currentGuess = "";
  currentRow++;
}
