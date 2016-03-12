
var Sync = require('sync');

var expressions = [{test:/^\s*INCLUDE\s+(.*)$/i,"label":"Including module"}]

Sync(function(){


module.exports.processLine = function(line){

	expressions.every(function(expression){

		var group = null;

		group = line.match(expression.test)
	
		if(group != null){

			console.log("Processing " + expression.label + " " + line)

			tmpImport = "'./" + group[1].trim() + "'";

			moduleAlias = group[1].trim().replace(/\//g,'_');

			console.log("Registering module alias as " + moduleAlias)

			try {

			global[moduleAlias] = eval("require("+tmpImport+")");

			}catch(e){
				console.log("This project is including in another project. realigning path")
				tmpImport = "'../../" + group[1].trim() + "'";
				moduleAlias = group[1].trim().replace(/\//g,'_').replace(/-/g,"_");
				console.log("Registering module alias as " + moduleAlias)
				global[moduleAlias] = eval("require("+tmpImport+")");
			}
			
		}

		return true;
		
	})

	
}
})