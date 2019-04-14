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
  let guesses = 6;

  // DOM ELEMENTS
  const playButton = document.getElementById("play");
  const guessButton = document.getElementById("guess");
  const playAgainButton = document.getElementById("play-again");
  const wordContainer = document.getElementById("word");

  function randomWord() {
    // Checks if container already has a word
    if (wordContainer.children.length) return;

    hideModal();

    const word = "horror".split("");
    word.forEach(letter => createSpans(letter));
    return word;
  }

  function hideModal() {
    const container = document.getElementById("container");
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    container.style.display = "block";
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
      // because the user guessed wrong, subtract from guesses
      guesses -= 1;
      console.log(guesses);
      console.log("Pick a different letter!");
      // if (guesses = 0) {
      //   // run some func
      // }
      return;
    }

    console.log("guess count", guesses);
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

  function displayMessage(msg) {}

  playButton.addEventListener("click", randomWord);
  guessButton.addEventListener("click", guessLetter);
})();
