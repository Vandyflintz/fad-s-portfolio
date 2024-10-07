<?php
error_reporting(E_ALL);

ob_start();
require_once('connection.php');
ob_end_clean();
include 'encrypt.php';
require_once('return_messages.php');

require_once "vendor/autoload.php";


use Ramsey\Uuid\Uuid;
//$uuid1 = Uuid::uuid1();
//$uuid4 = Uuid::uuid4();

//echo $uuid4->toString();

$ddata = json_decode(file_get_contents('php://input'), true);
$encdata = json_encode($ddata);
$myArray = json_decode(json_encode($encdata), true);
$dir = "images/dp/";
//var_dump($ddata);
if (isset($_POST["request"])) {

   
$request = $_POST['request'];
$fname = $_POST["firstname"];
$lname = $_POST["lastname"];
$pin = $_POST["pin"];

$password = $_POST["pass"];
$email = $_POST["emailAddr"];
$dptype = $_POST['dpType'];
$userid = Uuid::uuid1();

$existingsql = mysqli_prepare($dbcon, "SELECT * FROM `users` WHERE `email_address` = ?");
mysqli_stmt_bind_param($existingsql, "s", $email);
mysqli_stmt_execute($existingsql);
$existingresult = mysqli_stmt_get_result($existingsql);

if (mysqli_num_rows($existingresult) < 1) {

    if($dptype == "avatar") {
        $img = $_POST['dp'];
        if($request == "user") {
            $insertstmt = $dbcon->prepare("INSERT INTO `users`(`firstname`, `lastname`, `email_address`, `userid`, `contact`, `image`, `password`, `pin`) VALUES (?,?,?,?,?,?,?,?)");

            $insertstmt->bind_param("ssssssss", $fname, $lname, $email, $userid, $contact, $img, $password, $pin);
        } else {
            $insertstmt = $dbcon->prepare("INSERT INTO `admin`(`firstname`, `lastname`, `email_address`, `userid`, `password`, `image`, `pin`) VALUES (?,?,?,?,?,?,?)");

            $insertstmt->bind_param("sssssss", $fname, $lname, $email, $userid, $password, $img, $pin);
        }



        // Execute the statement
        $insertstmt->execute();

        if ($insertstmt->errno) {
            echo returnMessage("Error : ".$insertstmt->error);
        } else {
            if($request !== "user") {
                echo returnMessage("operation was successful");
            } else {
                $arr = array();
                $arr[] = array("message" => "operation was successful", "id" => $userid);
                array_push($arr);
                echo json_encode($arr, JSON_UNESCAPED_SLASHES);
            }
        }

        $insertstmt->free_result();
    } else {

        $mainimage = $_FILES["dp"];
        $name = $mainimage["name"];
        $fileExtension = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        $filenameParts = explode('.', $name);
        $fileExtension = strtolower(end($filenameParts));

        $filenameWithoutExtension = preg_replace('/[^a-zA-Z0-9]/', '', $filenameParts[0]);

        $modifiedFilename = substr($filenameWithoutExtension, 0, 7) . '.' . $fileExtension;
        $newmainimagename = uniqid() . strtolower($modifiedFilename);

        if(move_uploaded_file($mainimage['tmp_name'], $dir . $newmainimagename)) {
            $mainimagename = $newmainimagename;
            $fsize = $mainimage["size"];
            if ($fsize > 1000000) {
                $sourceimage = $dir.$mainimagename;
                $image_destination = $dir.$mainimagename;
                $compressedimages = compressimage($sourceimage, $image_destination);
            }

            if($request == "user") {
                $contact = $_POST['contact'];
                $insertstmt = $dbcon->prepare("INSERT INTO `users`(`firstname`, `lastname`, `email_address`, `userid`, `contact`, `image`, `password`, `pin`) VALUES (?,?,?,?,?,?,?,?)");

                $insertstmt->bind_param("ssssssss", $fname, $lname, $email, $userid, $contact, $mainimagename, $password, $pin);
            } else {
                $insertstmt = $dbcon->prepare("INSERT INTO `admin`(`firstname`, `lastname`, `email_address`, `userid`, `password`, `image`, `pin`) VALUES (?,?,?,?,?,?,?)");

                $insertstmt->bind_param("sssssss", $fname, $lname, $email, $userid, $password, $mainimagename, $pin);
            }



            // Execute the statement
            $insertstmt->execute();

            if ($insertstmt->errno) {
                echo returnMessage("Error : ".$insertstmt->error);
            } else {
                if($request !== "user") {
                        $lastID = $dbcon->insert_id;
                    $updatestmt = $dbcon->prepare("UPDATE `admin` SET `status`= 'active' WHERE `id` = ?");

                    $updatestmt->bind_param("i", $lastID);
                    $updatestmt->execute();  
                    echo returnMessage("operation was successful");
                   
                } else {
                    $arr = array();
                    $arr[] = array("message" => "operation was successful", "id" => $userid);
                    array_push($arr);
                    echo json_encode($arr, JSON_UNESCAPED_SLASHES);
                }
            }

            $insertstmt->free_result();


        } else {
            $message = "error uploading file";
            echo returnMessage($message);
        }
    }
}else{
    $arr = array();
    $arr[] = array("message" => "Error: email address exists");
    array_push($arr);
    echo json_encode($arr, JSON_UNESCAPED_SLASHES);
}   


}




function compressimage($source_image, $compress_image)
{
    $image_info = getimagesize($source_image);

    // Read Exif data to get orientation
    $exif = exif_read_data($source_image);

    // Load image resource based on mime type
    switch ($image_info['mime']) {
        case 'image/jpeg':
            $source_image = imagecreatefromjpeg($source_image);
            break;
        case 'image/png':
            $source_image = imagecreatefrompng($source_image);
            break;
        case 'image/gif':
            $source_image = imagecreatefromgif($source_image);
            break;
        case 'image/bmp':
            $source_image = imagecreatefromwbmp($source_image);
            break;
        default:
            return false; // Unsupported image format
    }

    // Determine the orientation and apply rotation if needed
    if (!empty($exif['Orientation'])) {
        switch ($exif['Orientation']) {
            case 3:
                $source_image = imagerotate($source_image, 180, 0);
                break;
            case 6:
                $source_image = imagerotate($source_image, -90, 0);
                break;
            case 8:
                $source_image = imagerotate($source_image, 90, 0);
                break;
        }
    }

    // Save the rotated image
    switch ($image_info['mime']) {
        case 'image/jpeg':
            imagejpeg($source_image, $compress_image, 75);
            break;
        case 'image/png':
            imagepng($source_image, $compress_image, 7);
            break;
        case 'image/gif':
            imagegif($source_image, $compress_image);
            break;
        case 'image/bmp':
            imagewbmp($source_image, $compress_image, 75);
            break;
    }

    // Close the GD image resource
    imagedestroy($source_image);

    return $compress_image;
}


?>