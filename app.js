// Hang Man
// Zack Bostian 2019

//***TODO
// Reset/Play again button.
// Better styling
// Title and play button modal which then is removed and displays the game
// Randomly generated word API or download for randomly generated words.

(function() {
  // DATA
  const guessed = [];
  const guesses = 6;

  // DOM ELEMENTS
  const playButton = document.getElementById("play");
  const guessButton = document.getElementById("guess");
  const playAgainButton = document.getElementById("play-again");
  const wordContainer = document.getElementById("word");

  function randomWord() {
    // Checks if container already has a word
    // If length of children > 0 it must mean a word exists in
    // elements inner html, thus we return to prevent appending
    // the word a 2nd time.
    if (wordContainer.children.length !== 0) return;
    const word = "horror".split("");
    word.forEach(letter => createSpans(letter));
  }

  function createSpans(letter) {
    // Create spans that contain the letter of the
    // randomly generated word.
    const span = document.createElement("span");
    span.classList.add("letters");
    span.textContent = letter;

    wordContainer.appendChild(span);
  }

  function guessLetter() {
    // Static nodelist
    const letters = document.querySelectorAll(".letters");
    // Grab current input value.
    const val = getVal();

    // If no word exists exit function.
    if (wordContainer.children.length === 0) return;

    // If input is empty or a number exit function
    if (val === "" || val.length > 1 || !isNaN(val)) {
      console.log("Please pick one letter!");
      return;
    }

    // If the value has already been guessed exit function
    if (checkGuessedVals(guessed, val)) {
      console.log("Pick a different letter!");
      return;
    }

    // If the value entered is in the word
    // show the letter
    letters.forEach(letter => checkLetter(letter, val));

    // Add guessed val to keep track
    guessed.push(val);
    displayGuessedLetters();
  }

  function checkLetter(letter, val) {
    // Checks if user letter is in the word.
    // Displays it if it is.
    if (letter.textContent === val) {
      letter.style.visibility = "visible";
    }
  }

  function checkGuessedVals(array, val) {
    return array.includes(val);
  }

  function getVal() {
    const input = document.getElementById("input");
    return input.value;
  }

  function displayGuessedLetters() {
    const guessedLetters = document.getElementById("guessed-letters");

    guessedLetters.textContent = `Guessed letters: ${guessed}`;
  }

  function clearWord() {
    // Turn children live nodelist into an array by using array's slice method
    let children = Array.prototype.slice.call(wordContainer.childNodes);
    // remove all children from parent
    children.forEach(child => wordContainer.remove(child));
  }

  playButton.addEventListener("click", randomWord);
  guessButton.addEventListener("click", guessLetter);
})();
