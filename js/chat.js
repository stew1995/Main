var mRef = firebase.database().ref();
//When screen has loaded
$(document).ready(
  function() {

  /*
  * Read from database chat
  */
  var root = firebase.database().ref().child("Messages");

  root.on("child_added", snap => {
    $("#chatLayout").append("<div class='messagecontainor'><div class='cardview teal z-depth-3'>"+
        "<div class='sender'>"+
          "<span class='white-text'>"+snap.val().User+"</span><span class='right white-text'>"+snap.val().Time+"</span>"+
        "</div><div class='messagecontent'><span>"+snap.val().Message+"</span></div></div></div>"
      );
  })
});

$(document).ready(function() {
  $(".sendButton").click( function() {
    var message = $("#messageinput");
    if(message.val() !="") {
      writeMessage(message.val());
    }
    message.val("");
  })
});


//
function writeMessage(message) {
  //Message timestamp
    var time = new Date();
    //Time format for message
    var formatTime = time.getHours() + ":" + time.getMinutes();

    //User object
    var user = firebase.auth().currentUser;

    mRef.child("Messages").push().set({
      Message: message,
      Time: formatTime,
      //Wont work as no user is signed in
      //User : user.uid
      User : "Stewart"
    });
}


//Need to do layout of the message
// validator
// spacing ect
$(".testbutton").click(function() {
  $('.tap-target').tapTarget('open');
});
$('.tap-target').tapTarget('open');
  $('.tap-target').tapTarget('close');
