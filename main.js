var ask_prompt = require('prompt');
var inquirer = require('inquirer');
var word = require('./word');
var letter = require('./letter');
var guessedLetters= [];
var wordlist = ["bananas","grapes","apples","oranges","grapefruit","lemon","lime"];

askToPlay();
  //need to ask user if they want to play hangman
function askToPlay(){
    inquirer.prompt([
	{
		type: "list",
		name: "action",
		message: "Do you want to play hangman?",
		choices: ["yes", "no"]
	  }

	]).then(function(choice) {
		 //if user answers yes then play game else do nothing
        if(choice.action === "yes"){
            console.log("Hint ** All words will be a fruit!")
            var game  = newWrd();
            var playThisWord = game.word();
            var playLetter = new letter(playThisWord);
            getGuess(playLetter, game);

        }

	});
}
   
function newWrd(){  
    var newWord = new word(wordlist);
    return newWord;
}

function playAgn(nxt, game){
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Do you want to play another round?",
            choices: ["yes", "no"]
          }
    
        ]).then(function(choice) {
             //if user answers yes then play game else do nothing
            //console.log(choice.action);
            if(choice.action === "yes"){
                guessedLetters= [];
                getGuess (nxt, game)
            }

        });
}

function hangmanIt(game){
    var playThisWord = game.word(game.newList);
    var playLetter = new letter(playThisWord);
    return playLetter;
}


function getGuess (playLetter, game){
    console.log(playLetter.uncover.join(" "));
    if(guessedLetters.length>0){
        console.log("These are your guesses: "+guessedLetters)
    }
    ask_prompt.start();
    var schema = {
        properties: {
            guess: {
                pattern: /^[a-zA-Z]+$/,
                message: 'Guess can be only letters.',
                required: true
            }
        }
    };   
        ask_prompt.get(schema, function (err, result) {
            console.log('  Guess: ' + result.guess);
            if(guessedLetters.indexOf(result.guess) === -1){
                guessedLetters.push(result.guess);
                playLetter.letterExist(result.guess);
            }else{
                console.log('You already used that letter.')
            }
            if(playLetter.word !== playLetter.uncover.join("")){
            }else{
                if(playLetter.word === playLetter.uncover.join("")&& playLetter.tries !== playLetter.count){
                    console.log("Hooraay you got it!! The word was "+playLetter.word+"!!")
                } 
                game.removeItm();
                if(game.newList.length>0){
                    var agn = game.word(game.newList);
                    var nxt = new letter(agn);
                    playAgn(nxt, game);
                }else{
                    console.log("Game Over")
                    
                }
                

            }
        });
    
}

