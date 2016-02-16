# pseudo-test
TEST REST ROUTES USING PLAIN ENGLISH



<html lang="en">

  <head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <title>Getting started</title>
  <meta name="description" content="Release the docs!">

  <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>

  <link rel="canonical" href="http://sassdoc.com/getting-started/">
  <link rel="stylesheet" href="main.css">

  <link href="/favicon.png" rel="shortcut icon">
</head>


  <body>
    <header class="header" role="navigation">
    <div class="container">

       
<h2 id="about">About Pseudo Test</h2>
<p>Pseudo Test uses <a target="_top" href="https://en.wikipedia.org/wiki/Pseudocode">pseudo syntax</a> (plain English) to test your API routes.  So, instead of writing this to test your code..</p>
<h2 id="install">Stop Doing This</h2> 
<div class="highlight"><pre><code class="language-bash" data-lang="bash">
//wth!!!, I have a deadline. Who can write this much code just to test?????
var url = 'http://someurl.com';
it('should correctly update an existing account', function(done){
	var body = {
		firstName: 'JP',
		lastName: 'Berd'
	};
	request(url)
		.post('/api/profiles/vgheri')
		.send(body)
		.expect('Content-Type', /json/)
		.expect(200) //Status code
		.end(function(err,res) {
			if (err) {
				throw err;
			}
			// Should.js fluent syntax applied
			res.body.should.have.property('_id');
	                res.body.should.have.property('firstName');
	                res.body.should.have.property('lastName');
	                res.body.should.have.property('creationDate');
	                res.body.creationDate.should.not.equal(null);
			done();
		});
	});
  });</code></pre></div>
<h2 id="install">Write Test Cases in Plain English</h2>  

<div class="highlight"><pre><code class="language-bash" data-lang="bash">
# Verify that account save route works as expected

POST 200 http://someurl.com/api/profiles/vgheri WITH BODY {"firstName":'JP', "lastName":'Berd'}

	TEST {"id":"10000","firstName":"JP","lastName":"Berd","creationDate","12/25/2014"}.equals(${_p.body},true) 
</code></pre></div>
<h2 id="install">Pseudo Test Errors</h2>
<p>Errors are simply stated and highlighted in red along with the offending line number</p>
<div class="highlight"><pre><code class="language-bash" data-lang="bash">
npm test
Calling URL http://someurl.com/api/profiles/vgheri
Expecting a user specified response statusCode [200]
Appending Body to the request {"firstName":"JP", "lastName":"Berd"}
<font color="red">Error processing the following action on line 4 of ~/my-api/tests/useraccount.test</font>
POST 200 http://someurl.com/api/profiles/vgheri WITH BODY {"firstName":"JP", "lastName":"Berd"}
<font color="red">Error: POST Test failed the following condition ==> return Code [302] expected 200</font>
</code></pre></div>

        

<p>Getting started with Pseudo Test could not be any easier.</p>

<div class="highlight"><pre><code class="language-bash" data-lang="bash">npm install --save pseudo-test</code></pre></div>


<p>Edit your package.json and add the following snippet</p>

<div class="highlight"><pre><code class="language-bash" data-lang="bash">
  "scripts": {
    "test": "./ptest.sh"
  }
</code></pre></div>

<p>Create a Test Case using your favorite Editor and save to [your project directory]/tests/myexample.test</p>

<div class="highlight"><pre><code class="language-bash" data-lang="bash">
  # My First Test Case
  # I'm testing that my server returns 404 
  # when someone calls a non-existent route
  
  GET 404 http://myserver.com/pagenotexist
</code></pre></div>

<p>Run All Tests currently present in [your project directory]/test</p>

<div class="highlight"><pre><code class="language-bash" data-lang="bash">
  npm test
  Calling URL http://myserver.com/pagenotexist
  Expecting a user specified response statusCode [404]
  <font color="blue">Overall Status </font>: <font color="green">ALL TESTS PASSED</font>
</code></pre></div>


<h2 id="options">Commands</h2>
<p>Intentionally kept small.  The point is to test your API and not learn a whole new language</p>

<table>
  <thead>
    <tr>
      <th>Command</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>SET HEADER [key:value]</code></td>
      <td>Used to set custom http headers.<br>SET HEADER "authkey":"1234"</td>
    </tr>
    <tr>
      <td><code>SETVAR [var] = [value]</code></td>
      <td>Set a variable to be used with other commands<br>SETVAR hostvar = http://jsonplaceholder.typicode.com</td>
    </tr>
     <tr>
      <td><code>GET|POST|PUT|DELETE [code] [url] (WITH BODY) (post body)</code></td>
      <td>Execute HTTP Request and save response in variable _p.body<br>ex. GET 200 ${hostvar}/posts/1</td>
    </tr>
     <tr>
      <td><code>_p.body</code></td>
      <td>Last successful HTTP response.body<br>${_p.body.length}</td>
    </tr>
    <tr>
      <td><code>TEST [any valid js comparison]</code></td>
      <td>TEST ${hostvar} != null<br> TEST ${_p.body[0].color} == "blue"<br>TEST typeof ${_p.body.seq} == "number"
      </td>
    </tr>
    <tr>
      <td><code>EMAIL [valid email addresses delimited by comma]</code></td>
      <td>List of notification emails to notify when tests fail<br>EMAIL oncall@home_sleeping.com
      </td>
    </tr>
  </tbody>
</table>

<h2 id="options">Known Limitations</h2>
<p><ul><li>Multiline commands are not supported.</li>
      <li>Don't use special character when nesting variables. <br><b><font color="green">OK</font></b> ${_p.body[userVar].age}<br><b><font color="red">NO</font></b> ${_p.body[${userVar}].age}</li>
</ul></p>

<h2 id="options">Advanced Usage</h2>
<p><b>JSONObject.equals(comparisonObject,[checkAttributeTypesOnly])</b> </p>
<div class="highlight"><pre><code class="language-bash" data-lang="bash">
  # Compare a JSON string to the response body 
  # .equals() method will validate that keys and values match
  # setting second param to "true" enables less strict checking. 
  # If checkAttributeTypeOnly = true, value checking is skipped
  # and only the types are validated.
  # Also Nested objects are supported.

  GET 200 http://mysite.com/version

  	TEST {name: "cn-go-api","version":"3.1.48"}.equals(${_p.body})
  .....
  
  npm test

  Running TEST {name: "cn-go-api","version":"3.1.48"}.equals(${_p.body})
  Evaluating new Object({name: "cn-go-api","version":"3.1.48"}).equals(_p.body)
  <font color="red">Error processing the following action on line 32 of /projectx/tests/sitecheck.test</font>
  TEST {name: "cn-go-api","version":"3.1.48"}.equals(${_p.body})
  <font color="red">Error: Value of attribute [version==>3.1.48] does not match value of second object [version ==>3.1.47]</font>

  ...

  # Set less strict checking.  I only care that the each object's
  # keys match and the values are the correct type.
  # Actual value for each key does not matter
  TEST {name: "cn-go-api","version":"3.1.48"}.equals(${_p.body,<font color="yellow">true</font>})
  
  ...
  
  npm test
  Running TEST {name: "cn-go-api","version":"3.1.48"}.equals(${_p.body})
  Evaluating new Object({name: "cn-go-api","version":"3.1.48"}).equals(_p.body)
  <font color="blue">Overall Status </font>: <font color="green">ALL TESTS PASSED</font>
</code></pre></div>


<p><b>setSpecialChar([character])</b> method<br>In very rare cases, you may need to use a different variable 
token besides the default "$".  Use this method if needed. </p>
<div class="highlight"><pre><code class="language-bash" data-lang="bash">
  # I'm comparing a string literal that uses my special character. Uh oh
  #
  # I don't want pseudo-test to evaluate ${character} and return undefined.
  # So, I will change the special variable token temporarily

  SETVAR setSpecialChar("<font color="yellow">#</font>")
  TEST {template: "<font color="yellow">$</font>{character} likes to have fun"}.equals(<font color="yellow">#</font>{_p.body})
  # All Done. Set it back to default
  SETVAR setSpecialChar(<font color="yellow">_DEFAULT_</font>)
  TEST <font color="yellow">$</font>{_p.body.template}.indexOf("fun") > -1 
  .....

</code></pre></div>

<p><b>All <a href="http://underscorejs.org/">Underscore.js</a> functions are available for use in your tests</b> </p>
<div class="highlight"><pre><code class="language-bash" data-lang="bash">
  # Use <font color="yellow">underscore</font> library to make my life easier
  # Also use <font color="pink">sync</font> library because async sucks for tests sometimes
  # I want test that my REST API /sort route works correctly
  # http://underscorejs.org/
  
  SETVAR sortedArray = <font color="yellow">_.sortBy</font>.<font color="pink">sync</font>([3,4,6,1,2,5],function(num){return num})
  
  GET 200 http://myservice/sort WITH BODY [3,4,6,1,2,5]

  	TEST <font color="yellow">_.difference</font>(sortedArray,${p.body}) == []


</code></pre></div>


<p><b><a href="https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks">ENABLE GIT HOOKS</a></b> to reject commits to git repo if your latest changes cause a test to fail</p>
<div class="highlight"><pre><code class="language-bash" data-lang="bash">
  # copy this file to [your project directory]/.git/hooks/pre-commit
  # make it executable by typing chmod +x pre-commit
  Echo "Running node node_modules/pseudo-test/app.js"
  mkdir -p /tests
  node app.js &
  sleep 1
  node node_modules/pseudo-test/app.js

  ...
  git commit -m "I made a quick change and I'm sure it works"

  Running TEST {duration: "200","version":"3.1.47"}.equals(${_p.body},true)
  Evaluating new Object({duration: "200","version":"3.1.47"}).equals(_p.body,true)
  <font color="red">Error processing the following action on line 32 of ~/myapi/tests/oldbusinessrules.test</font>
  TEST {duration: "200","version":"3.1.47"}.equals(${_p.body},true)
  <font color="red">Error: Encountered attribute in this object which is not the same attribute type in comparison object
  duration is [number] in first object while duration attribute in second object is of type [string]
  COMMIT ABORTED : FIX BUG AND TRY AGAIN
  </font>

</code></pre></div>


<p><b>Longer Example</b> because everything is not as simple as 'hello world'</p>
<div class="highlight"><pre><code class="language-bash" data-lang="bash">
  
Set Header "Accept": "www.cartoonnetwork.com+json; version=1" used to specify the version of the app we need
Set Header "authentication": "knockknock" to identify the client key
Set Header "platform": "Google" to test platform specific code
Set Header "Content-Type" : "application/json" to specify we only expect JSON back

Email noc@turner.com to let them know something bad happened.
Email devteam@cartoonnetwork.com

SETVAR hostname = "http://localhost:3000"

# Description: Test Changes that have prevously caused the IOS/Android app to crash


# Test /shows call returns Shows with all required fields of the correct type
# Test the logo is not null

GET 200 ${hostname}/shows/

  SETVAR total = ${pseudo.body.length} -1

  TEST ${_p.body[total].logo} != "null" 

  # Temporarily Setting Special Char to Another Delimiter because the comparison below contains variables in the #'usernotificationtempalte' field.  We don't want to accidentally process that variable and cause problems
  
  SETVAR setSpecialChar("#")

  TEST {"contentid":"286280","seriestitleid":"2000349","title":"Teen Titans Go! ","headicon":null,"showlogopng":null,"tuneinmsg":"","introwhitelistflag":"true","mixwhitelistflag":"true","featuredobj":{"isFeatured":true},"secondarycolor":"#26c5e7","seasons":[{"seasonNumber":"1"},{"seasonNumber":"2"},{"seasonNumber":"3"},{"seasonNumber":"4"}],"showlogo":null,"characterhead":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i97/TTG_395x445.png","charactergroup":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i105/TTG_900x675_2.png","createdate":"2016-02-15T06:00:10.643Z","camelCase":null,"sequence":0,"collections":[],"adshowid":"ttg","shorttitle":"Teen Titans Go! ","logo":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i98/ttg_780x370.png","vmacollectionid":"8a250ab03cca0480013d1cf705eb035c","featuredmessage":null,"characterheadsd":"http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i100/TTG_99x112.png","deeplinkname":"teen-titans-go","usernotificationtemplate":"{\"\\\"Titans GO! Watch ${new_video_count} new episode(s) right now! \\\"\"}","usernotificationrawdata":[{"titleid":2054791,"originalpremieredate":"02/11/2016","pubdate":"02/11/2016"}],"usernotificationdeeplinkurl":"cartoonnetwork://shows/2000349"}.equals(#{_p.body[0]},true)

  # All Done. Set it back to default
  SETVAR setSpecialChar(_DEFAULT_)

# Test that the Episode Guide Call returns successfully and that episodes are first
# Test that seasonitemnumber > 0
#   Test that duration is numeric
# Test that seasonitemnumber is not null

GET 200 ${hostname}/episodeguide/json/${_p.body[3].seriestitleid}

  SETVAR console.log(chalk.green("\t......Beginning The Episode Guide Test ......"))
  TEST ${_p.body.length} > 0
  TEST ${_p.body[0].type} == 'fullepisode'
  TEST ${_p.body[0].seasonitemnumber} != null
  TEST ${_p.body[0].seasonitemnumber} > 0
  SETVAR lastone = ${_p.body.length-1}
  SETVAR _r = ${_p.body}  
  TEST typeof ${_r[0].duration} == "number" 
  TEST ${_r[lastone].type} != 'fullepisode'

# Test that featured episode call returns successfully
# Test that bannertext is empty if authtype = "auth"

GET 200 ${hostname}/featuredepisode/${_p.body[3].seriestitleid}

  TEST ${_p.body.bannertext} == "" && ${_p.body.authtype} == "auth"

# Test that bad requests return 404

GET 404 ${hostname}/badpage
</code></pre></div>
       
  <div class="footer__content">
    <div class="container">
      <p>&copy; Made with love by <a href="#">Mr. Jones</a>.</p>
    </div>
  </div>
</footer>


  </body>

</html>


