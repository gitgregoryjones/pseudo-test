/** Docs for GetURl */
var request = require("request");
var Sync = require('sync');
var xml2js = require('xml2js');

/* Get it */

retCode = 0;
Sync(function(){


module.exports.processLine = function(line,linenumber){

	var expressions = [
{test:/(^\s*GET|POST|PUT|DELETE)\s+(\d+)\s+([^\s]+)\s*(?:WITH\s+BODY\s+([^$]+))?/i,"label":"Calling URL"
}]

	expressions.forEach(function(expression){

		group = null;

		//console.log("Testing line " + line + " Against" + expression.test)

		group = line.match(expression.test)
		//console.log(group)

		if(group != null && group[1]){

			//console.log(expression.label + " " + group[1] + " " + group[2] + " " + group[3] + " " + (group[4] ? " WITH BODY " + group[4] : "") )
		
			//console.log("Global variable Token is now " + global.variableToken);
			//Do any replacements of user specified variables
			theUrl = group[3].match(variableSubstitution);

			if(theUrl != null){
				//Do any replacements
				theUrl.forEach(function(match){

					//console.log("The match is " + match)

					group[3] = group[3].replace(match,function(curly,index,original){

						//console.log("Original " + curly);
						//console.log("index " + index);
						//console.log("Original String " + original)
						
						//Get true object
						userSpecifiedVar = curly.substring(2,curly.indexOf("}"));
						//console.log("userSpecifiedVar " + userSpecifiedVar);
						userValue = eval("global."+userSpecifiedVar);
						//console.log("Evaluating " + eval("global."+userVariable));

						convertedString = userValue;
						return convertedString

					})
					//console.log(" URL IS NOW " + group[3])					
				})
			}



			console.log("Calling METHOD [" + group[1].trim()+"]")
			console.log("Calling URL [" + group[3]+"]")

			curlKey = group[3].replace("http://","http_").replace(/\./g,"_").replace(/\//g,"_").replace(/-/g,"_").replace(/\?/g,"_").replace(/=/g,"_")
			console.log("Body Alias : " + curlKey)

			
			//console.log("Group[4] " + group[4])
			//console.log("Headers " + global.cmds.headers)
			console.log("Expecting a user specified response statusCode ["+group[2] + "]")

			var options ={
				method:group[1].trim(),
				uri:group[3],
				headers:global._p.headers
			}

			if(group[4] != undefined){
				console.log("Appending Body to the request " + group[4])
				//options.body = JSON.stringify(group[4].trim())
				options.body= (group[4]);
				//options.json = true;
			}

			result = []

					result = request.sync(null,options)
					
					xml = result[0].headers['content-type']
					
					console.log("content-type is " + xml)

					//default result.body is text/plain.  No conversion is done if content-type does not merit it
					result = result[0];

					var thebody = result.body;

					if(xml.indexOf("xml")>-1){
						//console.log("Found XML !!!!! " + thebody)
						 xml2js.parseString(thebody,function(err,result){
							thebody = result;
						})
						//console.log("HELLO !!!!!" + thebody)
					} else if(xml.indexOf("json") > -1){

						console.log(group[3] + " IS JSON")
						thebody = JSON.parse(thebody)
						//console.log("parsed body is next ")
						//console.log(thebody)
					} else {
						//try one last time to convert to json
						console.log("Read type as " + xml + " but tried to convert to json anyway")
						try {
						thebody = JSON.parse(thebody)
						}catch(e){
							console.log("looks like we failed miserably. Defaulting to plain text and error follows...")
							console.log(e)
						}
					}



					retCode = result.statusCode;

					//console.log("Comparing " + retCode + "=" + group[2] );
				
					if(retCode == group[2] ){
						//console.log("Successfully called url. Returning true");
						global._p.body = thebody;
						
						global.pseudo = global._p;	
						global.RESPONSE = global._p;
						global[curlKey] = global.RESPONSE;
						//console.log(result[0].body)

					} else {
						//stop processing
						
						throw new Error(group[1] + " Test failed the following condition ==> return Code ["  + retCode + "] expected " + group[2]) 
						
					}
					
				
			


		} else {
			console.log(chalk.red("WARNING: Ignoring this URL Instruction. Is it properly formatted? Is the second word in the sentence a HTTP Status Code? "));
			console.log(chalk.red(expression.test + " != " + line));
		}

	})

}
})
