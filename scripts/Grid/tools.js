var selectedPipe = null;
var modifierMenu = null;

//Sets a tile as selected
function PointerTool(){
	this.processTile = function(tile){
		if(tile != null){

			if(selectedPipe != null){
				selectedPipe.setSelected(false);
				modifierMenu.setPipe(null);
			}

			if(tile.getPipe() != null && !tile.getPipe().isIOPipe()){
				selectedPipe = tile.getPipe();
				modifierMenu.setPipe(tile.getPipe());
				selectedPipe.setSelected(true);
			}
		}

	}
}

//Tool for erasing tiles
function EraserTool(){
	this.processTile = function(tile){
		if(!tile.getPipe().isIOPipe()){
			tile.setPipe(null);
		}
	}
}

//Straight Pipe Placement tool
function DefaultPipeTool(){

	//Adds a default pipe to the tile
	this.processTile = function(tile){
		if(tile.getPipe() == null){
			tile.setPipe(new DefaultPipe(false, false, tile));
		}
	}

}

//Corner Pipe Placement Tool
function CornerPipeTool(){
	//Adds a corner pipe to a tile
	this.processTile = function(tile){
		if(tile.getPipe() == null){
			tile.setPipe(new CornerPipe(false, false, tile));
		}
	}
}


document.addEventListener("DOMContentLoaded", function(e){
	modifierMenu = new ModifierMenu();
});

