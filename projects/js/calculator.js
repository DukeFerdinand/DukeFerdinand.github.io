(function(){

/*
 _______  _______  _        _______           _        _______ _________ _______   
(  ____ \(  ___  )( \      (  ____ \|\     /|( \      (  ___  )\__   __/(  ____ \  
| (    \/| (   ) || (      | (    \/| )   ( || (      | (   ) |   ) (   | (    \/  
| |      | (___) || |      | |      | |   | || |      | (___) |   | |   | (__      
| |      |  ___  || |      | |      | |   | || |      |  ___  |   | |   |  __)     
| |      | (   ) || |      | |      | |   | || |      | (   ) |   | |   | (        
| (____/\| )   ( || (____/\| (____/\| (___) || (____/\| )   ( |   | |   | (____/\  
(_______/|/     \|(_______/(_______/(_______)(_______/|/     \|   )_(   (_______/  
                                                                                   
				  _________         _________ _______                                                
				  \__   __/|\     /|\__   __/(  ____ \                                               
				     ) (   | )   ( |   ) (   | (    \/                                               
				     | |   | (___) |   | |   | (_____                                                
				     | |   |  ___  |   | |   (_____  )                                               
				     | |   | (   ) |   | |         ) |                                               
				     | |   | )   ( |___) (___/\____) |                                               
				     )_(   |/     \|\_______/\_______)                                               
				                                                                                     
*/


	"use strict";

//=========================================================================
// 		Some Variables
//=========================================================================

var clear = document.getElementById("C");
var decimal = document.getElementById("decimal");
var equals = document.getElementById("answer");
var leftOperand = document.getElementById("left-operand");
var numbers = document.getElementsByClassName("number");
var operators = document.getElementsByClassName("operators");
var rightOperand = document.getElementById("right-operand");


//=========================================================================
// These take the value of whatever the user types
//=========================================================================
var answerCount = 0;

var box1 = '';
var box2 = '';


//=========================================================================
// 		For loop adds event listener for first number
//=========================================================================


for (var i = 0; i < numbers.length ; ++i){

	 numbers[i].addEventListener('click', stageFirstNumber);


}

//=========================================================================
//		This function inputs the number to the first operand
//=========================================================================


function stageFirstNumber() {
	if (answerCount != 0 && operators != ''){
		clearNumbers();
	}
	if (leftOperand.innerText != '' && answerCount != 0){
		leftOperand.innerText = '';
		leftOperand.innerText += this.innerText;
		box2 = '';
		box1 = leftOperand.innerText;
	} else {
		leftOperand.innerText += this.innerText;
		box1 = leftOperand.innerText;
	}
	
}

//=========================================================================
//		This for loop adds event listeners to buttons for the operators
//=========================================================================


for (var k = 0; k < operators.length; ++k) {
	operators[k].addEventListener('click', stageOperation);


}


//===========================================================================
//		This function inputs only one opertor into the middle span at a time
//===========================================================================



function stageOperation(){
	if (parseInt(leftOperand.innerText) != NaN){	

	setupSecondNumber();

	leftOperand.innerText = '';
	leftOperand.innerText = this.innerText;

	if (answerCount != 0) {
		leftOperand.innerText = '';
		leftOperand.innerText = this.innerText;
		return operators = this.innerText;
		}
	
		return operators = this.innerText;
	}
}


//=========================================================================
//		This function inputs the second operand
//=========================================================================

function stageSecondNumber(){

	if (leftOperand.innerText == '+' || leftOperand.innerText == '-' || leftOperand.innerText == '*' || leftOperand.innerText == '/'){
	leftOperand.innerText = '';
	}
	if (box1 != ''){
	leftOperand.innerText += this.innerText;

	box2 = leftOperand.innerText;
	}
}


//=========================================================================
//		Decimal Function
//=========================================================================

function addDecimal(){
	if (leftOperand.innerText == '+' || leftOperand.innerText == '-' || leftOperand.innerText == '*' || leftOperand.innerText == '/'){
	leftOperand.innerText = '';
	}
	if (leftOperand.innerText.indexOf('.') == -1) {
		leftOperand.innerText += '.';
	}
	
}

//=========================================================================
//		Add Event Listener for Equals and Decimal
//=========================================================================


decimal.addEventListener('click', addDecimal);
equals.addEventListener('click', getAnswer);



//=========================================================================
//		Sets up first number when called
//=========================================================================
function setupFirstNumber () {
for (i = 0; i < numbers.length ; ++i){
		//removes the first Event Listener for the First Number
		numbers[i].removeEventListener('click', stageSecondNumber);
		//adds new Event Listener for Second Number
		numbers[i].addEventListener('click', stageFirstNumber);

	}
}

//=========================================================================
//		Sets up for second number when called
//=========================================================================

function setupSecondNumber() {
for (var i = 0; i < numbers.length ; ++i){

		numbers[i].removeEventListener('click', stageFirstNumber);
		numbers[i].addEventListener('click', stageSecondNumber);	
		}
}


//=========================================================================
//		Clears the Operator for continued operations
//=========================================================================
function clearOp(){
	operators = '';
	box1 = '';
	box2 = '';
}

//=========================================================================
//		This Function should get the answer by analyzing the operator var
//=========================================================================


function getAnswer() {

	if (box1 != '' && box2 != '' && operators != ''){

	for (i = 0; i < numbers.length ; ++i){
		//removes the first Event Listener for the First Number
		numbers[i].removeEventListener('click', stageSecondNumber);
		//adds new Event Listener for Second Number
		numbers[i].addEventListener('click', stageFirstNumber);

	}


	answerCount = answerCount + 1;

	switch (operators){
		case "+":
			
			box1 = (parseFloat(box1) + parseFloat(box2));
			
			leftOperand.innerText = box1.toFixed(2);
			

			break;
		case "-":
			box1 = (parseFloat(box1) - parseFloat(box2));
			leftOperand.innerText = box1.toFixed(2);
			
			
			break;
		case "*":
			box1 = (parseFloat(box1) * parseFloat(box2));
			leftOperand.innerText = box1.toFixed(2);
			

			break;
		case "/":
			box1 = (parseFloat(box1) / parseFloat(box2));
			if (box1 == Infinity || box1 == -Infinity){
				alert("Error, divide by 0");
				clearNumbers();
				setupFirstNumber();
			} else {
			leftOperand.innerText = box1.toFixed(2);
			}

			break;
		}
	}
}



//=========================================================================
//		This Function Clears and returns the buttons to normal
//=========================================================================

clear.addEventListener('click', clearNumbers);
function clearNumbers(){
	leftOperand.innerText = '';
	box1 = '';
	box2 = '';
	answerCount = 0;


	for (i = 0; i < numbers.length ; ++i){
		//removes the first Event Listener for the First Number
		numbers[i].removeEventListener('click', stageSecondNumber);
		//adds new Event Listener for Second Number
		numbers[i].addEventListener('click', stageFirstNumber);

		}
}

})();
