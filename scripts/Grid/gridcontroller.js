var enableFlow = false;

//Controls all of the Grid functions
function GridController(xpos, ypos, width, height, gridSize, puzzleIndex){

	var tileWidth = width/gridSize;
	var tileHeight = height/gridSize;
	var gridSize = gridSize;
	var tiles = [];
	var selectedTool = new PointerTool();

	//Creates the tiles for the gird
	for(var i = 0; i < gridSize; ++i){
		for(var j = 0; j <gridSize; ++j){
			var x = j * tileWidth;
			var y = i * tileHeight;
			tiles.push(new Tile(x, y, tileWidth, tileHeight, i, j));
		}
	}

	tiles[0].setPipe(new DefaultPipe(true, false, tiles[0]));
	tiles[0].getPipe().rotate();

	outputPipe = new DefaultPipe(false, true, tiles[tiles.length - 1]);

	var puzzleProcessor = new PuzzleProcessor(tiles[0].getPipe(), tiles[tiles.length - 1].getPipe(), puzzleIndex);

	tiles[tiles.length-1].setPipe(outputPipe);

	//Sets all the tiles neighbors
	for(var i = 0; i < gridSize; ++i){
		for(var j = 0; j < gridSize; ++j){
			//Sets left and right tiles
			if(j == 0){
				tiles[(i * gridSize) + j].setHorizontalNeighborTiles(null, tiles[j + (i*gridSize) + 1]);
			}else if(j == (gridSize - 1)){
				tiles[(i * gridSize) + j].setHorizontalNeighborTiles(tiles[j + (i*gridSize) - 1], null);
			}else{
				tiles[(i * gridSize) + j].setHorizontalNeighborTiles(tiles[j + (i*gridSize) - 1], tiles[j + (i*gridSize) + 1]);
			}	

			//Sets up and down tiles
			if(i == 0){
				tiles[ j + (i * gridSize)].setVerticalNeighborTiles(null, tiles[(i+1) * gridSize + j]);
			}else if(i == (gridSize - 1)){
				tiles[ j + (i * gridSize)].setVerticalNeighborTiles(tiles[(i-1) * gridSize + j], null);
			}else{
				tiles[ j + (i * gridSize)].setVerticalNeighborTiles(tiles[(i-1) * gridSize + j], tiles[(i+1) * gridSize + j]);
			}
		}
	}

	//Calls the draw function for each tile to be drawn on the canvas
	this.draw = function(){
		for(var x = 0; x < tiles.length; ++x){
			tiles[x].draw();
		}
	}

	//Controls the processing of the flow for the tiles
	//Checks if the conditions have been met (Not Completed)
	function act(){
		if(enableFlow){
			for(var x = 0; x < tiles.length; ++x){
				if(tiles[x].getPipe() != null && tiles[x].getPipe().getReceivingPipe() == null){
					tiles[x].getPipe().setReceivingPipe(tiles[x].findReceivingPipe());
				} 
			}
			resetPreformed = false;
			puzzleProcessor.process();
		}
	}
	setInterval(act, 250); 


	//Returns the tile that has been clicked on
	var getTile = function(e){
		for(var i = 0; i < tiles.length; ++i){
			if(tiles[i].checkClick(e)){
				
				return tiles[i];
			}
		}
		return null;
	}

	//Handles what to do when a tile is clicked
	window.addEventListener("click", function(e){
		var selectedTile = getTile(e);		
		if(selectedTile != null && !enableFlow){
			selectedTool.processTile(selectedTile);
		}

	}, false);

	//Handles what to do when a tile is hoverd over
	//Highlights tile
	window.addEventListener("mousemove", function(e){
		for(var i = 0; i < tiles.length; ++i){
			tiles[i].checkHover(e);
		}
	}, false);

	//Handles Canvas window resizing
	//Resizes every tile to draw properly
	window.addEventListener("resize", function(e){

		bRect = canvas.getBoundingClientRect();

		width = bRect.right - bRect.left;
		height = bRect.bottom - bRect.top;

		canvas.width = width;
		canvas.height = height;

		tileWidth = width/gridSize;
		tileHeight = height/gridSize;

		console.log("\nCanvas X: " + bRect.left + ", Canvas Y: " + bRect.top + ", Canvas Width: "+ width + ", Canvas Height: " + height );
		console.log("Tile Width: " + tileWidth + ", " + ", Tile Height: " + tileHeight);

		var count = 0;
		for(var i = 0; i < gridSize; ++i){
			for(var j = 0; j <gridSize; ++j){
				var x = j * tileWidth;
				var y = i * tileHeight;
				tiles[count].resizeTile(x, y, tileWidth, tileHeight);
				++count;
			}
		}
	}, false);

	//Handles what to do when the mouse leaves the canvas
	//unhighlights tile
	window.addEventListener("mouseout", function(e){
		for(var i = 0; i < tiles.length; ++i){
			tiles[i].handleMouseOut(e);
		}
	}, false);

	//Disables Context Menu and allows right clicking on tiles to rotate them
	window.addEventListener("contextmenu", function(e){
		e.preventDefault();

		var selectedTile = getTile(e);
		
		if(selectedTile != null && !enableFlow){
			var selectedPipe = selectedTile.getPipe();
			if(selectedPipe != null  && !selectedPipe.isIOPipe()){
				selectedPipe.rotate();
			}
		}
		
	});


	//Configurations for ToolBox Buttons----------------------------------
	var toolMenu = document.getElementsByClassName("tools")[0];
	var buttons = toolMenu.getElementsByTagName("button");

	var pointerButton = buttons[0];
	var eraserButton = buttons[1];
	var defaultPipeButton = buttons[2];
	var cornerPipeButton = buttons[3];


	pointerButton.addEventListener("click", function(e){
		console.log("pointer clicked");
		selectedTool = new PointerTool();
	});

	eraserButton.addEventListener("click", function(e){
		console.log("eraserButton pressed");
		selectedTool = new EraserTool();
	});

	defaultPipeButton.addEventListener("click", function(e){
		console.log("d pipe button pressed");
		selectedTool = new DefaultPipeTool();
	});

	cornerPipeButton.addEventListener("click", function(e){
		console.log("c pipe button pressed");
		selectedTool = new CornerPipeTool();
	});
	//---------------------------------------------------------------------

		out = document.getElementById("out");
		out.value = puzzleProcessor.getPuzzleDescription();

		var outputModifier = new OutputModifier(puzzleProcessor.getPuzzleOutputs(puzzleIndex));
		outputPipe.setModifier(outputModifier);
		puzzleProcessor.reset();

		//Event Handlers for flow button
		var flowButton = document.getElementById("flowbutton");
		var	pipesReset = true;
		
		flowButton.addEventListener("click", function(e){

			//Enables Flow, Sets Up Tile Connections
			if(!enableFlow && pipesReset){
				outputModifier.reset();
				enableFlow = true;
				pipesReset = false;
				out.value = "> Flow Enabled\n---------------\n"
				out.scrollTop = out.scrollHeight;
				flowButton.value = "Stop Flow";
			}
			else{ //Resets pipe connections and puzzle inputs
				enableFlow = false;
				pipesReset = true;
				out.value = "> Flow Stopped\n\n" + puzzleProcessor.getPuzzleDescription();
				out.scrollTop = out.scrollHeight;
				puzzleProcessor.reset();
				for(var x = 0; x < tiles.length; ++x){
					if(tiles[x].getPipe() != null){
						tiles[x].getPipe().reset();
					}
				}
			}

		});

		this.isComplete = function(){
			return outputModifier.isComplete();
		}

}