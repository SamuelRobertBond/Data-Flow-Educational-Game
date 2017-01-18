this.PuzzleProcessor = function(inputPipe, outputPipe, puzzleNumber){

	var puzzlehandler = new PuzzleHandler();
	var puzzleInput = puzzlehandler.getPuzzleInput(puzzleNumber);
	var puzzleOutputs = puzzlehandler.getPuzzleOutput(puzzleNumber);
	var puzzleDescription = puzzlehandler.getPuzzleDescription(puzzleNumber);

	//Checks if the flow can process
	//Checks each iteration until either there are no empty pipes connected to the source or an empty pipe is found
	var canProcess = function(pipe){
		
		if(pipe.getReceivingPipe() != null){
			if(!pipe.getReceivingPipe().hasFlow()){
				return true;
			}else{
				return canProcess(pipe.getReceivingPipe());
			}
		}

		if(pipe.isOutput() || pipe.getFlow() == null){
			return true;
		}

		return false;
	}

	//Process the input arrays top element
	//Pushes flow into the pipes
	this.process = function(){
		if(canProcess(inputPipe) || !inputPipe.hasFlow()){
			if(puzzleInput.length == 0){
				puzzleInput = puzzlehandler.getPuzzleInput(puzzleNumber);
			}
			
			inputPipe.pushFlow(puzzleInput.pop());
			
		}else{
			out.value += "\n> Pipes Clogged"
			out.scrollTop = out.scrollHeight;
		}
	}

	this.reset = function(){
		puzzleInput = puzzlehandler.getPuzzleInput(puzzleNumber);
	}

	this.getPuzzleOutputs = function(){
		return puzzleOutputs;
	}

	this.getPuzzleDescription = function(){
		return puzzleDescription;
	}

}