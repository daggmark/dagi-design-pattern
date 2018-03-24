'use strict';	 
function setVal(word){
  $('#key').val(word);
     } 
$(document).ready(function(){
  
     $('#key').keyup(function(){
         
      var name = $(this).val();
      if(name != ""){
        $.post('/postjason', { name:name }, function(data){
          var data = JSON.parse(data);
          var word_hyper_links = "";
         for (let index = 0; index < data.length; index++) {
             var word = data[index];
             word_hyper_links=word_hyper_links.concat("<div class = 'single w3-container w3-teal' onclick = setVal('{word}')>".replace("{word}",word) + word +"</div><br>" );	
      }	
      $('#messageBoard').css({'display':'block'});	
      $('#messageBoard').html(word_hyper_links);   

        });
      }
      else {
          $('messageBoard').html("");	
      }
     });
  });