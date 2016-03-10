
var Sync = require('sync');



var expressions = [
{test:/^\s*SET\s+(?:VAR|variable)\s+(.*)$/i,"label":"Saving Result of User Expression"
}]


Sync(function(){

var result = ""


module.exports.processLine = function(line){

	expressions.every(function(expression){

		var group = null;

		group = line.match(expression.test)

	
		if(group != null && group[1]){

			group[1] = group[1].replace(variableSubstitution, function(curly,index,original){

				userSpecifiedVar = curly.substring(2,curly.indexOf("}"));
				//console.log("userSpecifiedVar " + userSpecifiedVar);
				userValue = eval("global."+userSpecifiedVar);

				//console.log("User value is " + userValue)

				if(global._.isNumber(userValue)){
					return userValue

				} else if(global._.isObject(userValue)){
				
					return userSpecifiedVar;

				}else {
					//add quotes around string values

					return '"'+ userValue+ '"'
				}
				
			});
		
			eval(group[1]);
		
			
		}

		

	})

	
}
})