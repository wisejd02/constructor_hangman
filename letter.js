var Letter = function(word){
    this.word = word,
    this.blanks = this.word.split("").map(a=>'_'),
    this.uncover = this.blanks,
    this.count = 0,
    this.tries = parseInt(this.word.length*.5)
}
Letter.prototype.triesLeft = function(guess){
   
}

Letter.prototype.letterExist = function(guess){
    //var numTries= parseInt(this.word.length*.5);
    if(this.word.indexOf(guess, startValue) === -1){
        this.count++
        console.log("Your guess '"+guess +"' was incorrect!  You have have " + (this.tries - this.count)+ " guesses left!")
        if(this.count === this.tries){
            console.log("Out of guesses!")
            this.uncover = this.word.split("");
            
        }
        
    }
    
    var startValue = 0;
    while (this.word.indexOf(guess, startValue) !== -1) {   
        startValue = this.word.indexOf(guess, startValue) + 1;
        this.uncover[startValue-1] = guess;  
    }
    
    //console.log(this.uncover.join(" "));
    
}


module.exports = Letter;
