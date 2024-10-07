<?php
$allowedReferers = array(
    'http://www.emkapp.com/fad_s_portfolio/pages/index.html',
    'http://172.20.10.4/fad_s_portfolio/front-end/index.html',
    'http://www.emkapp.com/fad_s_portfolio/pages/',
	'http://www.emkapp.com/fad_s_portfolio/pages/dashboard.html'
);

if ($_SERVER['SCRIPT_FILENAME'] === __FILE__ || !isset($_SERVER['HTTP_REFERER']) || !in_array($_SERVER['HTTP_REFERER'], $allowedReferers)) {
    header('HTTP/1.0 403 Forbidden');
    exit;
}
require_once "vendor/autoload.php";
require_once "vendor/james-heinrich/getid3/getid3/getid3.php";
//use getid3\getid3;

$getID3 = new getID3();

$file = $_FILES['file']['tmp_name'];
$allowedExtensions = [
    'jpg', 'jpeg', 'png', 'gif', // Image extensions
    'mp4', 'avi', 'mov', // Video extensions
    'mp3', 'wav', 'ogg', // Audio extensions
    'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt', 'rtf' // Document extensions
];
$filename = $_FILES['file']['name'];
$extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

// Validate file extension and MIME type
if (!in_array($extension, $allowedExtensions)) {
    echo "Invalid file - extension - ".$extension;
    unlink($file);
   exit;
} else {

    $validMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        // Image MIME types
        'video/mp4',
        'video/x-msvideo',
        'video/quicktime',
        // Video MIME types
        'audio/mpeg',
        'audio/wav',
        'audio/ogg',
        // Audio MIME types
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        // Document MIME types
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        // PowerPoint MIME types
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        // Excel MIME types
        'text/plain',
        // Text MIME types
        'text/rtf' // RTF MIME types
    ];

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    //var_dump($finfo);
    //$mime = mime_content_type($file);
    $mime = finfo_file($finfo, $file); 
    finfo_close($finfo);
   
        if (!in_array($mime, $validMimeTypes)) {
            echo "Invalid file - ".$mime;
            exit;
        } else {
    
            // Perform content analysis based on file type
            if (in_array($extension, ['jpg', 'png', 'gif', 'jpeg'])) {
                // Image content analysis
                $imageInfo = getimagesize($file);
                $width = $imageInfo[0];
                $height = $imageInfo[1];
                $imageSize = filesize($file);
    
                // Perform image-specific checks
                // Example: Check image dimensions, file size, etc.
                // Add your custom checks here
    
                echo "Image file is valid";
            } elseif (in_array($extension, ['mp4', 'avi', 'mov'])) {
                // Video content analysis
                $videoInfo = $getID3->analyze($file);
                $duration = $videoInfo['playtime_string'];
                $videoSize = filesize($file);
    
                // Perform video-specific checks
                // Example: Check video duration, file size, etc.
                // Add your custom checks here
    
                echo "Video file is valid";
            } elseif (in_array($extension, ['mp3', 'mp4', 'wav', 'ogg'])) {
                // Audio content analysis
                $audioInfo = $getID3->analyze($file);
                $duration = $audioInfo['playtime_string'];
                $audioSize = filesize($file);
    
                // Perform audio-specific checks
                // Example: Check audio duration, file size, etc.
                // Add your custom checks here
    
                echo "Audio file is valid";
            } elseif (in_array($extension, ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt', 'rtf'])) {
                // Document content analysis
                $documentSize = filesize($file);
    
                // Perform document-specific checks
                // Example: Check document file size, etc.
                // Add your custom checks here
    
                echo "Document file is valid";
            } else {
                // Unsupported file type
                echo "Invalid file type - ".$extension;
            }
        }
        unlink($file);
    }

    

?>
