//<img class='responsive-img circle' src='

$(document).ready(function() {
    var root = firebase.database().ref().child("Messages");

    root.on("child_added", snap => {
      if(snap.val().Image == null) {

      } else {
        $("#imageContainor").append("<div><img class='responsive-img circle' src='"+snap.val().Image+"/></div>")
      }
    })
});
