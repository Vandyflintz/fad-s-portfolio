<?php

error_reporting(E_ALL);

ob_start();
require_once('connection.php');
ob_end_clean();
include 'encrypt.php';
require_once('return_messages.php');

$request = $_POST['request'];

if($request == "fetch_files"){
    $filedir = "http://www.emkapp.com/fad_s_portfolio/back-end/images/graphic_works/";
    $pencilData = array();
    $psData = array();
    $aeData = array();
    $threedData = array();
    $generalVideosData = array();

    $aeresults = getResultsFromQuery($dbcon, "ae");
    $psresults = getResultsFromQuery($dbcon, "ps");
    $pencilresults = getResultsFromQuery($dbcon, "pencil");
    $threedresults = getResultsFromQuery($dbcon, "threed");
    $generalvideosresults = getResultsFromQuery($dbcon, "generalvideos");

    if ($aeresults->num_rows > 0) {
        while ($row = $aeresults->fetch_assoc()) {
            $idLikedArray = $row["id_liked"];
    
            if (!empty($idLikedArray)) {
                $idLikedArray = explode(",", $idLikedArray);
                
                // Encrypt each id_liked value
                $encryptedIdLikedArray = [];
                foreach ($idLikedArray as $idLiked) {
                    $encryptedIdLikedArray[] = encrypt($idLiked);
                }
                
                $row["id_liked"] = $encryptedIdLikedArray;
            }else{
                $row["id_liked"] = []; 
            }
            $aeData[] = $row;
        }
    }else{
        while ($row = $aeresults->fetch_assoc()) {
            $aeData[] = $row;
        }
    }

    if ($psresults->num_rows > 0) {
        while ($row = $psresults->fetch_assoc()) {
            $idLikedArray = $row["id_liked"];
    
            if (!empty($idLikedArray)) {
                $idLikedArray = explode(",", $idLikedArray);
                
                // Encrypt each id_liked value
                $encryptedIdLikedArray = [];
                foreach ($idLikedArray as $idLiked) {
                    $encryptedIdLikedArray[] = encrypt($idLiked);
                }
                
                $row["id_liked"] = $encryptedIdLikedArray;
            }else{
                $row["id_liked"] = []; 
            }
           
            $psData[] = $row;
        }
    }else{
        while ($row = $psresults->fetch_assoc()) {
            $psData[] = $row;
        }
    }

    if ($pencilresults->num_rows > 0) {
        while ($row = $pencilresults->fetch_assoc()) {
            $idLikedArray = $row["id_liked"];
    
            if (!empty($idLikedArray)) {
                $idLikedArray = explode(",", $idLikedArray);
                
                // Encrypt each id_liked value
                $encryptedIdLikedArray = [];
                foreach ($idLikedArray as $idLiked) {
                    $encryptedIdLikedArray[] = encrypt($idLiked);
                }
                
                $row["id_liked"] = $encryptedIdLikedArray;
            }else{
                $row["id_liked"] = []; 
            }
          
            $pencilData[] = $row;
        }
    }else{
        while ($row = $pencilresults->fetch_assoc()) {
            $pencilData[] = $row;
        }
    }

    if ($threedresults->num_rows > 0) {
        while ($row = $threedresults->fetch_assoc()) {
            $idLikedArray = $row["id_liked"];
    
            if (!empty($idLikedArray)) {
                $idLikedArray = explode(",", $idLikedArray);
                
                // Encrypt each id_liked value
                $encryptedIdLikedArray = [];
                foreach ($idLikedArray as $idLiked) {
                    $encryptedIdLikedArray[] = encrypt($idLiked);
                }
                
                $row["id_liked"] = $encryptedIdLikedArray;
            }else{
                $row["id_liked"] = []; 
            }
          
            $threedData[] = $row;
        }
    }else{
        while ($row = $threedresults->fetch_assoc()) {
            $threedData[] = $row;
        }
    }

    if ($generalvideosresults->num_rows > 0) {
        while ($row = $generalvideosresults->fetch_assoc()) {
            $idLikedArray = $row["id_liked"];
    
            if (!empty($idLikedArray)) {
                $idLikedArray = explode(",", $idLikedArray);
                
                // Encrypt each id_liked value
                $encryptedIdLikedArray = [];
                foreach ($idLikedArray as $idLiked) {
                    $encryptedIdLikedArray[] = encrypt($idLiked);
                }
                
                $row["id_liked"] = $encryptedIdLikedArray;
            }else{
                $row["id_liked"] = []; 
            }
            $generalVideosData[] = $row;
        }
    }else{
        while ($row = $generalvideosresults->fetch_assoc()) {
            $generalVideosData[] = $row;
        }
    }

    $result = array(
        "pencilData"=>$pencilData,
        "psData" => $psData,
        "aeData" => $aeData,
        "threedData" => $threedData,
        "generalVideosData" => $generalVideosData
    );

    // Convert the PHP array to JSON and render the output.
    $myjson = json_encode($result, JSON_UNESCAPED_SLASHES);
    header('Content-Type: application/json');
    echo $myjson;




}

if($request == "add_file"){
$operation = $_POST['operation'];
    $category = $_POST['category'];
   
    if($operation == "link"){
        $link = $_POST['link'];
        $stmt = $dbcon->prepare("INSERT INTO `files_catalogue`(`file_name`, `file_category`) VALUES (?,?)");

        // Bind the parameters
        $stmt->bind_param("ss", $link, $category);
    
        // Execute the prepared statement
        if ($stmt->execute()) {
            echo returnMessage("Operation was successful.");
    
        } else {
            echo returnMessage("Error : " . mysqli_error($dbcon));
        }
}
if($operation == "file"){
        $dir = "images/graphic_works/";
        $desc = $_POST['description'];
        $title = $_POST['file-title'];
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

            $stmt = $dbcon->prepare("INSERT INTO `files_catalogue`(`file_title`, `file_name`, `file_category`, `file_description`) VALUES (?,?,?,?)");

        // Bind the parameters
        $stmt->bind_param("ssss", $title, $mainimagename, $category, $desc);
    
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

}
if ($request == "update_desc") {
    $id = $_POST["fileid"];
    $desc = $_POST["desc"];
    $updateQuery = "UPDATE `files_catalogue` SET `file_description` = ? WHERE `id` = ?";
    $updateStmt = $dbcon->prepare($updateQuery);

    if ($updateStmt) {
        // Bind the parameters
        $updateStmt->bind_param("ss", $desc, $id);

       

        // Execute the statement
        $updateResult = $updateStmt->execute();

        // Check if the update query was successful
        if ($updateResult) {
            echo "Operation was successful.";
        } else {
            echo "Error : Update query execution failed.";
        }
    }
}

if ($request == "delete_file") {
    $id = $_POST["fileid"];
    
    // Retrieve the file name from the database
    $filenameQuery = "SELECT `file_name` FROM `files_catalogue` WHERE `id` = ?";
    $filenameStmt = $dbcon->prepare($filenameQuery);
    $filenameStmt->bind_param("s", $id);
    $filenameStmt->execute();
    $filenameResult = $filenameStmt->get_result();
    
    if ($filenameRow = $filenameResult->fetch_assoc()) {
        $filename = $filenameRow["file_name"];
        
        
        $directory = "images/graphic_works/";
        $filepath = $directory . $filename;
        
       
        if (file_exists($filepath) && !is_link($filepath)) {
          
            unlink($filepath);
        }
        
       
        $deleteQuery = "DELETE FROM `files_catalogue` WHERE `id` = ?";
        $deleteStmt = $dbcon->prepare($deleteQuery);
        $deleteStmt->bind_param("s", $id);

        if ($deleteStmt->execute()) {
            echo returnMessage("File and record deleted successfully.");
        } else {
            echo returnMessage("Error deleting file and record: " . mysqli_error($dbcon));
        }
    } else {
        echo returnMessage("File not found in the database.");
    }
}



function getResultsFromQuery($dbcon, $cname) {
    $query = "
        SELECT
            fc.id AS id,
            fc.file_title AS title,
            fc.file_name AS imgfile,
            fc.file_description AS `desc`,
            COALESCE(SUM(IF(l.liked <> 0, 1, 0)), 0) AS likes_count,
            GROUP_CONCAT(DISTINCT l.user_id) AS id_liked,
            COALESCE(COUNT(c.comment), 0) AS comment_count
        FROM
            files_catalogue fc
        LEFT JOIN
            likes l ON fc.id = l.file_id
        LEFT JOIN
            comments c ON fc.id = c.file_id
        WHERE
            fc.file_category = '".$cname."'
        GROUP BY
            fc.id
    ";
    
    return $dbcon->query($query);
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