<?php
//Database connection
require 'database.php';
// Add Google profile data to the database + token

  // Sign up fields
  $name = test_input($_POST["profileName"]);
  $email = test_input($_POST["profileEmail"]);
  $image = $_POST["profileImageURL"];

  if($name != "" && $email != "") {
    //Check if email is in the database already
    $checkUserSQL = "SELECT * FROM user WHERE userEmail = '$emailt'";
    //CHeck email
    if($result = mysqli_query($conn, $checkUserSQL)) {
      $rowcount = mysqli_num_rows($result);
      echo "<script>console.log('Result set has ".$rowcount." rows')</script>";
      //sql for putting into database

      $sql = "insert into user (userName, userEmail, userURL) values ('".$name."', '".$email."', '".$image."')";

      if(mysqli_query($conn, $sql)) {
        echo "<script>console.log('Details added to database')


        window.onload = function() {
          window.location.href = '../main2.html';
        }

        function ajaxGet(URL, callback) {
          var ajaxObj = new XMLHttpRequest();
          ajaxObj.open('GET', URL, true); // The TRUE implies asynchronous
          ajaxObj.onreadystatechange = function() {
            if (ajaxObj.status === 200){
              if (ajaxObj.readyState === 4){
                callback(ajaxObj.responseText);
              }
            }
          };
          ajaxObj.send();
        }
        </script>";
      } else {
        echo "<script>console.log('Details not added to database')</script>";
      }
    } else {
        echo "<script>console.log('Email already in use')</script>";
    }
  }


function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
 ?>
