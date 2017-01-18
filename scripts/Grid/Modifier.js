function Modifier(modifier, condition, func){

	if(condition == "Orange"){ 
		condition = "OrangeRed";
	}

	this.modifyFlow = function(flow){

		if(modifier == "IF"){
			if(func == "Pass"){
				if(flow == condition){
					return flow;
				}else{
					return null;
				}
			}else if(func == "Block"){
				if(flow == condition){
					return null;
				}else{
					return flow;
				}
			}else if(func == "Make Red"){
				if(condition == flow){
					return "Red";
				}else{
					return flow;
				}
			}else if(func == "Make Blue"){
				if(condition == flow){
					return "Blue";
				}else{
					return flow;
				}
			}else if(func == "Make Green"){
				if(condition == flow){
					return "Green";
				}else{
					return flow;
				}
			}
		}else if(modifier == "Function"){
			if(func == "Make Purple"){
				return "Purple";
			}else if(func == "Make Magenta"){
				return "Magenta";
			}else if(func == "Make Orange"){
				return "OrangeRed";
			}
		}
	}

	this.getModifier = function(){
		return modifier;
	}

	this.getCondition = function(){
		return condition;
	}

	this.getFunction = function(){
		return func;
	}
}

function OutputModifier(outputArray){

	var completed = false;
	var index = 0;

	console.log("Output Modifier Set");

	outputArray = outputArray.reverse();

	this.reset= function(){ 
		index = 0;
	}

	this.modifyFlow = function(flow){ 
		if(flow == outputArray[index]){
			++index;
			out.value += "\n> Correct Flow Received"
			if(outputArray.length == index){
				enableFlow = false;
				out.value = "> Puzzle Completed!"
				completed = true;
			}
		}else if(flow != null){ 
			out.value += "\n> Output Failed at " + flow + "\n> Excpected: " + outputArray[index] + "\n";
			index = 0;
			enableFlow = false;
		}

		out.scrollTop = out.scrollHeight;
	}

	this.isComplete = function(){
		return completed;
	}

}