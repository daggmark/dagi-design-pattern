var config = require("./config.js");
var express = require("express");
var express = require("express");
var dictionary = require(config.dictionaryJsonPath);
var users = require(config.usersJsonPath);
var fs = require("fs");
var admin = require(config.adminRouterPath);
var authenticate = require(config.authenticateRouterPath);
var app = express();
app.disable('etag');
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public",express.static(__dirname + "/public"));
app.use('/',admin);
app.use('/',authenticate);
app.get("/",function(req,res){
    res.header('Content-Type', 'text/html');
    
        // read the form-component file
        fs.readFile(
            config.loginTemplatePath, 'utf-8',function(err,data){
                res.send(data); 
            });  
            
        // send the combined html to the user
        
});
app.post("/postjason",function(req,res){
    var response = [];
    for (const key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
            const element = dictionary[key];
            var qstr = req.body.name;
            if(key.includes(qstr)){
                response.push(key);
                console.log(key); 
            }
             
        }
    }
    res.send(JSON.stringify(response));    
    //console.log(req.body.);
});
var server = app.listen(5000,function() {
    console.log("listening at port", server.address().port);
});

