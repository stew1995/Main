/*//Variable to hold the request
var request;

$("#chatForm").submit(function(event) {
  //Prevent default posting
  event.preventDefault();

  //Abort any pending requests
  if(request) {
    request.abort();
  }

  //Local variable
  var $form = $(this);
  //Select the cache of all fields
  var $inputs = $form.find("input, submit");

  //Serialze data
  var serializedData = $form.serialize();

  $inputs.prop("disabled", true);

  //Ajax Request
  request = $.ajax({
    url: 'php/sendMessage.php',
    type: 'POST',
    data: serializedData
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
    // Reenable the inputs
        $inputs.prop("disabled", false);
  });

});
*/
//Using W3Schools to help
//this needs to be looked at for outputting the chat
function showChat() {
  if(str == "") {
    //This is the chat window
    $('.messagecontainor').val("");
    //document.getElementById('textHint').innerHTML = "";
    return;
  } else {
    if (window.XMLHttpRequest) {
      //Firefox chrome safafi
      xmlhttp = new XMLHttpRequest();
    } else {
      //IE
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        $('.messagecontainor').val() = this.responseText;
        //document.getElementById('textHint').innerHTML = this.responseText;
      }
    };

    xmlhttp.open('GET', 'getuser.php',true);
    xmlhttp.send();
  }
}
function sendChat() {
    if (window.XMLHttpRequest) {
      //Firefox chrome safafi
      xmlhttp = new XMLHttpRequest();
    } else {
      //IE
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        $('.messagecontainor').val() = this.responseText;
        //document.getElementById('textHint').innerHTML = this.responseText;
      }
    };

    xmlhttp.open('GET', 'php/sendMessage.php',true);
    xmlhttp.send();

}
