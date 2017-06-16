<?php

function loggedIn() {
  if(isset($_SESSION['id'])) {
    return true;
  } else {
    return false;
  }

}


//Check agaisnt email
function userExists($email) {
  //global varibale
  global $connect;

  $sql = "SELECT * FROM user WHERE email = '$email'";
  if($result = mysqli_query($conn, $sql)) {
    $row = mysqli_num_rows($result);
    mysqli_free_result($result);
  }

  mysqli_close($conn);
}
?>
