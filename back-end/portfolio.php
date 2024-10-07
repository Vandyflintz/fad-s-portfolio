<?php

error_reporting(E_ALL);

ob_start();
require_once('connection.php');
ob_end_clean();
include 'encrypt.php';
require_once('return_messages.php');

$request = $_POST['request'];

$dir = "images/cv/";
if($request == "newdata"){
    
  
   $fbhandle = $_POST['fb_handle'];
   $ighandle = $_POST['ig_handle'];
   $fblink = $_POST['fb_link'];
   $iglink = $_POST['ig_link'];
   $whatsapp = $_POST['whatsapp_handle'];
   $ythandle = $_POST['yt_handle'];
   $ytlink = $_POST['yt_link'];
   $email = $_POST['emailAddr'];
   $contact = $_POST['contact'];
   $intro = $_POST['intro'];
   
   
   $allowedExtensions = [
    'jpg', 'jpeg', 'png', 'gif', // Image extensions
    'mp4', 'avi', 'mov', // Video extensions
    'pdf' // Document extensions
];
    
    $uploadedFiles = isset($_FILES['uploaded_files']) ? $_FILES['uploaded_files'] : [];
    
    if (!empty($uploadedFiles)) {
        $numFiles = count($uploadedFiles['name']);
        $insertedFiles = 0; // Counter for inserted files
    
        for ($i = 0; $i < $numFiles; $i++) {
            $tempFilePath = $uploadedFiles['tmp_name'][$i];
            $fileType = $uploadedFiles['type'][$i];
            $newFileName = $uploadedFiles['name'][$i];
            $extension = strtolower(pathinfo($newFileName, PATHINFO_EXTENSION));
            
            // Validate file extension and MIME type
            if (!in_array($extension, $allowedExtensions)) {
                if (move_uploaded_file($tempFilePath, $dir . $newFileName)) {
                    if (($fileType === 'image/jpeg' && filesize($dir . $newFileName) > 1000000) || ($fileType === 'image/jpg' && filesize($dir . $newFileName) > 1000000) || ($fileType === 'image/png' && filesize($dir . $newFileName) > 1000000)) {
                        $compressedImageDestination = $dir . $newFileName;
                        compressImage($dir . $newFileName, $compressedImageDestination);
                    }
                    $insertedFiles++;
                }
            } else {
                // Handle non-image files (e.g., just move them to the destination directory)
                move_uploaded_file($tempFilePath, $dir . $newFileName);
                $insertedFiles++;
            }
        }
    
        if ($insertedFiles === $numFiles) {
         
            $imageFile = $uploadedFiles['name'][0];
            $documentFile = $uploadedFiles['name'][1];
    
            $stmt = $dbcon->prepare("INSERT INTO `sideline_items`(`cv_file`, `facebook_handle`, `ig_handle`, `whatsapp_handle`, `youtube_handle`, `email_address`, `contact`, `short_self_intro`, `display_profile`,`youtube_link`, `fb_link`, `ig_link`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");

            // Bind the parameters
            $stmt->bind_param("ssssssssssss", $documentFile,$fbhandle, $ighandle, $whatsapp, $ythandle, $email, $contact, $intro,$imageFile, $ytlink, $fblink, $iglink);
        
            // Execute the prepared statement
            if ($stmt->execute()) {
                echo returnMessage("Operation was successful.");
        
            } else {
                echo returnMessage("Error : " . mysqli_error($dbcon));
            }
    
    
            $dbcon->close();
        } else {
            echo returnMessage("Error :Some files could not be uploaded.");
        }
    }
  
    
}

if($request == "fetchbio"){
    $Data = array();
    $filedir = "http://www.emkapp.com/fad_s_portfolio/back-end/images/cv/";
    $stmt = $dbcon->prepare("SELECT `id`, `cv_file`, `intro_video`, `facebook_handle`, `ig_handle`, `whatsapp_handle`, `youtube_handle`, `email_address`, `contact`, `short_self_intro`, `display_profile`,`youtube_link`, `fb_link`, `ig_link`  FROM `sideline_items` order by id DESC LIMIT 1");

    
    $stmt->execute();

    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        foreach ($row as $key => $value) {
            if ($value === null) {
                $row[$key] = "";
            }
        }
      /*  $row["display_profile"] = $filedir . $row["display_profile"];

    // Generate Data URI for the display_profile image
    $imageData = file_get_contents($filedir.$row["display_profile"]);
    if ($imageData !== false) {
        $base64Image = base64_encode($imageData);
        $dataUri = "data:image/jpeg;base64," . $base64Image;
        $row["display_profile"] = $dataUri;
    }*/
        $Data[] = $row;
    }
    $result = array(
        "bioData" => $Data
    );

    // Convert the PHP array to JSON and render the output.
    $myjson = json_encode($result, JSON_UNESCAPED_SLASHES);
    header('Content-Type: application/json');
    echo $myjson;

    $stmt->close();
}

if($request == "updatebio"){
    $intro = $_POST['intro'];
    $stmt = $dbcon->prepare("UPDATE `sideline_items` SET `short_self_intro`= ?  ");

    // Bind the parameters
    $stmt->bind_param("s",$intro );

    // Execute the prepared statement
    if ($stmt->execute()) {
        echo returnMessage("Operation was successful.");

    } else {
        echo returnMessage("Error : " . mysqli_error($dbcon));
    }
}

if($request == "updatepic"){
    $dir = "images/cv/";
    $mainimage = $_FILES["file"];
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

        $stmt = $dbcon->prepare("UPDATE `sideline_items` SET  `display_profile`=? ");

    // Bind the parameters
    $stmt->bind_param("s", $mainimagename);

    // Execute the prepared statement
    if ($stmt->execute()) {
        echo returnMessage("Operation was successful.");

    } else {
        echo returnMessage("Error : " . mysqli_error($dbcon));
    }


    } else {
        $message = "error uploading file";
        echo returnMessage($message);
    }
}

if($request == "updatehandles"){
    $fbhandle = $_POST['fb_handle'];
    $ighandle = $_POST['ig_handle'];
    $fblink = $_POST['fb_link'];
    $iglink = $_POST['ig_link'];
    $whatsapp = $_POST['whatsapp_handle'];
    $ythandle = $_POST['yt_handle'];
    $ytlink = $_POST['yt_link'];
    $email = $_POST['emailAddr'];
    $contact = $_POST['contact'];
    
    $stmt = $dbcon->prepare("UPDATE `sideline_items` SET `facebook_handle`=?,`ig_handle`=? ,`whatsapp_handle`=?, `youtube_handle`=?, `email_address`=?, `contact`=?,`youtube_link`=?, `fb_link`=?, `ig_link` =?");

    // Bind the parameters
    $stmt->bind_param("sssssssss",$fbhandle, $ighandle, $whatsapp, $ythandle, $email, $contact, $ytlink,$fblink,$iglink);

    // Execute the prepared statement
    if ($stmt->execute()) {
        echo returnMessage("Operation was successful.");

    } else {
        echo returnMessage("Error : " . mysqli_error($dbcon));
    }
}

if($request == "updatecv"){
    $dir = "images/cv/";
    $mainimage = $_FILES["file"];
    $name = $mainimage["name"];
    $fileExtension = strtolower(pathinfo($name, PATHINFO_EXTENSION));
    $filenameParts = explode('.', $name);
    $fileExtension = strtolower(end($filenameParts));

    $filenameWithoutExtension = preg_replace('/[^a-zA-Z0-9]/', '', $filenameParts[0]);

    $modifiedFilename = substr($filenameWithoutExtension, 0, 7) . '.' . $fileExtension;
    $newmainimagename = uniqid() . strtolower($modifiedFilename);
    if(move_uploaded_file($mainimage['tmp_name'], $dir . $newmainimagename)) {
        $mainimagename = $newmainimagename;
        

        $stmt = $dbcon->prepare("UPDATE `sideline_items` SET  `cv_file`=? ");

    // Bind the parameters
    $stmt->bind_param("s", $mainimagename);

    // Execute the prepared statement
    if ($stmt->execute()) {
        echo returnMessage("Operation was successful.");

    } else {
        echo returnMessage("Error : " . mysqli_error($dbcon));
    }
} else {
    $message = "error uploading file";
    echo returnMessage($message);
}
}

if($request == "fetchcv"){
    $sql = "SELECT `cv_file` FROM `sideline_items` order by id DESC limit 1; ";
    $result = $dbcon->query($sql);
    $row = $result->fetch_assoc();
    $pdfFileName = $row['cv_file'];
    $pdfPath = "http://www.emkapp.com/fad_s_portfolio/back-end/images/cv/";
    $pdfFullPath = $pdfPath . $pdfFileName; // Full path to the PDF file

    // Send appropriate headers
    header('Content-Type: application/pdf');
    header('Content-Disposition: inline; filename="' . $pdfFileName . '"');
    
    // Read the file and output its content
    readfile($pdfFullPath);
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