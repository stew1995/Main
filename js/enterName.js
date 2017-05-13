$(document).ready(function() {
  var user = firebase.auth().currentUser;

$("#enterNameButton").click(function(event) {
    var mRef = firebase.database().ref();
    var key = mRef.key;
    mRef.child("Users").push().set({

        Name: $("#nameforaccount").val(),
        id: user.uid
        //DO an image as profile

  })

  $("#body").load("main2.html", function () {
    elm = document.createElement('script');
    elm.src = "js/chat.js";
    body.appendChild(elm);
  });
});



})
