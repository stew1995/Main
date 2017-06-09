<?php

require 'database.php';

// Sign up fields
$name = $_POST["name"];
$surname = $_POST["surname"];
$email = $_POST["email"];
$password = $_POST["password"];



//SQL Statement
$sql = "insert into user (userName, userSurname, userEmail, userPass) values ('$name', '$surname', '$email', '$password')";

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
