var Sync = require('sync');
var pp = require('parentpath');

var path = require('path');
utils = require('./utils')

global.chalk = require('chalk');






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

verbs = {
	"SETVAR" : "savevariablestoglobalscope",
	"DEBUG" : "echos",
	"SET":"setheader",
	"TEST":"evaluateuserexpression"
	,"GET":"geturl",
	"POST":"geturl",
	"PUT":"geturl",
	"DELETE":"geturl",
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

	files.every(function(file){

		global.linenumber = 0;

		if(path.extname(file) == ".test"){

			console.log("Running test for file " + testdir + file);

			var source = require('fs').readFile.sync(null, testdir  + file);

			source.toString().split('\n').every(function(line){

				global.linenumber++;

				firstword = line.match(/^\s*([^\s]+)\s/)

				if(firstword && firstword[1] ){
				
					 action = verbs[firstword[1].trim().toUpperCase()];

					 try{
						 if(action){

						 	instruction = require('./'+action);

						 	retCode = instruction.processLine(line);

						 	return global.found;

						 } else {

						 	return true;
						 }
					}catch(e){
						console.log(chalk.red("Error processing the following action on line " + linenumber + " of " + testdir + file));
						console.log((line));
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
	
})
