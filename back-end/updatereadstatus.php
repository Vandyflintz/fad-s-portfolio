<?php
 ob_start();
 require_once('connection.php');
 ob_end_clean();
 include 'encrypt.php';


$checkQuery = "SELECT * FROM `messages` WHERE `sent_status` = '1' AND `received_status` = '0' AND `sender_id` = ? AND `recipient_id` = ?";
$checkStmt = $dbcon->prepare($checkQuery);

if ($checkStmt) {
    // Bind the parameters
    $checkStmt->bind_param("ss", $senderId, $recipientId);

    // Set the parameter values
    $senderId = decrypt($_GET['rec']);
    $recipientId = decrypt($_GET['id']);

    // Execute the statement
    $checkStmt->execute();

    // Store the result
    $checkResult = $checkStmt->get_result();

    // Check if there is a row that meets the conditions
    if ($checkResult->num_rows > 0) {
        // Update the row
        $updateQuery = "UPDATE `messages` SET `received_status` = ? WHERE `sender_id` = ? AND `recipient_id` = ?";
        $updateStmt = $dbcon->prepare($updateQuery);

        if ($updateStmt) {
            // Bind the parameters
            $updateStmt->bind_param("sss", $receivedStatus, $senderId, $recipientId);

            // Set the parameter values
            $receivedStatus = "1";

            // Execute the statement
            $updateResult = $updateStmt->execute();

            // Check if the update query was successful
            if ($updateResult) {
                echo "Operation was successful.";
            } else {
                echo "Error : Update query execution failed.";
            }

            // Close the update statement
            $updateStmt->close();
        } else {
            echo "Error : Update statement preparation failed.";
        }
    } else {
        echo "Operation was successful.";
    }

    // Close the check statement
    $checkStmt->close();
} else {
    echo "Error : Check statement preparation failed.";
}

// Close the database connection
$dbcon->close();
?>


