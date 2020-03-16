


//Testing it out
var expressions = [
{test:/^Set\s+Header\s+"([^(":)]+)"\s*:\s*"([^(")]+)".*/i,"label":"Setting Request Header"
}]

global._p.headers = {};

module.exports.processLine = function(line){
	

	expressions.forEach(function(expression){

		group = null;

		//console.log("Testing line " + line + " Against" + expression.test)

		group = line.match(expression.test)

		if(group != null && group[1]){

			console.log(chalk.green(expression.label + " " + group[1] + ":" + group[2]))
			global._p.headers[group[1]] = group[2];
		} 

	})
}
