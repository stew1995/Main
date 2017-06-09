<?php
require 'database.php';


//SQL Statement to be executed
$sql = "SELECT * FROM user";
//Result of code
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo "id: " . $row["id"]. " | Name: " . $row["userName"]. " | Surname: ".$row["userSurname"]." | Email: ". $row["userEmail"]."<br>";
    }
} else {
    echo "0 results";
}


mysqli_close($conn);

 ?>
