// HELPER FUNCTIONS

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

function newRound() {
    guessesRemaining = 9;
    previousGuesses = [];
    playerGuess = null;
    computerLetterCode = randomizeAlphaCode();
    console.log(computerLetterCode, String.fromCharCode((computerLetterCode)));
}

// GAME LOGIC

let wins = 0;
let losses = 0;
let guessesRemaining = 9;
let previousGuesses = [];
let playerGuess = null;
let computerLetterCode = randomizeAlphaCode();

updateText();

console.log(computerLetterCode, String.fromCharCode((computerLetterCode)));

document.addEventListener("keypress", function(event) {
    let charPressed = event.keyCode;
    console.log(charPressed);
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

/*
Keypressed function:
    1. Store character code of pressed key
    2. Check previousGuesses to make sure player hasn't guessed letter before
        1. If they have, return 0 and break out of function
    3. Compare character code from player to character code from computer
        1. If they match:
            1. Reset guesses
        2. If they don't:
            1. Add guess to previousGuesses
            2. Decrement guessesRemaining
    4. Check guessesRemaining
        1. If = 0
            1. Reset guesses
*/