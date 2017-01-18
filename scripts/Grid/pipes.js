var TO_RADIANS = Math.PI / 180;

//Default Stright Pipe
//Pumps flow into one direction
function DefaultPipe(input, output, tile){
	
	var pipeImage = new Image();
	pipeImage.src = "assets/defaultpipe.png";

	var up = false;
	var down = false;
	var left = true;
	var right = true;
	var angle = 0;

	var flow = null;
	var receivingPipe = null;

	this.tile = tile;

	var modifier = null;
	var enableSelected = false;

	//Rotates the object if called
	this.rotate = function(){

		console.log("rotated");

		receivingPipe = null;

		if(left == true){
			up = true;
			down = true;
			left = false;
			right = false;
			angle = 90;
		}else{
			up = false;
			down = false;
			left = true;
			right = true;
			angle = 0;
		}
	}

	//Draws the pipe
	this.draw = function(x, y, width, height){

		ctx.save(); 
		ctx.translate(x + (width/2), y + (width/2));
		ctx.rotate(angle * TO_RADIANS);
		ctx.beginPath();
		ctx.rect(x, y, width, height);

		if(input || output){
			ctx.fillStyle = "#f9353a";
			ctx.fillRect(-(width/2), -(width/2), width, height/4);
			ctx.fillRect(-(width/2), -(width/2) * -.5, width, height/4);
		}

		if(enableSelected){
			ctx.fillStyle = "#79ffff";
			ctx.fillRect(-(width/2), -(width/2), width, height/4);
			ctx.fillRect(-(width/2), -(width/2) * -.5, width, height/4);
		}else if(modifier != null && !(input || output)){
			ctx.fillStyle = "#d1ed61";
			ctx.fillRect(-(width/2), -(width/2), width, height/4);
			ctx.fillRect(-(width/2), -(width/2) * -.5, width, height/4);
		}

		if(flow != null){
			ctx.fillStyle = flow;
			ctx.fillRect(-(width/2), -(width/2) * .6, width, height* .6);
		}

		ctx.drawImage(pipeImage, -(width/2), -(width/2), width, height);

		ctx.closePath();
		ctx.restore(); 
	}

	//Checks if the pipe is an input or output pipe
	this.isIOPipe = function(){
		return (input || output);
	}

	//Checks if the pipe is an output pipe
	this.isOutput = function(){
		return output;
	}

	//Returns the up truth value of this pipe
	this.getUp = function(){
		return up;
	}

	//Returns the down truth value of this pipe
	this.getDown = function(){
		return down;
	}

	//Returns the left truth value of this pipe
	this.getLeft = function(){
		return left;
	}

	//Returns the right truth value of this pipe
	this.getRight = function(){
		return right;
	}

	//Returns whether or not the pipe has flow
	this.hasFlow = function(){
		return flow != null;
	}

	//Sets the recieving pipe used to push flow
	this.setReceivingPipe = function(pipe){
		receivingPipe = pipe;
	}

	//Returns the Receiving Pipe
	this.getReceivingPipe = function(){
		return receivingPipe;
	}

	//Returns the flow
	this.getFlow = function(){
		return flow;
	}

	//Sets the initial flow
	//Only used in input, I do this instead of set flow to protect how the flow works (Long story short in earlier iterations I was dumb)
	this.setInitialFlow = function(flow2){
		if(input){
			flow = flow2;
		}
	}

	//Pushes the flow to the receiving pipe and sets the flow of itself to the flow that was pushed to it
	this.pushFlow = function(nextFlow){
		if(modifier != null){
			flow = modifier.modifyFlow(flow);
		}

		if(output){
			flow = nextFlow;
		}
		else if(flow == null){
			flow = nextFlow;
			//console.log("flow pushed");
		}
		else{
			//console.log("receivingPipe pushed");
			receivingPipe.pushFlow(flow);
			flow = nextFlow;
		}
	}

	//Resets the receving pipes and flow
	//Used to reset the board without deleting it
	this.reset = function(){
		flow = null;
		receivingPipe = null;
	}

	this.setSelected = function(selected){
		enableSelected = selected;
	}

	this.setModifier = function(mod){
		modifier = mod;
	}

	this.getModifier = function(){
		return modifier;
	}

}

function CornerPipe(input, output, tile){
	
	var pipeImage = new Image();
	pipeImage.src = "assets/cornerpipe.png";

	var up = true;
	var down = false;
	var left = false;
	var right = true;
	var angle = 270;
	this.input = input;
	this.output = output;

	var receivingPipe = null;
	var flow = null;

	var modifier = null;
	var enableSelected = false;

	this.rotate = function(){

		receivingPipe = null;

		angle = angle + 90;

		if(angle == 360){
			angle = 0;
			up = false;
			down = true;
			left = false;
			right = true;
		}else if(angle == 90){
			up = false;
			down = true;
			left = true;
			right = false;
		}else if(angle == 180){
			up = true;
			down = false;
			left = true;
			right = false;
		}else if (angle == 270){
			up = true;
			down = false;
			left = false
			right = true;
		}

		if(!(input)){
			flow = null;
		}

		console.log("Up: " + up + ", Down: " + down + ", Left: " + left + ", Right: " + right);
	}

	this.draw = function(x, y, width, height){

		ctx.save(); 
		ctx.translate(x + (width/2), y + (width/2));
		ctx.rotate(angle * TO_RADIANS);
		
		if(input || output){
			ctx.fillStyle = "#f9353a";
			ctx.fillRect(-(width/2), -(width/2), width, height/4);
			ctx.fillRect(-(width/2), -(width/2), width/4, height);
			ctx.fillRect(-(width/2) * -.5, -(width/2) * -.5, width * .249, height/4);
		}

		if(enableSelected){
			ctx.fillStyle = "#79ffff";
			ctx.fillRect(-(width/2), -(width/2), width, height/4);
			ctx.fillRect(-(width/2), -(width/2), width/4, height);
			ctx.fillRect(-(width/2) * -.5, -(width/2) * -.5, width * .249, height/4);
		}else if(modifier != null &&  !(input || output)){
			ctx.fillStyle = "#d1ed61";
			ctx.fillRect(-(width/2), -(width/2), width, height/4);
			ctx.fillRect(-(width/2), -(width/2), width/4, height);
			ctx.fillRect(-(width/2) * -.5, -(width/2) * -.5, width * .249, height/4);
		}

		if(flow != null){
				ctx.beginPath();
				ctx.rect(x, y, width, height);
				ctx.fillStyle = flow;
				ctx.fillRect(-(width/2) * .6, -(width/2) * .6, width * .8, height* .6);
				ctx.fillRect(-(width/2) * .5, -(width/2) * .6, width * .5, height* .8);
				ctx.closePath();
			}
		ctx.drawImage(pipeImage, -(width/2), -(width/2), width, height);
		ctx.restore();

	}

	//Checks if the pipe is an input or output pipe
	this.isIOPipe = function(){
		return (input || output);
	}

	//Checks if the pipe is an output pipe
	this.isOutput = function(){
		return output;
	}

	//Returns the up truth value of this pipe
	this.getUp = function(){
		return up;
	}

	//Returns the down truth value of this pipe
	this.getDown = function(){
		return down;
	}

	//Returns the left truth value of this pipe
	this.getLeft = function(){
		return left;
	}

	//Returns the right truth value of this pipe
	this.getRight = function(){
		return right;
	}

	//Returns whether or not the pipe has flow
	this.hasFlow = function(){
		return flow != null;
	}

	//Sets the recieving pipe used to push flow
	this.setReceivingPipe = function(pipe){
		receivingPipe = pipe;
	}

	//Returns the Receiving Pipe
	this.getReceivingPipe = function(){
		return receivingPipe;
	}

	//Returns the flow
	this.getFlow = function(){
		return flow;
	}

	//Sets the initial flow
	//Only used in input, I do this instead of set flow to protect how the flow works (Long story short in earlier iterations I was dumb)
	this.setInitialFlow = function(flow2){
		if(input){
			flow = flow2;
		}
	}
	this.pushFlow = function(nextFlow){
		
		if(modifier != null){
			flow = modifier.modifyFlow(flow);
		}

		if(!this.hasFlow()){
			flow = nextFlow;
			//console.log("flow pushed");
		}
		else{
			//console.log("receivingPipe pushed");
			receivingPipe.pushFlow(flow);
			flow = nextFlow;
		}
	}
	this.reset = function(){
		flow = null;
		receivingPipe = null;
	}

	this.setSelected = function(selected){
		enableSelected = selected;
	}

	this.setModifier = function(mod){
		modifier = mod;
	}

	this.getModifier = function(){
		return modifier;
	}

}

function ConditionPipe(tile, modifier){
	
	var pipeImage = new Image();
	pipeImage.src = "assets/defaultpipe.png";

	var up = false;
	var down = false;
	var left = true;
	var right = true;
	var angle = 0;

	var flow = null;
	var receivingPipe = null;

	this.tile = tile;

	var modifier = null;
	var enableSelected = false;

	//Rotates the object if called
	this.rotate = function(){

		console.log("rotated");

		receivingPipe = null;

		if(left == true){
			up = true;
			down = true;
			left = false;
			right = false;
			angle = 90;
		}else{
			up = false;
			down = false;
			left = true;
			right = true;
			angle = 0;
		}
	}

	//Draws the pipe
	this.draw = function(x, y, width, height){

		ctx.save(); 
		ctx.translate(x + (width/2), y + (width/2));
		ctx.rotate(angle * TO_RADIANS);
		ctx.beginPath();
		ctx.rect(x, y, width, height);

		if(input || output){
			ctx.fillStyle = "#f9353a";
			ctx.fillRect(-(width/2), -(width/2), width, height/4);
			ctx.fillRect(-(width/2), -(width/2) * -.5, width, height/4);
		}

		if(enableSelected){
			ctx.fillStyle = "#79ffff";
			ctx.fillRect(-(width/2), -(width/2), width, height/4);
			ctx.fillRect(-(width/2), -(width/2) * -.5, width, height/4);
		}else if(modifier != null && !(input || output)){
			ctx.fillStyle = "#d1ed61";
			ctx.fillRect(-(width/2), -(width/2), width, height/4);
			ctx.fillRect(-(width/2), -(width/2) * -.5, width, height/4);
		}

		if(flow != null){
			ctx.fillStyle = flow;
			ctx.fillRect(-(width/2), -(width/2) * .6, width, height* .6);
		}

		ctx.drawImage(pipeImage, -(width/2), -(width/2), width, height);

		ctx.closePath();
		ctx.restore(); 
	}

	//Checks if the pipe is an input or output pipe
	this.isIOPipe = function(){
		return (input || output);
	}

	//Checks if the pipe is an output pipe
	this.isOutput = function(){
		return output;
	}

	//Returns the up truth value of this pipe
	this.getUp = function(){
		return up;
	}

	//Returns the down truth value of this pipe
	this.getDown = function(){
		return down;
	}

	//Returns the left truth value of this pipe
	this.getLeft = function(){
		return left;
	}

	//Returns the right truth value of this pipe
	this.getRight = function(){
		return right;
	}

	//Returns whether or not the pipe has flow
	this.hasFlow = function(){
		return flow != null;
	}

	//Sets the recieving pipe used to push flow
	this.setReceivingPipe = function(pipe){
		receivingPipe = pipe;
	}

	//Returns the Receiving Pipe
	this.getReceivingPipe = function(){
		return receivingPipe;
	}

	//Returns the flow
	this.getFlow = function(){
		return flow;
	}

	//Sets the initial flow
	//Only used in input, I do this instead of set flow to protect how the flow works (Long story short in earlier iterations I was dumb)
	this.setInitialFlow = function(flow2){
		if(input){
			flow = flow2;
		}
	}

	//Pushes the flow to the receiving pipe and sets the flow of itself to the flow that was pushed to it
	this.pushFlow = function(nextFlow){
		if(modifier != null){
			flow = modifier.modifyFlow(flow);
		}

		if(output){
			flow = nextFlow;
		}
		else if(flow == null){
			flow = nextFlow;
		//	console.log("flow pushed");
		}
		else{
		//	console.log("receivingPipe pushed");
			receivingPipe.pushFlow(flow);
			flow = nextFlow;
		}
	}

	//Resets the receving pipes and flow
	//Used to reset the board without deleting it
	this.reset = function(){
		flow = null;
		receivingPipe = null;
	}

	this.setSelected = function(selected){
		enableSelected = selected;
	}

	this.setModifier = function(mod){
		modifier = mod;
	}

	this.getModifier = function(){
		return modifier;
	}

}


