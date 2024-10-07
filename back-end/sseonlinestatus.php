<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

ob_start();
require_once('connection.php');
ob_end_clean();
include 'encrypt.php';

$messages = array();
// Retrieve user's online status or last seen status from the database
function getUserStatus() {
    $id = decrypt($_GET['id']);
    $url = "http://www.emkapp.com/fad_s_portfolio/back-end/useronlinestatus.php?id=". urlencode($id);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

$messages = getUserStatus();

echo "data: " . json_encode($messages) . "\n\n";
  ob_flush();
  flush();

// Set the initial timeout for long-polling
$timeout = 30;

// Start the long-polling loop
while ($timeout > 0) {
  
    

    // Retrieve user's status
    $status = getUserStatus();

if (!empty($status)) {
    $messages[] = $status;
    echo "data: " . json_encode($status) . "\n\n";
      ob_flush();
     flush();
}




  // Sleep for 1 second before checking for new messages again
  sleep(1);
  $timeout--;
}

// Send a comment line to keep the connection alive
echo ": ping\n\n";
ob_flush();
flush();

?>
