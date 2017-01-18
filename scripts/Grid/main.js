var canvas = document.getElementById("canvas");
var bRect = canvas.getBoundingClientRect();
var ctx = canvas.getContext("2d");
var out = null;
var index = 0;


canvas.width = bRect.right - bRect.left;
canvas.height = bRect.bottom - bRect.top;

var puzzles = null;

var puzzleIndex = 2;

if(puzzleIndex == 0){
	puzzles = [0, 1];
}else if(puzzleIndex == 1){
	puzzles = [2]
}else if(puzzleIndex == 2){
	puzzles = [3, 4]
}else{
	puzzles = [5];
}

var enableGrid = false;
var enablePuzzleIntro = true;
var enablePuzzleGlossary = false;

function puzzleSelectBox(){
	puzzleIndex = prompt("Please input a puzzle that you would like to attempt (1 through 6)");

	if(puzzleIndex != null && puzzleIndex > 0 && puzzleIndex < 7){
		grid = new GridController(0, 0, canvas.width, canvas.height, 6, puzzleIndex - 1);
	}else{
		puzzleSelectBox();
	}
}

//Draws the grid
function render(){
	if(grid != null){
		grid.draw();
	}
}
setInterval(render, 250);

function changePuzzle(){
	if(grid != null){
		if(grid.isComplete()){
			++index;
			if(index == puzzles.length){
				out.value = "> Set of puzzles is complete!\n\nPlease Hit Home Button!"
			}else{
			grid = new GridController(0, 0, canvas.width, canvas.height, 6, puzzles[index]);
			}
		}
	}
}
setInterval(changePuzzle, 250);

document.addEventListener("DOMContentLoaded", function(e){
	puzzleSelectBox();
});
