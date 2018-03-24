var express = require('express');
var config = require('../config');
var dictionary = require(config.dictionaryJsonPath);
var fs = require("fs");
var router = express.Router();
// token-authenticate middleware
let authenticateWithToken = function(request, response, next) {
    // extract token from request
    let token = request.query.token;
    const tokens_data_path = config.tokenJsonPath;
    let tokens_json = fs.readFileSync(tokens_data_path, 'utf-8');        
    let tokens = JSON.parse(tokens_json);  
    if (tokens[token]) {
        next();
    } else {
        console.log(token);
        response.header('Content-Type', 'application/json');
        response.redirect("/");
    }   
};
router.get("/add",authenticateWithToken,function(req,res){
    res.header('Content-Type', 'text/html');
    fs.readFile(
        config.addTemplatePath, 'utf-8',function(err,data){
            res.send(data); 
        });
});
router.get("/edit",authenticateWithToken,function(req,res){
    res.header('Content-Type', 'text/html');
    fs.readFile(
        config.editTemplatePath, 'utf-8',function(err,data){
            res.send(data); 
        });
});

router.post("/add",function(req,res){
    console.log(req.body);
    var key = req.body.key;
    var value = req.body.value;
    dictionary[key] = value;
    var dicSave = JSON.stringify(dictionary);
    writeFile(config.dictionaryJsonPath,dicSave,callbackForWriteFile);
    response ={
        message:"successfully added"
    }
    
    res.json(response);
    //console.log(req.body.);
});
//this is wrriten for the question 3
router.post("/edit",function(req,res){
    var key = req.body.key;
    var value = req.body.value;
    console.log(req.body);
    if(dictionary[key]){
       dictionary[key] = value; 
       var dicSave = JSON.stringify(dictionary);
       writeFile("./dictionary.json",dicSave,callbackForWriteFile);//custom function for saving our changes to the jason file
       res.send("succesfully edited!");
    }
    else{
        res.send("word does not exist");
    }
        
    //console.log(req.body.);
});
/**
 * this function is used to write data to a specific file
 * @param {*the path of the file to be written} path 
 * @param {*the data to be written to the file path} data 
 * @param {*an errror first function call back for async write file} func 
 */
function writeFile(path,data,func) {
    fs.writeFile(path,data,func);
}
/**
 * this is intended to append a data to afile
 * 
 * @param {* the path of the file to be appended} path 
 * @param {* the data to be appended to a file} data 
 * @param {* call back funck for an error handling } func 
 */
function appendFile(path,data,func) {
    fs.appendFile(path,data,func);
}
/**
 * is a call back for asynchronus file writing!
 */
function callbackForWriteFile(error){
    if(error){
        console.error("write error :" +error.message);
    }
    else {
        console.log("suceesful writen");
    } 
}
module.exports = router;