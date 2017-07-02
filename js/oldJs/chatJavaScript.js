var lastTimeID = 0;

$(document).ready(function() {
  $("#messageSubmit").click(function() {
    sendChatText();
    $("#messageinput").val("");
  });
  startChat();
});

function startChat(){
  setInterval( function() { getChatText(); }, 2000);
}

function getChatText() {
  $.ajax({
    url: '/refresh.php?lastTimeID=' + lastTimeID,
    type: 'GET'
  })
  .done(function(data) {
    var jsonData = JSON.parse(data);
    var jasonLength = jsonData.results.length;
    var html = "";
    for(var i = 0; i < jsonLength; i++) {
      var result = jsonData.results[i];
      html += "<div class='messagecontainor'><div class='cardview red z-depth-3'>" +
          "<div class='sender'>" +
          "<span class='white-text'>" + result.user + "</span><span class='right white-text'>" + result.timestamp + "</span>" +
          "</div  ><div class='messagecontent'><span>" + result.message + "</span></div></div></div>";

      lastTimeID = result.id;
    }
    $("#chatLayout").append(html);
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}

function sendChatText() {
  var chatInput = $('#messageinput').val();
  if(chatInput != "") {
    $.ajax({
      url: '/submit.php?message='+encodeURIComponent(chatInput),
      type: 'GET'
    });

  }
}
