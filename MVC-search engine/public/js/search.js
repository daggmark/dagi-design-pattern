function display(element,key) {
    var definition = '<div class="W3-padding-left w3-panel w3-leftbar w3-light-grey">'+
     '<p class="w3-xlarge w3-serif">' +
   '<i>'+element+'</i></p>' +
    '<p>'+key+'</p>'+
 '</div>';
 var key = $("#key").val(key);
 $("#messageBoard").html(definition);

} 
$(document).ready(function(){
   
$("#key").keyup(function(){
          var key = $(this).val();
          var result = "";
          if(key != ""){
          $.post("/search",{key:key},function(data) {
            data.forEach(object => {
                for (key in object) {
                    if (object.hasOwnProperty(key)) {
                        const element = object[key];
                        result += 
"<div class = 'w3-panel w3-teal w3-card-4 w3-margin-bottom w3-padding-left w3-round w3-hover-green' onclick = 'display("+"\""+element+"\""+",\""+key+"\""+");'  >"
                         +key+

                         "<span class = 'w3-right w3-padding-right'>&#10097;&#10097;</span></div>";
                       // result +=" <div class = 'w3-container w3-teal'>"
                    }
                }
                
            });
            $("#messageBoard").html(result);
              }     
          );

        }
        else {
            $("#messageBoard").html("");
        }

       });
});