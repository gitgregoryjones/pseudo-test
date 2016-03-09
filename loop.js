var Sync = require('sync');
var pp = require('parentpath');

var path = require('path');
utils = require('./utils')


var expressions = [
{test:/\s*LOOP\s+(\w+)\s+AS\s+(\w+)\s*(?:\n+([\s\S]+)\n+\s*)+ENDLOOP/im,"label":"Calling LOOP"
}]


module.exports.processLine = function(line,linenumber){


		group = line.match(/\s*LOOP\s+(\w+)\s+AS\s+(\w+)\s*(?:\n+([\s\S]+)\n+\s*)+ENDLOOP/im);

		console.log("GROUP IS ")

		console.log(group);

		if(group !=null && group[3] != null){

			var userArray = eval(group[1]);

			var userObject = group[2];

			var content = group[3];


			//1. Get Content between LOOP and ENDFOR

			//2. Loop over Content Block and put 'AS' variable into context

			userArray.forEach(function(obj){

				global[userObject] = obj;

				global.linenumber = linenumber;

				content.toString().split('\n').every(function(subline){

				global.linenumber++;

					firstword = subline.match(/^\s*([^\s]+)\s/)

					if(firstword && firstword[1] ){
					
						 action = verbs[firstword[1].trim().toUpperCase()];
							 if(action){

							 	instruction = require('./'+action);

							 	retCode = instruction.processLine(subline);

							 	return global.found;

							 } else {

							 	return true;
							 }
					
					} else {
						return true;
					}

    			})

				

			})

	}

}
