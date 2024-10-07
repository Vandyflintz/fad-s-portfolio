<?php
error_reporting(E_ALL);
include 'encrypt.php';
ini_set('display_errors', 1);
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

// Simulate a database or storage for messages
$messages = array();

// Function to retrieve new messages from your storage or database
function retrieveNewMessages() {
    $id = decrypt($_GET['id']);
    $req = $_GET['req'];
    if($req=="all" || $req=="new"){
      $url = "http://www.emkapp.com/fad_s_portfolio/back-end/messages.php?req=".$req."&id=" . rawurlencode($id)."&role=" . rawurlencode($_GET['role']);
    }else{
    $rec = $_GET['rec_id'];
    $url = "http://www.emkapp.com/fad_s_portfolio/back-end/readmessages.php?id=" . rawurlencode($id)."&rec=".rawurlencode($rec)."&role=" . rawurlencode($_GET['role']);
}
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

$messages = retrieveNewMessages();
// Send initial chat history
/*foreach ($messages as $message) {
  echo "data: " . json_encode($message) . "\n\n";
  ob_flush();
  flush();
}*/

echo "data: " . json_encode($messages) . "\n\n";
  ob_flush();
  flush();

// Set the initial timeout for long-polling
$timeout = 30;

// Start the long-polling loop
while ($timeout > 0) {
  // Check for new messages (you can replace this with actual message retrieval logic)
  $newMessages = retrieveNewMessages();

  if (!empty($newMessages)) {
   /* foreach ($newMessages as $message) {
      // Save message to the database or storage
      $messages[] = $message;
      
      // Broadcast the new message to connected clients
      echo "data: " . json_encode($message) . "\n\n";
      ob_flush();
     flush();
    }*/
    $messages[] = $newMessages;
    echo "data: " . json_encode($newMessages) . "\n\n";
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


// Function to retrieve new messages from your storage or database
?>