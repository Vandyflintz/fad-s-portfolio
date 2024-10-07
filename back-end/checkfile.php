<?php
// Retrieve the requested file name from the query parameter
$requestedFileName = $_GET['filename'];

// Specify the actual file path on the server
$filePath = "http://www.emkapp.com/fad_s_portfolio/back-end/chat_media/documents/".$_GET['original_file'];

// Set appropriate headers for file download
//header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="' . $requestedFileName . '"');

// Read and output the file content
readfile($filePath);
?>