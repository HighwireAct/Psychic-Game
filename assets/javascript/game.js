// HELPER FUNCTIONS

let randomizeAlphaCode = function() {
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
let updateText = function () {
    let winSpan = document.getElementById("wins");
    let lossSpan = document.getElementById("losses");
    let guessRemainSpan = document.getElementById("guesses-remaining");
    let prevGuessSpan = document.getElementById("previous-guesses");
    
    winSpan.innerText = wins;
    lossSpan.innerText = losses;
    guessRemainSpan.innerText = guessesRemaining;
    prevGuessSpan.innerText = arrayToString(previousGuesses, ", ");
};

let resetGuesses = function () {
    guessesRemaining = 10;
    previousGuesses = [];
    playerGuess = null;
}

// GAME LOGIC

let wins = 0;
let losses = 0;
let guessesRemaining = 10;
let previousGuesses = [];
let playerGuess = null;
let computerLetterCode = randomizeAlphaCode();

updateText();

console.log(computerLetterCode, String.fromCharCode((computerLetterCode)));

document.keypressed();


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