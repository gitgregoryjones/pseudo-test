
var Sync = require('sync');

var expressions = [
{test:/^\s*TEST\s+(.*)$/,"label":"Testing User Expression"
}]

Sync(function(){

var result = ""


module.exports.processLine = function(line){

	expressions.every(function(expression){

		var group = null;

		group = line.match(expression.test)

		if(group != null && group[1]){

			group[1] = group[1].replace(variableSubstitution, function(curly,index,original){
				//console.log("Original [" + original+"]");
				//console.log("Curly " + curly);
				//console.log("Index " + index);

				userSpecifiedVar = curly.substring(2,curly.indexOf("}"));
				//console.log("userSpecifiedVar " + userSpecifiedVar);
				userValue = eval("global."+userSpecifiedVar);

				//console.log("User value is " + userValue)

				if(global._.isNumber(userValue)){
					return userValue

				} else if(global._.isObject(userValue)){
					//console.log("Object original is " + original);
					//console.log("The following object is used for substitution")
					//console.log(eval("global."+userSpecifiedVar) );
					return userSpecifiedVar;

				}else {
					//add quotes around string values

					return '"'+ userValue+ '"'
				}
				
			});

			//Hack because JS does not like anon objects
			if(group[1].indexOf("equals") > -1)
				group[1] = "new Object("+ group[1].replace(".equals", ").equals");
			

			console.log("Running " + line.trim());
			console.log("Evaluating " + group[1] )

			var coke = false;
			
			coke = eval(group[1]);
		
			//console.log("Coke is " + coke)

			if(coke == true){
			
			} else {
				
				throw new Error("Test failed the following condition ==> ["  + group[1] + "] is not true")
				
			}
		}

		

	})

	
}
})