var Letter = function (ltr) {
    // variable to store the letter
    this.letter = ltr;
    // boolean  to store if the letter will be shown
    this.appear = false;

    this.letterRender = function () {
        if (this.letter == ' ') {
            // When confirming the word the blanks should not return as false
            this.appear = true;
            return '  ';
        }
        if (this.appear === false) {
            // return an underscore if the letter isn't shown
            return ' _ ';
        } else {
            // else the letter will be visable
            return this.letter;
        }

    };
};

module.exports = Letter;