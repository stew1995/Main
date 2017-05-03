var mRef = firebase.database().ref();
//When screen has loaded
$(document).ready(
  function() {

  /*
  * Read from database chat
  */
  var root = firebase.database().ref().child("Messages");

  root.on("child_added", snap => {
    $("#chatLayout").append("<div id='messageContent'><span class='timestamp'>"+snap.val().Time+"</span><p class='messageAuthor'>"+snap.val().User+"</p><p class='content'>"+snap.val().Message+"</p>");
  })
});


$(document).ready(function() {
  $(".sendButton").click( function() {
    var message = $("#messageinput");
    if(message.val() !="") {
      writeMessage(message);
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
  //    User : user.uid
      User : "Stewart"
    });
}


//Need to do layout of the message
// validator
// spacing ect
