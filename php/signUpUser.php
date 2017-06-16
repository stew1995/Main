<?php

require_once 'Login/database.php';

$name = $surname = $email = $password = $rpassword = "";



if($_SERVER["REQUEST_METHOD"] == "POST") {
  // Sign up fields
  $name = test_input($_POST["name"]);
  $surname = test_input($_POST["surname"]);
  $email = $_POST["email"];
  $password = test_input($_POST["password"]);
  $rpassword = test_input($_POST["rPassowrd"]);
  //If Statement to check fields are not empty
  $emailt = $_POST["email"];
  // can use PHP empty function to check this
  if($name != "" || $surname != "" || $email != "" || $password != "" || $rpassword != "") {

    //Password and email validator
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      //Error message
      return;
    }
    if(!preg_match("((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%*]).{6,20})",$password)) {
      //Password error message
      return;
    }
    $checkUserSQL = "SELECT * FROM user WHERE userEmail = '$emailt'";
    //CHeck email
    if($result = mysqli_query($conn, $checkUserSQL)) {
      $rowcount = mysqli_num_rows($result);
      printf("Result set has %d rows.\n",$rowcount);
      echo "success";
//sql for putting into database 
    } else {
        echo "Email already in use";
    }


    //Need to do js for empty fields



  }
}


function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}





mysqli_close($conn);
?>
