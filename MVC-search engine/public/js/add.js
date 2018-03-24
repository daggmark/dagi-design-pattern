function handleAddAsync(){
    $(document).ready(function(){
        var key = $('#key').val().trim();//username input value
        var value = $('#value').val().trim();//password input value
       $.post('/add', {key:key,value:value}, function(data){
            //if the user registers  succesfully
               var username = data.username;//username to show who is using in this session
               var message = data.message;
               $("#messageBoard").text(message);
       });  
   
 }); 
}