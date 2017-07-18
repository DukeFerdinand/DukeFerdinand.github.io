(function(){
"use strict";

//Computer's Array
var gameArray = [];

//User's Array
var userArray = [];
var round = 0;
//sets status of start button
var clicked = false;

var timeoutID;

var doneDisplaying = true;
//set time to 1000
var time = 1000;

//User clicks the start button====================================================================
$('#controls').click(function(){
	if (clicked == false){ 
		gameArray = [];
		userArray = [];
		clicked = true;
		$('#round>h2').text('');
		$('#lcd-test').text('Round');
		changeStartButton();
		runSequence();
	} else {
		resetGame();
	}
	
})


//Clears game & changes button back to start=======================================================
function resetGame(){
	userArray = [];
	gameArray = [];
	round = 0;
	window.clearTimeout(timeoutID);
	$('#controls').text('Start');
	$('.boxes').addClass("boxes-opacity");
	clicked = false;
	}

//Changes start button to Restart===============================================================
function changeStartButton(){
	$('#controls').text('Restart');
}

//User clicks the box============================================================================
$('.boxes').click(function(){
	if (doneDisplaying == true && gameArray.length >= 0){
		userArray.push(this.id)
		compareArrays();
	} else {
		$('.boxes:active').css('');
	}
})

//Makes the game faster=========================================================================
var speed = 1;
$('#level').click(function(){
	speed ++;
	if (speed <= 4){
		time = time/1.3;
		$('#level').text('Level ' + speed);
	} else {
		time = 1000;
		$('#level').text('Level 1')
		return speed = 1
	}
})


//Runs the game ================================================================================
function runSequence(){
	if (gameArray.length > 0) {
		lightUpArray();
	} else {
		lightUpNew();
	}
}
//Lights up the stored gameArray=================================================================
function lightUpArray(){
	doneDisplaying = false;
	var i = 0;
	var displayInterval = setInterval(function(){

		if (i == gameArray.length){
			doneDisplaying = true;
			lightUpNew();
			clearInterval(displayInterval);
		}

		window.setTimeout(function(){
			 i++;
		}, time * 0.501)

		$("#" + gameArray[i]).removeClass("boxes-opacity");

		window.setTimeout(function(){
		$('#' + gameArray[i]).addClass("boxes-opacity");

		}, time/3)

	}, time)
}


//Lights up the a random square====================================================================
function lightUpNew(){
	if (doneDisplaying) {

			addRound();

			var random = Math.floor((Math.random() * 4) + 1);

			gameArray.push('box' + random);

			$("#box" + random).removeClass("boxes-opacity");

			window.setTimeout(function(){
				$("#box" + random).addClass("boxes-opacity");
			}, time/2)

	}
}
//adds round to counter============================================================================
function addRound(){
	round++;
	$('#lcd-text').html('Round' + '<br>' + round);
}

//Compares Arrays via turning to string=============================================================
function compareArrays(){
	if (gameArray.length == userArray.length && doneDisplaying == true){
		if (gameArray.join('') == userArray.join('')) {
			userArray = [];
			runSequence();
		} else {

			gameOver();
			userArray = [];
			gameArray = [];
			$("#round>h2").text("YOU LOST! You got to round " + round)
			round = 0;
		}
	}
}

//Game Over function, melts off screen==============================================================
function gameOver(){
	$('.second-container').animate({
		height: '+=6000px',
		width: '+=6000px',
		opacity: '-=6'
	}, 2000).animate({
		height: '-=6000px',
		width: '-=6000px',
		opacity: '+=6'
	})
}
})();