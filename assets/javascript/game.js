// HELPER FUNCTIONS

// Generates a random character code between 97(a) and 122(z)
function randomizeAlphaCode() {
    return Math.floor(Math.random() * 25) + 97;
}

// Converts an array to a string, inserting a seperator string between elements
function arrayToString(array,seperator) {
    let seperatorString = String(seperator);
    let arrayString = "";
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] === "string") { 
            arrayString = arrayString + array[i];
        } else {
            arrayString = arrayString + String.fromCharCode(array[i]); // Interprets numerical input as a character code
        }
        if (i < array.length - 1) {
            arrayString = arrayString + seperatorString;
        }
    }
    return arrayString;
};

// Updates text in browser
function updateText() {
    let winSpan = document.getElementById("wins");
    let lossSpan = document.getElementById("losses");
    let guessRemainSpan = document.getElementById("guesses-remaining");
    let prevGuessSpan = document.getElementById("previous-guesses");
    
    winSpan.innerText = wins;
    lossSpan.innerText = losses;
    guessRemainSpan.innerText = guessesRemaining;
    prevGuessSpan.innerText = arrayToString(previousGuesses, ", ");
};

// Resets values for next round
function newRound() {
    guessesRemaining = 9;
    previousGuesses = [];
    playerGuess = null;
    computerLetterCode = randomizeAlphaCode();
}

// GAME LOGIC

// Initialize values
let wins = 0;
let losses = 0;
let guessesRemaining = 9;
let previousGuesses = [];
let playerGuess = null;
let computerLetterCode = randomizeAlphaCode();

updateText(); // Displays initial values on the page

document.addEventListener("keypress", function(event) {
    let charPressed = event.keyCode; // Store character code of pressed key
    // Break out of function if letter has already been guessed
    for (let i = 0; i < previousGuesses.length; i++) {
        if (charPressed === previousGuesses[i]) {
            return 0;
        }
    }
    if (charPressed === computerLetterCode) {
        wins++;
        newRound();
    } else {
        previousGuesses.push(charPressed);
        guessesRemaining--;
    }
    if (guessesRemaining === 0) {
        losses++;
        newRound();
    }
    updateText();
});