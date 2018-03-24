

var express = require('express');
var config = require('../config');
var dictionary = require(config.dictionaryJsonPath);
var users = require(config.usersJsonPath);
var fs = require("fs");
var router = express.Router();
router.get("/register",function(req,res){
    res.header('Content-Type', 'text/html');
    fs.readFile(
        config.registerTemplatePath, 'utf-8',function(err,data){
            res.send(data); 
        });
});
router.get("/search",function(req,res){
    res.header('Content-Type', 'text/html');
    fs.readFile(
        config.searchTemplatePath, 'utf-8',function(err,data){
            res.send(data); 
        });
});
router.post("/search",function(req,res){
    res.header('Content-Type', 'application/json');
    var qstr = req.body.key;
    var container = [];
    for (const key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
            const element = dictionary[key];
            
            if(key.includes(qstr)){
                var obj = {
                };
                obj[key] = element;
                container.push(obj);
            }

            
        }
    }
    console.log(container);
    res.json(container);
});
router.post("/register",function(req,res){
    var user = new Object;
    var path = config.usersJsonPath;
    var password = req.body.password;
    var username = req.body.username
    if(!users[username]){
        user["password"] = password;
        user["username"] = username;
        users[username] = user;
        var userSave = JSON.stringify(users);//we have to serialize an object to save it
        writeFile(path,userSave,callbackForWriteFile);
        var response = {
           message:"you successfully registered",
           username:username
        }
        res.json(response);
        //console.log(req.body.);
    }
    else{
        res.json({message:"username already exists!"});
    }
    
});
router.post("/login",function(req,res){
    var password = req.body.password;
    var username = req.body.username;
    var token = req.body.token;
if (users[username]){
       var user = users[username];
       if(user["password"] == password){
        // generate bearer token
        let token = '';
        for(let i = 0; i < username.length; i++) {
            for(let j = 0; j < i; j++) {
                if(j % 3 == 0) {
                    token += (username[i]+username[j])
                } else {
                    token += (username[j]+username[i])                    
                }
            }
        }     
        // save token
        const tokens_data_path = config.tokenJsonPath;
        let tokens_json = fs.readFileSync(tokens_data_path, 'utf-8');        
        let tokens = JSON.parse(tokens_json);   
        console.log('TOKEN IS: ', token);
        tokens[token] = {
            "username" : username,
            "created" : Date.now().toString()
        };
        fs.writeFileSync(tokens_data_path, JSON.stringify(tokens));
        // add token to resp
        let resp = {};
        resp.token = token;
        resp.username = username; 
        resp.message = "welcome";
        res.json(resp);
        //console.log(req.body.);
       }
       else{
        res.send({message:"u are not authenticated"});
       }
       
    }
    else{
        
        res.json({message:"you are not authenticated try to register first"});
    }
    
});
//this is wrriten for the question 3
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