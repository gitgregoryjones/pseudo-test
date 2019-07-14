
/* Setting some global doc line */
/* It's gotta be funky */
/* It's happening again */
/* And still more */
/* Look for me on QA */
/* Last but not least */
=======

var Sync = require('sync');
var pp = require('parentpath');

var path = require('path');
utils = require('./utils')
mock = require('./mock')

global.chalk = require('chalk');

//TODO: Do something
//Because I said so




global._p = {}
global.found = true;
global._ = require("underscore")
global._DEFAULT_ = "$";
global.variableToken = "";

global.setSpecialChar = function(special){
	global.variableToken = special;
	global.variableSubstitution = new RegExp("\\" + variableToken + "{[^" + variableToken + "]+}",'g');
}


setSpecialChar(_DEFAULT_);

global.verbs = {
	"CALL" : "call",
	"INCLUDE" : "include",
	"SETVAR" : "savevariablestoglobalscope",
	"DEBUG" : "echos",
	"SET":"set",
	"TEST":"evaluateuserexpression"
	,"GET":"geturl",
	"POST":"geturl",
	"PUT":"geturl",
	"DELETE":"geturl",
	"LOOP":"loop",
	"ENDLOOP":"endloop",
	"EMAIL":"emailnotification"
};

Sync(function(){

	

	require('fs').mkdir("tests",function(err){
		//silently fail if directory already exists
		if(err && err.code != "EEXIST")
			console.log(err)
	});
	

	try {

	testdir = pp.sync('node_modules');

	console.log("Found testdir at " + testdir);

	
	//This is being called from another nodejs project. Set TestDir to dir + "/tests"
	testdir = testdir + "/tests/"
	
	console.log("Test directory is " + testdir);


	var files = require('fs').readdir.sync(null,testdir);

	console.log("I see " + files.length + " test(s)");

	var content = "";
	var searchingForEndLoop = false;
	var forLoopLine = 0;

	var linesToProcess = []
	

	/*Loop through tests and execute any commands found in them*/
	files.every(function(file){

		global.linenumber = 0;

		if(path.extname(file) == ".test"){

			console.log("Running test for file " + testdir + file);

			var source = require('fs').readFile.sync(null, testdir  + file);

			linesToProcess = source.toString().split('\n');

			//Use reqular for loop
			linesToProcess.every(function(line){

				

				global.linenumber++;

				
				firstword = line.match(/^\s*([^\s]+)\s*/)
		if(firstword && firstword[1] ){
				
					 action = verbs[firstword[1].trim().toUpperCase()];

					 try{
						
 						if(action){

							if(action.toUpperCase().trim() == "LOOP" ) {
								console.log("FOUND BEGINNING LOOP")
						 		content = line;
						 		searchingForEndLoop = true;
						 		instruction = require('./'+action);
						 		forLoopLine = global.linenumber;
						 	
						 		return true;

						 	} else if(searchingForEndLoop){

						 		content += "\n" + line;

						 		if(action.toUpperCase().trim() == "ENDLOOP" ){

						 			console.log("FOUND ENDLOOP")
						 			searchingForEndLoop = false;
						 			//note: instruction still points to "loop.js" since we did not call
						 			//require('./'+action) since the last time we found LOOP verb above
						 			instruction.processLine(content,forLoopLine);
						 			return global.found;
						 		}

						 		return true;

						 	}else {

							 	instruction = require('./'+action);

							 	retCode = instruction.processLine(line);

							 	return global.found;
						 	} 	

						 } else {

						 	return true;
						 }



					}catch(e){
						console.log(chalk.red("Error processing the following action on line " + linenumber + " of " + testdir + file));
						console.log((linesToProcess[linenumber-1]));
						console.log(chalk.red(e));
						global.found = false;
					}
				} else {
					//console.log("Bad line " + line)
					return true;
				}

    		}) 

		}
		return true;
	})

	
	if(searchingForEndLoop){
		console.log(chalk.red("Overall Status : ") + chalk.red("FAILURE"))
		console.log(chalk.red("Failed to find matching ENDLOOP for FOR LOOP starting on line " + forLoopLine ))
		process.exit(1)

	} else


	if(global.found == true){
		console.log(chalk.blue("Overall Status : ") + chalk.green("ALL TESTS PASSED"))
		process.exit()
	} else {
		console.log(chalk.blue("Overall Status : ") + chalk.red("FAILURE"))
		process.exit(1)
	}

	}catch(e){
		console.log(e);
	}
	//Do nothing
	
})
