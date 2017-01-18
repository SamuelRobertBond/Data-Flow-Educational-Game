
var canvas = document.getElementById("canvas");
var bRect = canvas.getBoundingClientRect();

function Tile(x, y, width, height, locX, locY){
	
	var x = x;
	var y = y;
	var width = width;
	var height = height;

	var locX = locX;
	var locY = locY;
	var color = "rgba(0, 0, 255, 0.5)";
	var colorSwapped = false;

	//Sets up tiles adjacent
	var up;
	var down;
	var left;
	var right;

	var pipe = null;

	this.draw = function(){
		ctx.clearRect(x, y, width, height);
		if(pipe != null){
			pipe.draw(x, y, width, height);
		}else{
			ctx.beginPath();
			ctx.rect(x, y, width, height);
			ctx.strokeStyle = color;
			ctx.stroke();
			ctx.closePath();
		}
	}

	this.getX = function(){
		return x;
	}

	this.getY = function(){
		return y;
	}

	this.getWidth = function(){
		return width;
	}

	this.getHeight = function(){
		return height;
	}

	this.getXLoc = function(){
		return locX;
	}

	this.getYLoc = function(){
		return locY;
	}

	this.getPipe = function(){
		return pipe;
	}

	this.setPipe = function(newPipe){
		pipe = newPipe;
	}

	this.resizeTile = function(x2, y2, width2, height2){
		x = x2;
		y = y2;
		width = width2;
		height = height2;
	}


	this.checkClick = function(e){
		if((x + bRect.left <= e.clientX) && (y + bRect.top <= e.clientY) && (width + x + bRect.left >= e.clientX) && (height + y>= e.clientY)){
			
			console.log(locX + ", " + locY );

			console.log("Neighbor Tiles\n-----------------------");
			if(up != null){
				console.log("UP: " + up.getXLoc() + " " + up.getYLoc());
			}
			if(down != null){
				console.log("DOWN: " +  down.getXLoc() + " " + down.getYLoc());
			}
			if(left != null){
				console.log( "LEFT: " + left.getXLoc() + " " + left.getYLoc());
			}
			if(right != null){
				console.log( "RIGHT: " + right.getXLoc() + " " + right.getYLoc());
			}
			
			if(pipe != null){
				console.log(pipe.getReceivingPipe());
			}

			console.log("");

			return true;
		}
		return false;
	} 

	this.checkHover = function(e){
		if((x + bRect.left <= e.clientX) && (y + bRect.top <= e.clientY) && (width + x + bRect.left >= e.clientX) && (height + y>= e.clientY)){
			color = "rgba(255, 255, 0, 1)";
			colorSwapped = true;
		}else if(colorSwapped == true){
			color = "rgba(0, 0, 255, 0.5)";
			colorSwapped = false;
		}
	}

	this.handleMouseOut = function(e){
		color = "rgba(0, 0, 255, 0.5)";
		colorSwapped = false;
	}

	this.setVerticalNeighborTiles = function(up2, down2){
		up = up2;
		down = down2;
	}

	this.setHorizontalNeighborTiles = function(left2, right2){
		left = left2;
		right = right2;
	}

	this.findReceivingPipe = function(){
		
		if(pipe != null && pipe.getReceivingPipe() == null && pipe.hasFlow()){

			if(up != null && up.getPipe() != null){
				if(up.getPipe().getDown()){
				console.log("down is true for : " + locX + " " + locY );
				}
			}


			 if(up != null && up.getPipe() != null && up.getPipe().getDown() && pipe.getUp() && up.getPipe().getReceivingPipe() != pipe){
				return up.getPipe();
			}else if(down != null && down.getPipe() != null && down.getPipe().getUp() && pipe.getDown() && down.getPipe().getReceivingPipe() != pipe){
				return down.getPipe();
			}else if(left != null && left.getPipe() != null && left.getPipe().getRight() && pipe.getLeft() && left.getPipe().getReceivingPipe() != pipe){
				return left.getPipe();
			}else if(right != null && right.getPipe() != null && right.getPipe().getLeft() && pipe.getRight() && right.getPipe().getReceivingPipe() != pipe){
				return right.getPipe();
			}else{
				return null;
			
			}

		}else{
			return pipe.getReceivingPipe();
		}


	}

	
}