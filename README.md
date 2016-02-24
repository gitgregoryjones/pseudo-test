# Pseudo Test

Pseudo Test uses pseudo syntax (plain English) to test your API routes.  So, instead of writing tests like this..
```js
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
  })
  ```
### Write Test Cases in Plain English
```bash
# Verify that account save route works as expected

POST 200 http://someurl.com/api/profiles/vgheri WITH BODY {"firstName":'JP', "lastName":'Berd'}

TEST {"id":"10000","firstName":"JP","lastName":"Berd","creationDate","12/25/2014"} EQUALS RESPONSE.body 
```
### Pseudo Test Errors
Errors are simply stated and highlighted in red along with the offending line number
```bash
npm run ptest
```
```

Calling URL http://someurl.com/api/profiles/vgheri
Expecting a user specified response statusCode [200]
Appending Body to the request {"firstName":"JP", "lastName":"Berd"}
Error processing the following action on line 4 of ~/my-api/tests/useraccount.test
POST 200 http://someurl.com/api/profiles/vgheri WITH BODY {"firstName":"JP", "lastName":"Berd"}
Error: POST Test failed the following condition ==> return Code [302] expected 200
```
### How Can I get Started?

#### 1.) Install from npm
```bash
npm install --save pseudo-test
```
#### 2.) Edit package.json and add the following snippet to the scripts section
``` bash
  "scripts": {
    "ptest": "./node_modules/.bin/ptest"
  }
  ```
#### 3) Save Test Case to [your project directory]/tests/myexample.test
##### Any files with *.test extension will be run

```bash

# My First Test Case <myexample.test>
# I'm testing that I receive a 200 from the user service
 GET 200 http://jsonplaceholder.typicode.com/users/1
  
# Pro-tip: HTTP response is saved to global RESPONSE.body Object
# Access global object to test some conditions
    TEST RESPONSE.body.username == "Bret" && typeof RESPONSE.body.id == "number"
    
# Or Compare a test object to the entire RESPONSE.body for exact match
    SETVAR mytestobject = {id:1,name:"Leanne Graham",username:"Bret",email:"Sincere@april.biz",address:{street:"Kulas Light",suite:"Apt. 556",city:"Gwenborough",zipcode:"92998-3874",geo:{lat:"-37.3159",lng:"81.1496"}},phone:"1-770-736-8031 x56442",website:"hildegard.org",company:{name:"Romaguera-Crona",catchPhrase:"Multi-layered client-server neural-net",bs:"harness real-time e-markets"}}
    
    TEST mytestobject EQUALS RESPONSE.body
    
#Pro-tip: Use TEST [someobj] IS LIKE RESPONSE.body to compare only key names and value types
    # TEST mytestobject IS LIKE RESPONSE.body
```
#### 4) Run the Test(s)
```bash
npm run ptest
````
#### 5) View The Output...Did it pass?
``` bash

Running test for file /Users/gregadmin/projects/cn-anything/tests/myexample.test
Calling URL http://jsonplaceholder.typicode.com/users/1
http_jsonplaceholder_typicode_com_users_1
Expecting a user specified response statusCode [200]
content-type is application/json; charset=utf-8
Evaluating RESPONSE.body.username == "Bret" && typeof RESPONSE.body.id == "number"
fuzzy match is false
Comparing objects [object Object]==> to [object Object]==> with key [address] testForFieldTypeOnly flag is false
Comparing objects Gwenborough==> to Gwenborough==> with key [city] testForFieldTypeOnly flag is false
Comparing objects [object Object]==> to [object Object]==> with key [geo] testForFieldTypeOnly flag is false
Comparing objects -37.3159==> to -37.3159==> with key [lat] testForFieldTypeOnly flag is false
Comparing objects 81.1496==> to 81.1496==> with key [lng] testForFieldTypeOnly flag is false
Comparing objects Kulas Light==> to Kulas Light==> with key [street] testForFieldTypeOnly flag is false
Comparing objects Apt. 556==> to Apt. 556==> with key [suite] testForFieldTypeOnly flag is false
Comparing objects 92998-3874==> to 92998-3874==> with key [zipcode] testForFieldTypeOnly flag is false
Comparing objects [object Object]==> to [object Object]==> with key [company] testForFieldTypeOnly flag is false
Comparing objects harness real-time e-markets==> to harness real-time e-markets==> with key [bs] testForFieldTypeOnly flag is false
Comparing objects Multi-layered client-server neural-net==> to Multi-layered client-server neural-net==> with key [catchPhrase] testForFieldTypeOnly flag is false
Comparing objects Romaguera-Crona==> to Romaguera-Crona==> with key [name] testForFieldTypeOnly flag is false
Comparing objects Sincere@april.biz==> to Sincere@april.biz==> with key [email] testForFieldTypeOnly flag is false
Comparing objects 1==> to 1==> with key [id] testForFieldTypeOnly flag is false
Comparing objects Leanne Graham==> to Leanne Graham==> with key [name] testForFieldTypeOnly flag is false
Comparing objects 1-770-736-8031 x56442==> to 1-770-736-8031 x56442==> with key [phone] testForFieldTypeOnly flag is false
Comparing objects Bret==> to Bret==> with key [username] testForFieldTypeOnly flag is false
Comparing objects hildegard.org==> to hildegard.org==> with key [website] testForFieldTypeOnly flag is false
Overall Status : ALL TESTS PASSED
```
## Commands
Intentionally kept small.  The point is to test your API and not learn a whole new language
##### Note: Multi-line commands are not supported. 
|                          Command                         |                                                Description                                               |
|:--------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------:|
| SET HEADER [key:value]                                   | Used to set custom http headers.  SET HEADER "authkey":"1234"                                              |
| SETVAR [var] = [value]                                   | Set a variable to be used with other commands. SETVAR hostvar = http://jsonplaceholder.typicode.com        |
| GET,POST,PUT,DELETE [code] [url] (WITH BODY) (json body) | Execute HTTP Request and save response in variable _p.body ex. GET 200 ${hostvar}/posts/1                |
| RESPONSE.body                                            | Last successful HTTP response.body                                                                       |
| _p.body                                                  | Alias RESPONSE.body                                                                                      |
| [hostname].body                                          | Alias RESPONSE.body with '/' and ':' replaced with '_'  Ex.  http_host_com_user_1.body                   |
| TEST [any valid js comparison]                           | TEST _p.body[0].favoritecolor == "blue"                                                                  |
| TEST [obj] EQUALS RESPONSE.body                          | Test entire response body against expected json. Check for type and value                                |
| TEST [obj] IS LIKE RESPONSE.body                         | Test entire response body against expected json. Only verify that attribute name and type of value match |
| DEBUG [any valid js express]                             | Wrap line in console.log and write to output line                                                        |

### Known Limitations
-- Multi-line commands are not supported.

-- Case of Commands is important: 'TEST' not equal 'TeSt' 

-- Use optional ${varname} syntax if your variables are enclosed in quotes

Ex. DEBUG "First Person is ${RESPONSE.body[0].name}"

### Underscore.js functions available in all tests
```bashU
# Use underscore.js library to make my life easier
# Also use <font color="pink">sync</font> library because async sucks for tests sometimes
# I want test that my REST API /sort route works correctly
# http://underscorejs.org/
  
SETVAR sortedArray = _.sortBy([3,4,6,1,2,5],function(num){return num})
  
GET 200 http://myservice/sort WITH BODY [3,4,6,1,2,5]

TEST _.difference(sortedArray,RESPONSE.body) == []

  ```
### Advanced Usage Example(s)

```bash
# Compare a JSON string to the response body 
  # .equals() method will validate that keys and values match
  # setting second param to "true" enables less strict checking. 
  # If checkAttributeTypeOnly = true, value checking is skipped
  # and only the types are validated.
  # Also Nested objects are supported.

  GET 200 http://video-api.cartoonnetwork.com/version

  TEST {name: "cn-go-api","version":"3.1.48"} EQUALS _p.body
  .....
  
  npm test
Running TEST {name: "cn-go-api","version":"3.1.48"} EQUALS _p.body
Error processing the following action on line 32 of /projectx/tests/versioncheck.test
TEST {name: "cn-go-api","version":"3.1.48"} EQUALS _p.body
Error: Value of attribute [version==>3.1.48] does not match value of second object [version ==>3.1.47]

  ...
  # Set less strict checking.  I only care that the each object's
  # keys match and the values are the correct type.
  # Actual value for each key does not matter
  TEST {name: "cn-go-api","version":"3.1.48"} IS LIKE _p.body
  
  ...
  
  npm test
  Running TEST {name: "cn-go-api","version":"3.1.48"} IS LIKE _p.body
  ALL TESTS PASSED
```
### ENABLE GIT HOOKS
Setup your project to reject commits to git repo if your latest code changes cause a test to fail
```bash

# copy this file to [your project directory]/.git/hooks/pre-commit
# make it executable by typing chmod +x pre-commit
#!/bin/bash
killall node
PORT="${PORT:-3000}"

echo 'Starting local server at http://localhost and PORT' $PORT
node app.js &
sleep 2
node node_modules/pseudo-test/app.js
killall node

```
##### Attempting a commit automatically runs tests and rejects commit it tests fail
``` bash
  git commit -m "I made a quick change and I'm sure it works"

  Running TEST {duration: "200","version":"3.1.47"} EQUALS ${_p.body}
  Error processing the following action on line 32 of ~/myapi/tests/oldbusinessrules.test
  TEST {duration: "200","version":"3.1.47"} EQUALS _p.body

  Error: Encountered attribute in this object which is not the same attribute type in comparison object
  duration is [number] in first object while duration attribute in second object is of type [string]
  COMMIT ABORTED : FIX BUG AND TRY AGAIN
  ```
