function handleRegisterAsync() {
    $(document).ready(function(){
        var username = $('#username').val().trim();//username input value
        var password = $('#password').val().trim();//password input value
        var passwordAgain = $("#passwordAgain").val().trim();//passwordAgain


       if(password === passwordAgain){
       $.post('/register', {username:username,password:password}, function(data){
            //if the user registers  succesfully
               var username = data.username;//username to show who is using in this session
               var message = data.message;
               $("#messageBoard").text(message);
       });  
    } 
    else {
        $("#messageBoard").text("password not matching!");
    }
 });    
}
function handleAdd() {
    var token = sessionStorage.getItem("token");
    window.location = "/add?token=" + token;
}
function handleHome() {
    window.location = "/";
}
function handleEdit() {
// alert(sessionStorage.getItem("token")); 
if(sessionStorage.getItem("token") == ""){
    $("#messageBoard").text("please register first");
}
else {
    var token = sessionStorage.getItem("token");
    window.location = "/edit?token=" + token;
    }

} 
