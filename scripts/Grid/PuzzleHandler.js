//Contains all possible Puzzles
this.PuzzleHandler = function(){

	//First Puzzle: Baby Steps
	//Decription: Introduction - Connect the Input with the output
		//Input: Various Colors
		//Output: Various Colors
		//Testing: Complete
	var firstPuzzleInputs = ["Red", "Blue", "Green", "Yellow", "Magenta", "Purple", "OrangeRed"];
	var firstPuzzleOutputs = ["Red", "Blue", "Green", "Yellow", "Magenta", "Purple", "OrangeRed", "Red", "Blue", "Green", "Yellow", "Magenta", "Purple", "OrangeRed", "Red", "Blue", "Green", "Yellow", "Magenta", "Purple", "OrangeRed"];
	var firstPuzzleDescription = "  Introduction\n --------------\n  Connect the Input with the output\n";

	//Second Puzzle: Feeling Blue?
	//Decription: Comparison Operators - Use the Pass function to only allow Blue through (==)
		//Input: Various Colors
		//Output: Blue
		//Testing: Complete
	var secondPuzzleInputs = ["Red", "Blue", "Green", "Yellow", "Magenta"];
	var secondPuzzleOutputs = ["Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue"];
	var secondPuzzleDescription = "  Feeling Blue?\n ---------------\n Only allow blue through";

	//Third Puzzle: Block Out the Sadness
	//Decription: Comparison Operators - Use the Block function to Deny Blue through (!=)
		//Input: Various Colors
		//Output: Various Colors - Blue
		//Testing: Complete
	var thirdPuzzleInputs = ["Red", "Blue", "Green", "Yellow", "Magenta", "Purple", "OrangeRed"];
	var thirdPuzzleOutputs = ["Red", "Green", "Yellow", "Magenta", "Purple", "OrangeRed", "Red", "Green", "Yellow", "Magenta", "Purple", "OrangeRed", "Red", "Green", "Yellow", "Magenta", "Purple", "OrangeRed", "Red", "Green", "Yellow", "Magenta", "Purple", "OrangeRed"];
	var thirdPuzzleDescription ="Block Out the Sadness\n -----------------\n  Deny Blue from going through";

	//Fourth Puzzle: Changing the Scale
	//Decription: Logical Operators - Use If Statements to only allow yellow and pink through (OR / AND)
		//Input: Red, Blue, Green, Yellow
		//Output: Red, Blue
		//Testing: Complete
	var fourthPuzzleInputs = ["Red", "Blue", "Green", "Yellow", "HotPink"];
	var fourthPuzzleOutputs = ["HotPink", "Yellow", "HotPink", "Yellow", "HotPink", "Yellow", "HotPink", "Yellow", "HotPink", "Yellow", "HotPink", "Yellow", "HotPink", "Yellow", "HotPink"]; 
	var fourthPuzzleDecription = "  Changing the Scale\n ---------------- \n Use If Statements to only allow yellow and pink through";

	//Fifth Puzzle: Citrus Factory
	//Description: Functions - Use the "Make Purple Function" to change the inputs to orange
		//Input: Red, Blue Green, Yellow
		//Output: Orange
		//Testing: Complete
	var fifthPuzzleInputs = ["Red", "Blue", "Green", "Yellow"];
	var fifthPuzzleOutputs = ["Purple", "Purple", "Purple", "Purple", "Purple", "Purple", "Purple", "Purple", "Purple", "Purple", "Purple", "Purple", "Purple", "Purple", "Purple", "Purple", "Purple", "Purple", "Purple", "Purple", "Purple"];
	var fifthPuzzleDescrition = " Citrus Factory\n --------------\nUse functions to make the flow purple";

	//Sixth Puzzle: Orange you glad you made it Blue?
	//Description: Recursion - Use functions and conditionals to make the flow blue
		//Input: Yellow
		//Output: Blue
		//Testing: Completed
	var sixthPuzzleInputs = ["Yellow"];
	var sixthPuzzleOutputs = ["Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue"];
	var sixthPuzzleDescription = "Orange you glad you made it blue?\n----------------------------------------\nUse functions and conditionals to make the flow blue\n\nInput: Yellow";


	//Lists of the Puzzle Inputs and Outputs
	var puzzleInputs = [firstPuzzleInputs, secondPuzzleInputs, thirdPuzzleInputs, fourthPuzzleInputs, fifthPuzzleInputs, sixthPuzzleInputs];
	var puzzleOutputs = [firstPuzzleOutputs, secondPuzzleOutputs, thirdPuzzleOutputs, fourthPuzzleOutputs, fifthPuzzleOutputs, sixthPuzzleOutputs];
	var puzzleDescriptions = [firstPuzzleDescription, secondPuzzleDescription, thirdPuzzleDescription, fourthPuzzleDecription, fifthPuzzleDescrition, sixthPuzzleDescription];

	//Organize Input Array
	puzzleInputs.push(firstPuzzleInputs); 


	this.getPuzzleInput = function(index){
		return puzzleInputs[index].slice(0);
	}

	this.getPuzzleOutput = function(index){
		return puzzleOutputs[index].slice(0);
	}

	this.getPuzzleDescription = function(index){
		return puzzleDescriptions[index];
	}
}