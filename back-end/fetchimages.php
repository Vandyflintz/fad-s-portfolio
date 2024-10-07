<?php
error_reporting(E_ALL);
include 'encrypt.php';
ob_start();
require_once('connection.php');
ob_end_clean();
$encodedID = $_GET['id'];
$decodedid = decrypt($encodedID);

$mysqli = mysqli_query($dbcon, "SELECT `image` FROM `admin` WHERE `userid` = '".$decodedid."' union SELECT `image` FROM `users` WHERE `userid` = '".$decodedid."'");
$fetch = mysqli_fetch_assoc($mysqli);
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