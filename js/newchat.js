var mRef = firebase.database().ref();
var selectedFile;
var downloadURL;
var fileName;
//When screen has loaded
//Hide the upload
$(".upload-containor").hide();
    //Disable the scroll
    //if i want a div disabled then change the document


$(document).ready(
    function() {
    /*
    * Read from database chat
    */
    var root = firebase.database().ref().child("Messages");
    var user = firebase.auth().currentUser;

    root.on("child_added", snap => {
      /*
      first if statement determins what user is who and if it has to change the colour of the field
      */
      if(user.uid != snap.val().UserID) {
        //If the user didnt send that message
        if (snap.val().Image == null) {
            $("#chatLayout").append("<div class='messagecontainor'><div class='cardview red z-depth-3'>" +
                "<div class='sender'>" +
                "<span class='white-text'>" + snap.val().User + "</span><span class='right white-text'>" + snap.val().Time + "</span>" +
                "</div  ><div class='messagecontent'><span>" + snap.val().Message + "</span></div></div></div>"
            );


        } else {
            $("#chatLayout").append("<div class='messagecontainor'><div class='cardview red z-depth-3'>" +
                "<div class='sender'>" +
                "<span class='white-text'>" + snap.val().User + "</span><span class='right white-text'>" + snap.val().Time + "</span>" +
                "</div><div class='messagecontent'><span>" + snap.val().Message + "</span><div class='imageContainor'><img class='responsive-img' src='" + snap.val().Image + "'/></div></div></div>");

                $("#imageContainor2").append("<img class='col s4 circle materialboxed data-caption='Test' src='" + snap.val().Image + "'/>  ");

        }
      } else {
        //If they did send that message
        //Need to change colour
        if (snap.val().Image == null) {
            $("#chatLayout").append("<div class='messagecontainor'><div class='cardview teal z-depth-3'>" +
                "<div class='sender'>" +
                "<span class='white-text'>" + snap.val().User + "</span><span class='right white-text'>" + snap.val().Time + "</span>" +
                "</div><div class='messagecontent'><span>" + snap.val().Message + "</span></div></div></div>"
            );


        } else {
            $("#chatLayout").append("<div class='messagecontainor'><div class='cardview teal z-depth-3'>" +
                "<div class='sender'>" +
                "<span class='white-text'>" + snap.val().User + "</span><span class='right white-text'>" + snap.val().Time + "</span>" +
                "</div><div class='messagecontent'><span>" + snap.val().Message + "</span><div class='imageContainor'><img class='responsive-img' src='" + snap.val().Image + "'/></div></div></div>");

                $("#imageContainor2").append("<img class='col s4 circle materialboxed data-caption='Test' src='" + snap.val().Image + "'/>  ");

        }


      }




      var d = $('#chatLayout');
      d.scrollTop(d.prop("scrollHeight"));

      $('.materialboxed').materialbox();


    })


    $("#messageinput").keyup(function(event) {
      if (event.keyCode == 13) {
          $(".sendButton").click();
      }
    });

    $("#file").on("change", function(event) {
      Materialize.toast('File is Uploading', 4000)
      selectedFile = event.target.files[0];
      uploadFile();
    })

    });

    $(document).ready(function() {
      $("#uploadFileImage").click(function(event) {
          $("#file").click();
          $("#messageinput").val();
      });
    });

    $(document).ready(function() {
      $(".sendButton").click(function() {
          var message = $("#messageinput");
          if (message.val() != "") {
              writeMessage(message.val());
          }
          message.val("");
      })
    });

    // Message composer
    function writeMessage(message) {
      //Message timestamp
      var time = new Date();
      //Time format for message
      var formatTime = time.getHours() + ":" + time.getMinutes();

      //User object
      var user = firebase.auth().currentUser;
      var userMRef = mRef.child("Users").child(user.uid);
      userMRef.on('value', function(snapshot) {
        mRef.child("Messages").push().set({
            Message: message,
            Time: formatTime,
            User: snapshot.val().Name,
            UserID: user.uid
        });
      });

    }

    function uploadFile() {
      /* Act on the event */
      // Create a root reference
      var storageRef = firebase.storage().ref();

      //Get the file name
      fileName = selectedFile.name;
      //Image Reference
      var fileRef = storageRef.child("Images").child(fileName);

      var uploadTask = fileRef.put(selectedFile);
      // Firebase code from website
      uploadTask.on('state_changed', function(snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
          }
      }, function(error) {
          // Handle unsuccessful uploads
      }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          downloadURL = uploadTask.snapshot.downloadURL;
          var time = new Date();
          //Time format for message
          var formatTime = time.getHours() + ":" + time.getMinutes();

          var mRef = firebase.database().ref();
          var key = mRef.key;
          var user = firebase.auth().currentUser;
          mRef.child("Messages").push().set({

              Message: $("#messageinput").val(),
              Time: formatTime,
              //Wont work as no user is signed in
              //User : user.uid
              User: "Stewart",
              UserID: user.uid,
              Image: downloadURL
          });
          mRef.child("Images").push().set({
              Download: downloadURL,
              Caption: fileName,
              Message: $("#messageinput").val(),
              User: user.uid,
              Time: formatTime
          })


          console.log(downloadURL);
                    });

                }


    $("#logoutButton").click(function() {
      firebase.auth().signOut().then(function() {
        $("#body").load("main.html")
      }).catch(function(error) {
      // An error happened.
      });
    })
