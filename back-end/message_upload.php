<?php
error_reporting(E_ALL);

ob_start();
require_once('connection.php');
ob_end_clean();
include 'encrypt.php';
require_once('return_messages.php');

if (isset($_FILES['file'])) {
    // Loop through each uploaded file
    $mimeTypes  = [
        'jpg', 'jpeg', 'png', 'gif', // Image extensions
        'mp4', 'avi', 'mov', // Video extensions
        'mp3', 'wav', 'ogg', // Audio extensions
        'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt', 'rtf' // Document extensions
    ];
    $comments = $_POST['comment'];

    for ($i = 0; $i < count($_FILES['file']['name']); $i++) {
        $fileName = $_FILES['file']['name'][$i];
        $tmpname = $_FILES['file']['tmp_name'][$i];
        $comment = $comments[$i];
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $filenameParts = explode('.', $fileName);
        $fileExtension = strtolower(end($filenameParts));

        $filenameWithoutExtension = preg_replace('/[^a-zA-Z0-9]/', '', $filenameParts[0]);

        $modifiedFilename = $filenameWithoutExtension . '.' . $fileExtension;


        // Get the file extension
        

      
        

        if (in_array($fileExtension, ['jpg', 'png', 'gif' , 'jpeg'])) {
            $uploadDirectory = 'chat_media/pics/';
                $mtype = "image"; 
        } else if (in_array($fileExtension, ['mp4', 'avi', 'mov', 'webm'])) {
            $uploadDirectory = 'chat_media/video/';
            $mtype = "video";
        } else if (in_array($fileExtension, ['mp3', 'mp4', 'wav', 'ogg', 'm4a'])) {
            $uploadDirectory = 'chat_media/audio/';
            $mtype = "audio";
        }
        else{
            $uploadDirectory = 'chat_media/documents/'; 
        $mtype = "document"; 
        }

        $fileType = $_FILES['file']['type'][$i];
        // Move the uploaded file to its destination with the modified filename
        $uploadPath = $uploadDirectory . $modifiedFilename;

        if (move_uploaded_file($tmpname, $uploadPath)) {
            // Get the original filename without modifications
            $originalFilename = $fileName;
            if (($fileType === 'image/jpeg' && filesize($uploadPath) > 1000000) || ($fileType === 'image/jpg' && filesize($uploadPath) > 1000000) || ($fileType === 'image/png' && filesize($uploadPath) > 1000000)) {
                $compressedImageDestination = $uploadPath;
                compressImage($uploadPath, $compressedImageDestination);
            }
            // Set the sender, recipient, and parent_id values (replace with your own values)
            $sender = decrypt($_POST['sender']);
            $recipient = isset($_POST['recipient']) && !empty($_POST['recipient']) ? decrypt($_POST['recipient']) : getUserIdFromAdminTable($dbcon, $sender);
            $parent_id = $_POST['parent_id'];
            $unread = "0";
            $read = "1";

            // Prepare the INSERT statement
            $stmt = $dbcon->prepare("INSERT INTO `messages`(`sender_id`, `recipient_id`, `message`, `modified_message`, `message_type`, `submessage`, `sent_status`, `received_status`, `parent_id`) VALUES (?,?,?,?,?,?,?,?,?)");

            // Bind the parameters
            $stmt->bind_param("sssssssss", $sender, $recipient, $originalFilename, $modifiedFilename, $mtype, $comment, $read, $unread, $parent_id);

            // Execute the prepared statement
            if ($stmt->execute()) {
                if ($i === count($_FILES['file']['name']) - 1) {
                    echo returnMessage("Operation was successful.");
                }
            } else {
                echo returnMessage("Error : " . mysqli_error($dbcon));
                break; // Break the loop if an error occurs
            }

            // Close the statement
            $stmt->close();
        } else {
            $lastError = error_get_last();
            if ($lastError !== null && isset($lastError['message'])) {
                echo returnMessage("Error : " . $lastError['message']);
            } else {
                echo returnMessage("Error : Unknown error");
            }
           // echo "Debug Info: tmpname = $tmpname, uploadPath = $uploadPath";
        }
    }

    // Close the database connection
    $dbcon->close();
} else if(isset($_POST['message'])) {
    $sender = decrypt($_POST['sender']);
    $recipient = isset($_POST['recipient']) && !empty($_POST['recipient']) ? decrypt($_POST['recipient']) : getUserIdFromAdminTable($dbcon, $sender);
    $parent_id = $_POST['parent_id'];
    $mtype = "txtmsg";
    $message = $_POST['message'];
    $unread = "0";
    $read = "1";
    $comment = "";
    $stmt = $dbcon->prepare("INSERT INTO `messages`(`sender_id`, `recipient_id`, `message`, `modified_message`, `message_type`, `submessage`, `sent_status`, `received_status`, `parent_id`) VALUES (?,?,?,?,?,?,?,?,?)");

    // Bind the parameters
    $stmt->bind_param("sssssssss", $sender, $recipient, $message, $message, $mtype, $comment, $read, $unread, $parent_id);

    // Execute the prepared statement
    if ($stmt->execute()) {
     
     echo returnMessage("Operation was successful.");
        
    } else {
        echo returnMessage("Error : " . mysqli_error($dbcon));
    }
}else{
    // Handle case when no files were uploaded
    echo returnMessage("Error : No files were uploaded.");
}
function getUserIdFromAdminTable($dbcon, $sender_id) {
    $mysqli = mysqli_query($dbcon, "SELECT `userid`, `image` FROM `admin` left join messages on (messages.sender_id = admin.userid or messages.recipient_id = admin.userid) WHERE messages.sender_id = '".$sender_id."' or messages.recipient_id = '".$sender_id."'");

    if(mysqli_num_rows($mysqli)<1){
        $mysqlitwo = mysqli_query($dbcon, "SELECT `userid`, `image` FROM `admin` ORDER BY RAND() LIMIT 1");
        $fetch = mysqli_fetch_assoc($mysqlitwo);
    }else{
        $fetch = mysqli_fetch_assoc($mysqli);
    }
    return $fetch['userid'];
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
