# Pseudo Test
If you need to confirm that your XML or JSON API is behaving as expected, this module is for you.
### Test API routes using plain English
```bash
# Verify that API saves accounts as expected
POST 200 http://myapi.com/user WITH BODY {"firstName":'JP', "lastName":'Berd'}
TEST {"id":"10000","firstName":"JP","lastName":"Berd"} EQUALS RESPONSE.body 
```

### ...and say goodbye to this
#### .... goodby
#### ... more mods


```js
//wth!!!, I have a deadline. Who can write this much code just to test?????
var url = 'http://myapi.com';
it('should correctly update an existing account', function(done){
  var body = {
    firstName: 'JP',
    lastName: 'Berd'
  };
  request(url)
    .post('/user')
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
## Additional Commands
Intentionally kept small.  The point is to test your code and not learn a verbose language in the process
 
|                          Command                         |                                                Description                                               |
|:--------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| SET HEADER ["key":"value"]                                   | Used to set custom http headers.                                              |
| SET VAR(IABLE) [var] = [value]                                   | Set a local variable for use later      |
```
    SET HEADER "authkey":"1234"
    SET VAR hostvar = http://jsonplaceholder.typicode.com
    #Alternate form, more english like
    Set variable hostvar = http://jsonplaceholder.typicode.com
```
|                          Command                         |                                                Description                                               |
|:--------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| GET\|POST\|PUT\|DELETE [HTTP.code] [URL] (WITH BODY [any valid json]) | Execute HTTP Request and break if HTTP response code does not match user specified HTTP.code
| RESPONSE.body                                            | Last successful HTTP response.body.
```
    #Retrieve list of users and test overwrite first user with new info
    GET 200 ${hostvar}/users
    PUT 200 ${hostvar}/user/${RESPONSE.body[0].id} WITH BODY {"id":"1","name":"Brent"}
```
    
|                          Command                         |                                                Description                                               |
|:--------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| TEST [condition]                           | If test condition fails, break   
| TEST [obj] EQUALS [obj]                          | Test that two objects/arrays are equal. This is includes checking for expected type AND value for each member AND attribute                                
| TEST [obj] IS LIKE [obj]                         | Test two objects against each other. Only verify that attribute name and type of value match 
```
    TEST RESPONSE.body[0].name == "Brent"
    #Strict test.  Response body must exactly match the expected result
    TEST RESPONSE.body[1] EQUALS {id: 1,name: "Leanne Graham",username: "Lgraham"}
    #lazy test. Response body must have same keys and types of values only
    TEST RESPONSE.body[1] IS LIKE {id: 9999,name: "blah blah",username: "foo"}
```
|                          Command                         |                                                Description                                               |
|:--------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
|Include [path to module]                                | Include a module and set local variable to module name. NOTE: slashes (/) and (-) are converted to (_) underscores
|Calll [function]                                | Execute a function from included module
|DEBUG [any valid expression]                                | Echo string to console                                     |
| LOOP [list] AS [var] [test to execute] ENDLOOP                             | Iterate over list and execute all test(s) against each member of the list.  Break if failure.                                                       |
```
    Include models/account

    #Test Account balance
    SET VAR balance = models_account.creditAccount('checking',1000.00)
    SET VAR balance = models_account.debitAccount('checking',500.00)
    TEST balance == 500.00

    GET 200 http://jsonplaceholder.typicode.com/users
    DEBUG "Number of users is ${RESPONSE.body[0]length}"
    #Perform a couple of tests against each user returned in json array
    LOOP RESPONSE.body AS user
        TEST user.email != null
        TEST typeof user.id == "number"
    ENDLOOP 
```      
### Latest Updates
 Version                         |                                                Change                                               |
|:--------------------------------------------------------|--------------------------------------------------------------------------------------------------------
| 1.1.9                                 | Include command added  
| 1.1.9                                 | Call command added  
| 1.1.5                                 | SETVAR command removed.  Use SET VAR instead
| 1.1.4                                 | Commands are now case insensitive.  
| 1.1.4                                 | LOOP command added
| 1.1.4 |   SET VAR(iable) command added


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
                      

### Known Limitations
-- Multi-line commands are not supported.

-- Use ${varname} syntax if your variables will be enclosed in quotes

Ex. DEBUG "First Person is ${RESPONSE.body[0].name}"

### Pro-tip: Underscore.js functions are available in all tests
```bashU
# Call underscore.js library _.sortBy and _.difference to make my life easier
# Test that my REST API /sort route works correctly
# http://underscorejs.org/
  
SET VAR sortedArray = _.sortBy([3,4,6,1,2,5],function(num){return num})
  
GET 200 http://myservice/sort WITH BODY [3,4,6,1,2,5]

TEST _.difference(sortedArray,RESPONSE.body) == []

DEBUG RESPONSE.body

  ```
### Advanced Usage Example(s)

```bash
  # Compare a JSON string to the response body 

  # Note: Nested objects are also supported.

  GET 200 http://video-api.cartoonnetwork.com/version

  TEST {name: "cn-go-api","version":"3.1.48"} EQUALS RESPONSE.body
  .....
  
  npm run ptest
Running TEST {name: "cn-go-api","version":"3.1.48"} EQUALS RESPONSE.body
Error processing the following action on line 32 of /projectx/tests/versioncheck.test
TEST {name: "cn-go-api","version":"3.1.48"} EQUALS RESPONSE.body
Error: Value of attribute [version==>3.1.48] does not match value of second object [version ==>3.1.47]

  ...
  # Set less strict checking.  I only care that the each object's
  # keys match and the values are the correct type.
  # Actual value for each key does not matter
  TEST {name: "cn-go-api","version":"3.1.48"} IS LIKE RESPONSE.body
  
  ...
  
  npm run ptest
  Running TEST {name: "cn-go-api","version":"3.1.48"} IS LIKE RESPONSE.body
  ALL TESTS PASSED
```
### Pro-Tip: ENABLE GIT HOOKS
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

  Running A COOL TEST {duration: "200","version":"3.1.47"} EQUALS ${RESPONSE.body}
  Error processing the following action on line 32 of ~/myapi/tests/oldbusinessrules.test
  TEST {duration: "200","version":"3.1.47"} EQUALS RESPONSE.body

  Error: Encountered attribute in this object which is not the same attribute type in comparison object
  duration is [number] in first object while duration attribute in second object is of type [string]
  COMMIT ABORTED : FIX BUG AND TRY AGAIN
  ```

