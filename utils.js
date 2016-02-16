var Sync = require('sync');
Sync(function(){
var ret = false;

//http://stackoverflow.com/questions/1187518/javascript-array-difference
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};


Object.prototype.equals = function(o1,testForFieldTypeOnly) {
//console.log("About " + o1)
//console.log(o1)
  //console.log("hello " + .version)

    _me = this;

     var k1 = Object.keys(this).sort();
     var k2 = Object.keys(o1).sort();
     //console.log(k1)

     //console.log(o1);

     //console.log(k1.length + " " + k2.length)
     if (k1.length != k2.length){ 
      throw new Error("The number of attributes in both objects do not match. This following fields are missing: \n" + (k2.length > k1.length ? k2.diff(k1) : k1.diff(k2)))
      //throw new Error("The number of attributes in both objects do not match\ncompare the keys to see for yourself\n BASE    OBJECT ["+k1 + "]\n COMPARE OBJECT ["+k2 + "]")
      return false;
     }
     if(!k1.map(function(e,i) {
        
         // console.log(k1[i] + "== " + k2[i])
         //Do values have the same value
         ret = _me[k1[i]] == o1[k2[i]]
         //console.log(_me[k1[i]] == o1[k2[i]]);
         if(!ret && typeof _me[k1[i]] != "object" && testForFieldTypeOnly != true) {
          
          throw new Error("Value of attribute [" + k1[i] + "==>" + _me[k1[i]] + "] does not match value of second object [" + k2[i] + " ==>" + o1[k2[i]] + "]")
        }

          //Do keys have same name
          ret = (k1[i] == k2[i]);
       
          if(!ret) {

            return false;
          }

          //Is this a complex object that needs further processing
          if(typeof _me[k1[i]] == typeof o1[k2[i]] == "object"){

            _me[k1[i]].equals(o1[k2[i]])
            
          //Do values for the keys have same type
          } else if(typeof _me[k1[i]] == typeof o1[k2[i]]){

          } else {
            throw new Error("Encountered attribute in this object which is not the same attribute type in comparison object\n"
            + k1[i] + " is [" + typeof _me[k1[i]] + "] in first object while " + k2[i] + " attribute in second object is of type [" + typeof o1[k2[i]] + "]")
            return false;
          }

   })){
        return false;
      }
     
     return true;
   }
  
})

