var selectedFile;

$(document).ready(function() {
  $("#uploadFileButton").hide();
});

$("#file").on("change", function(event) {
  $("#uploadFileButton").show();
  selectedFile = event.target.files[0];
})

$(document).ready(function() {
  $("#uploadFileImage").click(function(event) {
    $("#file").click();

  });
});

//Can add text to the image so store in database

$(document).ready(function() {
    $("#uploadFileButton").click(function(event) {
      /* Act on the event */
      // Create a root reference
      var storageRef = firebase.storage().ref();

      //Get the file name
      var fileName = selectedFile.name;
      //Image Reference
      var fileRef = storageRef.child("Images").child(fileName);

      var uploadTask = fileRef.put(selectedFile);
// Firebase code from website
      uploadTask.on('state_changed', function(snapshot){
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
        var downloadURL = uploadTask.snapshot.downloadURL

        var mRef = firebase.database().ref().child("Images");
        var key = mRef.push().key;
        mRef.set({
            URL: downloadURL,
            Caption: fileName,
            Message: $("#messageinput").val(),
            User: "Stewart"
        });


        console.log(downloadURL);
      });

    });
});
