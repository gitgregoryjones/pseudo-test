
/* Doc for Set.js */
/*** Set it off **/

var Sync = require('sync');



var expressions = [{test:/^Set\s+Header\s+"([^(":)]+)"\s*:\s*"([^(")]+)".*/i,"label":"Setting Request Header"
,"func":require('./setheader'),"label":"Setting Header"},
{test:/^\s*SET\s+(?:VAR|variable)\s+(.*)$/i,"label":"Saving Result of User Expression"
,"func":require('./savevariablestoglobalscope.js')}]


Sync(function(){


module.exports.processLine = function(line){

	expressions.every(function(expression){

		var group = null;

		group = line.match(expression.test)
	
		if(group != null){

			//console.log("Processing " + expression.label + " " + line)
			expression.func.processLine(line);
		
			
		}

		return true;
		
	})

	
}
})
