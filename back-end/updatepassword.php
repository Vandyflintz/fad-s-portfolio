<?php

ob_start();
require_once('connection.php');
ob_end_clean();
include 'encrypt.php';
require_once('return_messages.php');



if(isset($_POST['mode'])){
    $id =  $_POST["id"];
    $email = $_POST["email"];
    $mode = $_POST['mode'];
$checksql = mysqli_prepare($dbcon, "SELECT admin.userid as userid, admin.email_address FROM admin
WHERE userid = ? AND email_address = ?
UNION 
SELECT users.userid as userid, users.email_address FROM users
WHERE userid = ? AND email_address = ?");

mysqli_stmt_bind_param($checksql, "ssss",  $id, $email,  $id, $email );
mysqli_stmt_execute($checksql);
$checksqlresult = mysqli_stmt_get_result($checksql);

if (mysqli_num_rows($checksqlresult) < 1) {
    $message = "Credentials not found";
    echo returnMessage($message);
}else{
  
    
    if($mode=="resetpin"){
        $pin =  $_POST['pin'];
        $updatestmt2 = $dbcon->prepare("UPDATE admin SET pin = ? WHERE userid = ?");
        $updatestmt2->bind_param("ss", $pin, $id);
        $updatestmt2->execute();
        
        $updatestmt3 = $dbcon->prepare("UPDATE users SET pin = ?  WHERE userid = ?");
        $updatestmt3->bind_param("ss", $pin,  $id);
        $updatestmt3->execute();
        
        // Check if all queries affected at least one row
        $total_affected_rows = $updatestmt2->affected_rows + $updatestmt3->affected_rows;
        if ($total_affected_rows < 1) {
            // Print an error message
            $message =  "Error: No rows were updated.";
            echo returnMessage($message);
        } else {
            // Print a success message
            $arr = array();
            $userid = encrypt($id); 
            $arr[] = array("message" => "operation was successful", "id" => $userid);
            array_push($arr);
            echo json_encode($arr, JSON_UNESCAPED_SLASHES);
        }
    }
    
    if($mode=="resetpassword"){
        $newpassword =  $_POST["pass"];
        $updatestmt2 = $dbcon->prepare("UPDATE admin SET password = ? WHERE userid = ?");
        $updatestmt2->bind_param("ss", $newpassword, $id);
        $updatestmt2->execute();
        
        $updatestmt3 = $dbcon->prepare("UPDATE users SET password = ?  WHERE userid = ?");
        $updatestmt3->bind_param("ss", $newpassword,  $id);
        $updatestmt3->execute();
        
        // Check if all queries affected at least one row
        $total_affected_rows =  $updatestmt2->affected_rows + $updatestmt3->affected_rows;
        if ($total_affected_rows < 1) {
            // Print an error message
            $message =  "Error: No rows were updated.";
            echo returnMessage($message);
        } else {
            // Print a success message
            $message = "operation was successful";
            echo returnMessage($message);
        }
    }  
}

}


?>