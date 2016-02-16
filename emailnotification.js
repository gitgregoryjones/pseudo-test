
var expressions = [
{test:/^Email\s+([^@]+@[^@\s]+)\s*/,"label":"Email notifications sent to"
}]

global._p.emails = [];

found = false;

module.exports.processLine = function(line){
	

	expressions.forEach(function(expression){

		group = null;

		//console.log("Testing line " + line + " Against" + expression.test)

		group = line.match(expression.test)

		if(group != null && group[1]){

			console.log(expression.label + " " + group[1])
			global._p.emails.push(group[1])
			found = true;
		} 

	})

	return found;

}