$(document).ready(function() {


$("#enterNameButton").click(function(event) {
  var user = firebase.auth().currentUser;
    var mRef = firebase.database().ref();
    var key = mRef.key;
    console.log(user.uid);
    mRef.child("Users").child(user.uid).set({

        Name: $("#nameforaccount").val()
        //DO an image as profile

  })

  $("#body").load("main2.html", function () {
    elm = document.createElement('script');
    elm.src = "js/newchat.js";
    body.appendChild(elm);

    map = document.createElement('script');
    map.src = "js/map.js";
    body.appendChild(map);
  });
});



})
