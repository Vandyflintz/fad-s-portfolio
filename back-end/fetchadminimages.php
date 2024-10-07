<?php
error_reporting(E_ALL);
include 'encrypt.php';
ob_start();
require_once('connection.php');
ob_end_clean();
$encodedID = $_GET['id'];
$decodedid = decrypt($encodedID);

$mysqli = mysqli_query($dbcon, "SELECT `userid`, `image` FROM `admin` left join messages on (messages.sender_id = admin.userid or messages.recipient_id = admin.userid) WHERE messages.sender_id = '".$decodedid."' or messages.recipient_id = '".$decodedid."'");

if(mysqli_num_rows($mysqli)<1){
    $mysqlitwo = mysqli_query($dbcon, "SELECT `userid`, `image` FROM `admin`  WHERE `status` = 'current'");
    $fetch = mysqli_fetch_assoc($mysqlitwo);
}else{
    $fetch = mysqli_fetch_assoc($mysqli);
}



$img = "http://www.emkapp.com/fad_s_portfolio/back-end/images/dp/" . $fetch['image'];

$imgFile = file_get_contents($img);
$contentLength = strlen($imgFile);
$imageInfo = getimagesize($img);
$imageMimeType = $imageInfo['mime'];

header('Content-Type: ' . $imageMimeType);
header('Content-Length: ' . $contentLength);
echo $imgFile;

/*header('Content-Type: image/*');
header('Content-Length: ' . strlen($img));
echo $img ;*/

?>