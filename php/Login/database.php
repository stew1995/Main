<?php

$server = "localhost";
$user = "root";
$pass = "amber1995";
$db = "Project";


//Connection
$conn = mysqli_connect($server, $user, $pass, $db);
//Check connection
if(!$conn) {
  die("connection failed" . mysqli_connect_error());
}



//Close connection
//mysqli_close($conn);
 ?>
