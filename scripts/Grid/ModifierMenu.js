function ModifierMenu(){
	
	var selectedModifier;

	var modifierSelect = document.getElementById("modifiers");
	var conditionSelect = document.getElementById("conditions");
	var functionSelect = document.getElementById("functions");

	console.log(conditionSelect);

	var selectedPipe = null;

	this.setPipe = function(pipe){
		selectedPipe = pipe;

		if(pipe != null && pipe.getModifier() != null){
			pipe.getModifier() 
		}else{

		}

	}

	this.resetSelectBoxes = function(){
		var length = conditionSelect.length;
		for(var x = 0; x < length; ++x){
			conditionSelect.remove(0);
		}

		length = functionSelect.length;
		for(var x = 0; x < length; ++x){
			functionSelect.remove(0);
		}
	}

	// Handles changes to subsequent select boxes based upon first option
	// If - Enables Conditions and Functions
	// IF-Else - Enables Conditions
	// Function - Enables Function Select Box, but not the condition check box
	var modifierChanged = function(e){

		//Simplifies adding text
		var addOption = function(box, text){
			var option = document.createElement("option");
			option.text = text;
			box.add(option);
		}

		//Then it determines what to set the select options to
		var value = modifierSelect.value;
		
		var length = conditionSelect.length;
		for(var x = 0; x < length; ++x){
			conditionSelect.remove(0);
		}

		length = functionSelect.length;
		for(var x = 0; x < length; ++x){
			functionSelect.remove(0);
		}

		 console.log("checked");

		if(value == "IF"){
			//Conditions
			addOption(conditionSelect, "Red");
			addOption(conditionSelect, "Blue");
			addOption(conditionSelect, "Green");
			addOption(conditionSelect, "Orange");

			//Functions
			addOption(functionSelect, "Pass");
			addOption(functionSelect, "Block");
			addOption(functionSelect, "Make Red");
			addOption(functionSelect, "Make Blue");
			addOption(functionSelect, "Make Green");
		}else if(value == "IF-Else"){

		}else if(value == "Function"){
			addOption(functionSelect, "Make Purple");
			addOption(functionSelect, "Make Magenta");
			addOption(functionSelect, "Make Orange");
		}
	}

	modifierSelect.addEventListener("change", modifierChanged, false);

	var addModButton = document.getElementById("modifierButton");
	addModButton.addEventListener("click", function(e){
		if(selectedPipe != null && modifierSelect.value != "None"){
			selectedPipe.setModifier(new Modifier(modifierSelect.value, conditionSelect.value, functionSelect.value));
		}else if(selectedPipe != null && modifierSelect.value == "None"){
			selectedPipe.setModifier(null);
		}
	}, false);

}