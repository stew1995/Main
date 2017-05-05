


  firebase.auth().onAuthStateChanged(function(user) {

      if (user) {
        //user sign in
        //slow change
      //  $("#logincontainor").hide();
       //$("#body").load("main2.html");
      } else {

      }
    });




//Sign In User
$(document).ready( function() {
  $("signInButton").click(function() {

    var email = $("#email").val();
    var password = $("#password").val();

    if(email != "" && password != "") {


      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {


        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...


      });
    }
  })
})

//Register user
$("#registerButton").click(
  function() {
    //Getting a html element
    var email = $("#email").val();
    var password = $("#password").val();


    if(email != "" && password != "") {


      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

    }

  }
);
