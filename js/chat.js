//Variable to hold the request
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
  request = $.$.ajax({
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
