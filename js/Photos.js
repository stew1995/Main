      /*if(snap.val().Image == null) {

      } else {
        $("#imageContainor").append("<div><img class='responsive-img circle' src='"+snap.val().Image+"/></div>")
      }*/



$(document).ready(function() {

  var mRefImage = firebase.database().ref().child("Messages");
  var imageKey = mRefImage.push().key;
  mRef.on("child_added", snap => {
    if(snap.val().Image != null) {

    }
  })

});
