var Letter = require('./letter.js');

function Word(wrd) {
  var that = this;
    this.word = wrd;
  // building an empty array that will store the letters
  this.letters = [];
  this.wordFound = false;

  this.getLets = function() {
    //fills the letters array with each letter
    for(var i = 0; i<that.word.length; i++){
      var newLetter = new Letter(that.word[i]);
      this.letters.push(newLetter);
    }
  };

  // checks to see if the correct word was found
  this.didWeFindTheWord = function() {
    if(this.letters.every(function(lttr){
      return lttr.appear === true;
    })){
      this.wordFound = true;
      return true;
    }

  };

  this.checkIfLetterFound = function(guessedLetter) {
    var whatToReturn = 0;
    // iterates through the letter array to check against the guessed letter
    this.letters.forEach(function(lttr){
      if(lttr.letter === guessedLetter){
        lttr.appear = true;
        whatToReturn++;
      }
    })
    // if guessLetter matches Letter property, the letter object should be shown
    return whatToReturn;
  };

  // Render the word to be displayed to the user
  this.wordRender = function() {
    var display = '';
    that.letters.forEach(function(lttr){
      var currentLetter = lttr.letterRender();
      display+= currentLetter;
    });

    return display;
  };
}

module.exports = Word;