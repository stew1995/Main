<?php

require 'database.php';


$message = $user = $timestamp = $image = "";

if($_POST["messageSubmit"]) {
  //NEED TO GET THE INFORMTION FROM THE FORM


  $user = $_POST["user"];
  $message = $_POST["message"];


  if($user != "" && $message != "") {
    //Send to the database
    $sql = "insert into message (user, message) values ('".$user."', '".$message."')";
    if(mysqli_query($conn, $sql)) {
      echo "complete";
    } else {
      echo "Failed";
    }
  } 

}


 ?>
