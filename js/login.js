


  firebase.auth().onAuthStateChanged(function(user) {

      if (user) {
        //user sign in
        //slow change
      //  $("#logincontainor").hide();
      /*$("#body").load("main2.html", function () {
        elm = document.createElement('script');
        elm.src = "js/newchat.js";
        head.appendChild(elm);
      });*/

      } else {
      //  $("#body").load("main.html");
      }
    });




//Sign In User

  $("#signInButton").click(function() {

    var email = $("#email").val();
    var password = $("#password").val();

    if(email != "" && password != "") {


      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {


        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...


      })

      $("#body").load("main2.html", function () {
        elm = document.createElement('script');
        elm.src = "js/newchat.js";
        body.appendChild(elm);
      });
    }
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
      $("#body").load("enterName.html", function () {
        elm = document.createElement('script');
        elm.src = "js/accountName.js";
        body.appendChild(elm);
      });
    }

  }
);
