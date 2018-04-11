// Requiring inquirer module, word.js, wordlist.js 
var inquirer = require("inquirer");
var Word = require("./word");
var List = require("./wordlist");

// Hangman object that will store the necessary data
var hangman = {
    wordBank: List.chosenWord.wordList,
    guessesRemaining: 10,
    guessedLetters: [],
    currentWord: null,
    startGame: function () {
        var that = this;
        // Empty the guessedLetters array for new game
        if (this.guessedLetters.length > 0) {
            this.guessedLetters = [];
        }

        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "Do you want to play hangman?"
        }]).then(function (answer) {
            if (answer.play) {
                that.newGame();
            } else {
                console.log("Come back when you're ready.");
            }
        })
    },
    newGame: function () {
        if (this.guessesRemaining === 10) {
            console.log("Good luck!");
            console.log("");
            // getting a random word
            var randNum = Math.floor(Math.random() * this.wordBank.length);
            this.currentWord = new Word(this.wordBank[randNum]);
            this.currentWord.getLets();
            // Showing the number of letters as underscores
            console.log(this.currentWord.wordRender());
            this.keepPromptingUser();
        } else {
            this.resetGuessesRemaining();
            this.newGame();
        }
    },
    resetGuessesRemaining: function () {
        this.guessesRemaining = 10;
    },
    keepPromptingUser: function () {
        var that = this;
        //asks player for a letter
        inquirer.prompt([{
            name: "chosenLtr",
            type: "input",
            message: "Please guess a letter:",
            // validate if the user input is exactly one letter
            validate: function (value) {
                if (value.length === 1) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function (ltr) {
            // make sure the users input is upper case
            var letterReturned = (ltr.chosenLtr).toUpperCase();
            // Add letter to guessedLetters array 
            var guessedAlready = false;
            for (var i = 0; i < that.guessedLetters.length; i++) {
                if (letterReturned === that.guessedLetters[i]) {
                    guessedAlready = true;
                }
            }
            if (guessedAlready === false) {
                that.guessedLetters.push(letterReturned);

                var found = that.currentWord.checkIfLetterFound(letterReturned);
                // Prompt that the user was incorrect
                if (found === 0) {
                    console.log("Sorry, that's a wrong guess.");
                    that.guessesRemaining--;
                    console.log("Guesses remaining: " + that.guessesRemaining);
                    console.log("-------------------");
                    console.log(that.currentWord.wordRender());
                    console.log("-------------------");

                    console.log("Letters guessed: " + that.guessedLetters);
                } else {
                    console.log("Correct!");
                    // if the guessed word matches the current word the user won
                    if (that.currentWord.didWeFindTheWord() === true) {
                        console.log(that.currentWord.wordRender());
                        console.log("Congratulations! You win!");
                    } else {
                        // Show the remaining guesses
                        console.log("Guesses remaining: " + that.guessesRemaining);
                        console.log(that.currentWord.wordRender());
                        console.log("-------------------");
                        console.log("Letters guessed: " + that.guessedLetters);
                    }
                }
                if (that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
                    that.keepPromptingUser();
                } else if (that.guessesRemaining === 0) {
                    console.log("Game over!");
                    console.log("The right answer was: " + that.currentWord.word);
                }
            } else {
                console.log("Please pick a letter that wasn't already guessed.")
                that.keepPromptingUser();
            }
        });
    }
}

hangman.startGame();