var googleUser;
var auth2;

//Authentication Listeners



function onSignIn(googleUser) {

  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log(profile.getGivenName());
  console.log(profile.getFamilyName());

  $("#body").load("main2.html");
  /*$("#body").load("checkProfile.html", function () {
    /*var elm = document.createElement('script');
    elm.src = "js/signInWithGoogle.js";
    body.appendChild(elm);

  /*  map = document.createElement('script');
    map.src = "js/map.js";
    body.appendChild(map);



    $('.userData').append('<div><img id="googleImage" src="'+profile.getImageUrl()+'"></div>'+
    '<div class="row">'+
      '<form id="form" class="col s12" action="php/addUserData.php" method="post" onsubmit="formSubmit()">'+
        '<div class="row">'+
          '<div class="col 12 offset-s2">'+
            '<span class="flow-text">Name: </span>'+
          '<div class="input-field inline">'+
            '<input id="googleName" name="profileName"type="text" class="validate" value="'+profile.getName()+'">'+
        '  </div>'+
          '<label class="flow-text" for="googleName" data-error="wrong" data-success="right"></label>'+
          '</div>'+
          '<div class="row">'+
          '<div class="col s12 offset-s2">'+
            '<span class="flow-text">Email:</span>'+
            '<div class="input-field inline">'+
              '<input id="googleEmail" name="profileEmail"type="email" class="validate" value="'+profile.getEmail()+'">'+
            '</div>'+
            '<label class="flow-text" for="googleEmail" data-error="wrong" data-success="right"></label>'+
          '</div> <input  id="ImageURL" name="profileImageURL"type="text" value="'+profile.getImageUrl()+'"></div></div>'+
          '<input type="submit" id="submitdata" href="main2.html" value="submit"></form></div>'
        );

        $("#ImageURL").hide();



  /*  '<div id="userDataContainor"><h5 class="center">Name</h5><p class="center flow-text" id="googleName">'+profile.getName()+'</p>'+
    '<h5 class="center">Email</h5><p class="center flow-text" id="googleEmail">'+profile.getEmail()+'</p></div>');

})*/



}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      $("#body").load("main.html", function () {
        //Login page
      });
      console.log('User signed out.');
    });
  }


function formSubmit() {
  alert("Submitted");
  //GitCheck
}
  //User data in database after send, now all i need to do is show it, but to also implement the chat feature
