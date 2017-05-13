var mRef = firebase.database().ref();
var selectedFile;
var downloadURL;
var fileName;
//When screen has loaded

    //Disable the scroll
    //if i want a div disabled then change the document


$(document).ready(
    function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {

              $("#logoutButton").click(function() {
                firebase.auth().signOut().then(function() {
                  $("#noUser").click();
                }).catch(function(error) {
                // An error happened.
                });
              })
                //Hide the upload
                $(".upload-containor").hide();
                /*
                 * Read from database chat
                 */
                var root = firebase.database().ref().child("Messages");

                root.on("child_added", snap => {
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
                            "</div><div class='messagecontent'><span>" + snap.val().Message + "</span><div class='imageContainor'><img class='responsive-img' src='" + snap.val().Image + "'/></div></div></div>"
                        );
                        $("#imageContainor2").append("<img class='col s4 circle materialboxed data-caption='Test' src='" + snap.val().Image + "'/>  ");

                    }

                    var d = $('#chatLayout');
                    d.scrollTop(d.prop("scrollHeight"));

                    $('.materialboxed').materialbox();


                })
                //Open menu on side
                $("#menu").click(function() {

                    $('.tap-target').tapTarget('open');
                })

                //Close menu
                $(document).mouseup(function(e) {
                    $('.tap-target').tapTarget('close');
                });

                $("#messageinput").keyup(function(event) {
                    if (event.keyCode == 13) {
                        $(".sendButton").click();
                    }
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
                        User: user,


                    });
                }

                //File Uplaod

                $(document).ready(function() {
                    $("#uploadFileButton").hide();
                });

                $("#file").on("change", function(event) {
                    //$("#uploadFileButton").show();
                    Materialize.toast('File is Uploading', 4000)
                    selectedFile = event.target.files[0];
                    uploadFile();
                })

                $(document).ready(function() {
                    $("#uploadFileImage").click(function(event) {
                        $("#file").click();
                        $("#messageinput").val("");
                    });
                });

                //Can add text to the image so store in database

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
                        mRef.child("Messages").push().set({

                            Message: $("#messageinput").val(),
                            Time: formatTime,
                            //Wont work as no user is signed in
                            //User : user.uid
                            User: "Stewart",
                            Image: downloadURL
                        });
                        mRef.child("Images").push().set({
                            Download: downloadURL,
                            Caption: fileName,
                            Message: $("#messageinput").val(),
                            User: "Stewart",
                            Time: formatTime
                        })



                        /*firebase.database().ref().child("Images").on("child_added", snap => {
                        storageRef.child("Images").child(fileName).getDownloadURL().then(function(url) {

                            $("#chatLayout").append("<div class='messagecontainor'><div class='cardview teal z-depth-3'>"+
                              "<div class='sender'>"+
                                "<span class='white-text'>"+snap.val().User+"</span><span class='right white-text'>"+snap.val().Time+"</span>"+
                              "</div><div class='messagecontent'><span>"+snap.val().Message+"</span><div class='imageContainor'><img height='100' width='100' src='"+url+"'/></div></div></div>"
                            );
                          });
                        });*/

                        console.log(downloadURL);
                    });

                }
            } else {
            }
        });






    });
