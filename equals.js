
var Sync = require('sync');

compare = require('./utils')

var expressions = [
{test:/\s*TEST\s*(.+)\s+(EQUALS|IS LIKE)\s+(.+)?$/g,"label":"Compare 2 Objects"
}]

Sync(function(){

var result = ""


module.exports.processLine = function(line){

	expressions.every(function(expression){

		
		var group = null;


		//Rest The Regular Expresssion
		//http://stackoverflow.com/questions/11477415/why-does-javascripts-regex-exec-not-always-return-the-same-value
		expression.test.exec("")

		group = expression.test.exec(line)

	

		objA = {}
		objB = {}

		var fuzzyMatch = group[2] == "IS LIKE" ? true : false;
		
		console.log("fuzzy match is " + fuzzyMatch)

		try{
			objA = JSON.parse(group[1])
		}catch(e){
			objA = eval(group[1].trim())
		}

		try{
			objB = JSON.parse(group[3])
		}catch(e){
			objB = eval(group[3].trim())
		}

		_compareTo(objA,objB,fuzzyMatch)			
		
	})

	
}
})