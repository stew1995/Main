<?php
$message = intval($_GET['message']);
require 'database.php';


$message = $user = $timestamp = $image = "";

if($_POST["messageSubmit"]) {
  //NEED TO GET THE INFORMTION FROM THE FORM


  $user = $_POST["user"];



  if($user != "" && $message != "") {
    //Send to the database
    $sql = "insert into user (user, message) values ('".$user."', '".$message."')";

    if(mysqli_query($conn, $sql)) {
      echo "<script>console.log('complete')</script>";
    } else {
      echo "<script>console.log('failed')</script>";
    }
  }
}
mysqli_close($conn);

 ?>
