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
    console.log("    ");
    console.log("    ");
    console.log("    ");
    console.log("    ");
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Do you want to play another round?",
            choices: ["yes", "no"]
          }
    
        ]).then(function(choice) {
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
    askForLetter(playLetter, game);
        
}

function askForLetter(playLetter, game){
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
            var answer = result.guess
            alreadyGuessed(playLetter, game, answer )
        });
}
function alreadyGuessed(playLetter, game, answer){
    if(guessedLetters.indexOf(answer) === -1){
        guessedLetters.push(answer);
        validateResponse(playLetter, game, answer);
    }else{
        console.log('You already used that letter.')
        getGuess (playLetter, game);
    }
}

function wordSolved(playLetter, game){
    if(playLetter.word === playLetter.uncover.join("")&& playLetter.tries !== playLetter.count){
        console.log("Hooraay you got it!! The word was "+playLetter.word+"!!")
        moreWordsToPlay(game);        
    }else if(playLetter.tries == playLetter.count){
        moreWordsToPlay(game);
    }else{
        getGuess (playLetter, game);
    }
}

function validateResponse(playLetter, game, answer){
    
    if(playLetter.word !== playLetter.uncover.join("")){
        playLetter.letterExist(answer);
        wordSolved(playLetter, game);
        
    }
}

function moreWordsToPlay(game){
    game.removeItm();
    if(game.newList.length>0){
        var agn = game.word(game.newList);
        var nxt = new letter(agn);
        playAgn(nxt, game);
    }else{
        console.log("Game Over");
    }
}