     //ajax call to fetch token,username,message from /login route  if logging in is
     //successfull or message only
function handleLogin(){    
    $(document).ready(function(){
         var username = $('#username').val();//username input value
         var password = $('#password').val();//password input value
         var token = sessionStorage.getItem("token");
         
        $.post('/login', {token:token,username:username,password:password }, function(data){
            
            
            var message = data.message;
            if(data.token){ //if the user logs in succesfully 
                var username = data.username;
                var token = data.token;//token for authentication
                sessionStorage.setItem("token",token);
                $("#messageBoard").text(message + " " + username);
            }
            else{
               $("#messageBoard").text(message);
            }
        });  
  });
}
//function for handling register button 
//redirects user to regster page with token 
function handleRegister(){    
    $(document).ready(function(){
         var token = sessionStorage.getItem("token");
         window.location = "/register?=" + token;
        
  });
} 
//handles logout
function handleLogout(){    
    $(document).ready(function(){
         var token = sessionStorage.setItem("token","");
         window.location = "/";
        
        
  });
} 
