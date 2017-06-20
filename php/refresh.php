<?php

require_once("database.php");
require_once("chatClass.php");

  $id = intval( $_GET[ 'lastTimeID' ] );
  $jsonData = chatClass::getRestChatLines( $id );
  print $jsonData;
 ?>
