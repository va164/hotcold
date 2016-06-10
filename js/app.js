//initialize variables
'use strict';
var secret, 
uGuess, 
pastGuesses = [], 
count,
guessHtml, 
userFeedback,
priorGuess,
newButton,
form ,
input,
feedback,
countElement,
guesses;

$(document).ready(pageLoad);

 function pageLoad(){
	
	/*--- Display information modal box ---*/
  	$('.what').click(function(){
    	$('.overlay').fadeIn(1000);
  	});
  	/*--- Hide information modal box ---*/
  	$('a.close').click(function(){
  		$('.overlay').fadeOut(1000);
  	});

  	//fetch dom objects
  	newButton = $('a.new');
  	form = $('form');
  	input = $('#userGuess');
  	feedback = $('#feedback');
  	countElement = $('#count');
  	guesses = $('#guessList');

    //page loading
    newGame();
    //event handlers
    form.submit(function(event){
      event.preventDefault();
      getuGuess();
    });
    newButton.click(newGame);
}

//new game 
function newGame(){
	form.find('input[type=submit]').css('opacity','1');
	resetVariables();
	render();
	generateSecret();
}

//get the user's guess
function getuGuess(){
	uGuess = input.val();
	//reset input value
	input.val('');
	//re-focus on input 
	input.focus();
	//ensure valid input
	if(checkGuess()){return ;}
	//generate feedback
	generateFeedback();
	//track the past guesses
	trackGuess();
	//increment count
	guessCount();
	//render changes
	render();
}

  	//check for valid input
  	function checkGuess(){
  		if(uGuess % 1 !== 0){
  			alert('please input an integer');
  			return true;
  		}
  		if(uGuess < 0 || uGuess > 101){
  			alert('please choose an integer between zero and 100');
  			return true;
  		}
  		if(pastGuesses.length > 0){
			$.each(pastGuesses,function(guess,value){
				if(uGuess == value){
					priorGuess = true;
				}
			}); 
		}
		if(priorGuess){
			priorGuess = false;
			alert('You have already guessed this number');
			return true;
		}
    return false;
	}

//generate user feedback
function generateFeedback(){
	if(secret == uGuess){
		winner();
	} else if(Math.abs(secret - uGuess) < 5){
		userFeedback = "hot";
	} else if(Math.abs(secret - uGuess) < 10){
		userFeedback = 'warmer';
	} else if(Math.abs(secret - uGuess) < 20 && Math.abs(secret - uGuess) > 9){
		userFeedback = 'warm';
	} else if(Math.abs(secret - uGuess) < 30 && Math.abs(secret - uGuess) > 19){
		userFeedback = 'cold';
	} else {
		userFeedback = 'ice cold';
	}
}

//track past guesses
function trackGuess(){
	pastGuesses.push(uGuess);
	guessHtml = '';
	if(pastGuesses[0].length) {
		$.each(pastGuesses,function(guess,value){
			guessHtml += '<li>' + value + '</li>';
		});
	}
}

//track guess count
function guessCount(){
	count++;
}

	//page render function
function render(){
	guesses.html(guessHtml);
	countElement.html(count);
	feedback.html(userFeedback);
}

function winner(){
	userFeedback = 'Congrats! You guessed the right number. Click on new game to play another game';
	form.find('input[type=submit]').css('opacity','0');
}
  	
//generate secret number
function generateSecret(){
	secret = Math.round(Math.random()*100)+1;
}

//reset variables 
function resetVariables(){
	count = 0;
	pastGuesses = [];
	guessHtml='';
	uGuess = '';
	userFeedback = 'Please guess a number';
}
  	
  	

  




