var fs = require("fs");
var config = require("../config.js");
var user = {"abebe":"beso bela"};
(function(){
   fs.writeFile(config.dictionaryJsonPath,JSON.stringify(user),function(error){
                if(error){
                    console.log ("dagim " + error.message);
                }
                else {
                    console.log("succcessfully written");
                }
   });
}());
  
