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
  const hangmanContainer = document.getElementById("hangman-container");

  function randomWord() {
    // Checks if container already has a word
    if (wordContainer.children.length) return;

    hideModal();

    const word = "horror".split("");
    word.forEach(letter => createLetters(letter));
    console.dir(wordContainer);
    return word;
  }

  function hideModal() {
    const container = document.getElementById("container");
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    container.style.display = "flex";
  }

  function createLetters(letter) {
    // Create spans that contain the letter of the
    // randomly generated word.
    const div = document.createElement("div");
    const spanLetter = document.createElement("span");
    const spanLine = document.createElement("span");

    div.classList.add("letter-container");

    spanLetter.classList.add("letters");
    spanLetter.textContent = letter;

    spanLine.classList.add("letter-border");

    div.appendChild(spanLetter);
    div.appendChild(spanLine);

    wordContainer.appendChild(div);
  }

  function guessLetter() {
    // Static nodelist
    const letters = document.querySelectorAll(".letters");
    // Grab current input value.
    const val = getVal();

    // If no word exists exit function.
    if (!wordContainer.children.length) return;

    // If input is empty or a number exit function
    if (val === "" || val.length > 1 || !isNaN(val)) return;

    gameOver();

    // If the value has already been guessed
    if (checkGuessedVals(guessed, val)) {
      guesses -= 1;
      console.log(guesses);
      // if there is no current error message
      if (!document.getElementById("message")) {
        // display the error message
        displayMessage("Pick a different letter!");
        return;
      }
      // else an error message exists and we exit
      return;
    }

    clearMessages();

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
    guessedLetters.textContent = guessed;
  }

  function clearWord() {
    // Turn children live nodelist into an array by using array's slice method
    let children = Array.prototype.slice.call(wordContainer.childNodes);
    // remove all children from parent
    children.forEach(child => wordContainer.remove(child));
  }

  function displayMessage(msg) {
    const message = document.createElement("div");

    message.setAttribute("id", "message");
    message.style.color = "red";
    message.style.fontSize = "32px";
    message.textContent = msg;

    hangmanContainer.appendChild(message);
  }

  function clearMessages() {
    const message = document.getElementById("message");
    if (!message) return;
    message.parentNode.removeChild(message);
  }

  function gameOver() {
    if (guesses === 0) {
      clearMessages();
      displayMessage("Game Over! You are out of guesses!");
      return;
    }
  }

  function compose(fn1, fn2) {
    return function(...args) {
      return fn1(fn2(...args));
    };
  }

  function composedData(...fns) {
    return fns.reduce(compose);
  }

  playButton.addEventListener("click", randomWord);
  guessButton.addEventListener("click", guessLetter);
})();
