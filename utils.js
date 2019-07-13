var Sync = require('sync');
Sync(function(){
var ret = false;

//http://stackoverflow.com/questions/1187518/javascript-array-difference
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};





global._compareTo = function(me,you,testForFieldTypeOnly) {

    
     var k1 = Object.keys(me).sort();
   
     var k2 = Object.keys(you).sort();

       
  if ((k2.length > k1.length ? k2.diff(k1) : k1.diff(k2)).length > 0){ 
      throw new Error("The names of attributes in both objects do not match. This following fields are missing from one of the objects: \n[" + (k2.length > k1.length ? k2.diff(k1) : k1.diff(k2)) + "] comparison object are " + JSON.stringify(me) + " AND " + JSON.stringify(you))
      //throw new Error("The number of attributes in both objects do not match\ncompare the keys to see for yourself\n BASE    OBJECT ["+k1 + "]\n COMPARE OBJECT ["+k2 + "]")
      return false;
     }
     if(!k1.forEach(function(key,i,array) {
        
         
         //Do values have the same value
         ret = (me[key] == you[key])
         console.log("Comparing objects " + me[key] + "==>" + " to "+ you[key]+ "==> with key [" + key + "] testForFieldTypeOnly flag is " + testForFieldTypeOnly);
         if(!ret && typeof me[key] != "object" && testForFieldTypeOnly != true) {
          
          throw new Error("Value of attribute [" + key + "] has value [" + me[key] + "] in object " + JSON.stringify(me) + " AND DOES NOT MATCH [" + key + "] with value [" + you[key] + "] in second object [" + JSON.stringify(you))
        }

          //Do keys have same name
          ret = (k1[i] == k2[i]);
       
          if(!ret) {

            return false;
          }

         //Is this a complex object that needs further processing
          if(typeof me[key] ==  "object" &&  typeof you[key] == "object" && me[key] !=null && you[key] != null){
            
           return _compareTo(me[key],you[key],testForFieldTypeOnly);
            
          //Do values for the keys have same type
          } else if(typeof me[key] == typeof you[key]){

            return true;
              
          } else {
            throw new Error("Encountered attribute in this object which is not the same attribute type in comparison object\n["
            + key + "] is [" + typeof me[key] + "] in first object " 
            //+ JSON.stringify(me) 
            +  " while key [" + key + "] in second object is " 
            //+ JSON.stringify(you) 
            +  " of type [" + typeof you[key] + "]")
            return false;
          }

    }))
     
     return true;
   }
  
})

Object.prototype.isSameJSON = function(you,ignoreValueDiffs){

  //Return a comparison func
  return _compareTo(this,you,ignoreValueDiffs);

}

module.exports.isSameJSON = _compareTo;

