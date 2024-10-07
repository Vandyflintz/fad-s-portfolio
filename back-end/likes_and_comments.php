<?php

error_reporting(E_ALL);

ob_start();
require_once('connection.php');
ob_end_clean();
include 'encrypt.php';
require_once('return_messages.php');


$request = $_POST['request'];

if($request == "unlike") {
    $fileid = $_POST['id'];
    $user = decrypt($_POST['user']);
    $updatestmt = $dbcon->prepare("UPDATE `likes` SET `liked`= 0 WHERE `user_id` = ? and `file_id` = ?");

    $updatestmt->bind_param("ss", $user, $fileid);
    $updatestmt->execute();
}

if($request == "like") {
    $fileid = $_POST['id'];
    $user = decrypt($_POST['user']);
    $count = "1";

// Check if the row exists
$checkStmt = $dbcon->prepare("SELECT `liked` FROM `likes` WHERE `user_id` = ? AND `file_id` = ?");
$checkStmt->bind_param("ss", $user, $fileid);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
    // Row exists, update the liked field
    $row = $checkResult->fetch_assoc();
    $currentLikedValue = $row['liked'];
    $newLikedValue = ($currentLikedValue == 1) ? 0 : 1;

    $updateStmt = $dbcon->prepare("UPDATE `likes` SET `liked` = ? WHERE `user_id` = ? AND `file_id` = ?");
    $updateStmt->bind_param("sss", $newLikedValue, $user, $fileid);
    $updateStmt->execute();
} else {
    // Row doesn't exist, insert a new row
    $count = "1";
    $insertStmt = $dbcon->prepare("INSERT INTO `likes` (`user_id`, `file_id`, `liked`) VALUES (?, ?, ?)");
    $insertStmt->bind_param("sss", $user, $fileid, $count);
    $insertStmt->execute();
}

$checkStmt->close();
$updateStmt->close();
$insertStmt->close();

}

if($request == "new_comment") {
    $fileid = $_POST['id'];
    $user = decrypt($_POST['user']);
    $comment = $_POST['comment'];
    $stmt = $dbcon->prepare("INSERT INTO `comments`( `file_id`, `user_id`, `comment`) VALUES (?,?,?)");

    // Bind the parameters
    $stmt->bind_param("sss", $fileid, $user, $comment);

    // Execute the prepared statement
    if ($stmt->execute()) {
        echo returnMessage("Operation was successful.");

    } else {
        echo returnMessage("Error : " . mysqli_error($dbcon));
    }
}

if($request == "fetch_comments") {
    $fileid = $_POST['id'];
    $Data = array();
    $stmt = $dbcon->prepare("SELECT 
    comments.comment,
    comments.comment_date,
    user_data.firstname,
    user_data.lastname,
    user_data.image,
    comments.user_id
FROM 
    comments
LEFT JOIN (
    SELECT 
        userid,
        firstname,
        lastname,
        image
    FROM 
        users
    UNION
    SELECT 
        userid,
        firstname,
        lastname,
        image
    FROM 
        admin
) AS user_data ON user_data.userid = comments.user_id where comments.file_id = ?
");

    $stmt->bind_param("s", $fileid);
    $stmt->execute();

    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        foreach ($row as $key => $value) {
            if ($value === null) {
                $row[$key] = "";
            }
        }
        $row["user_id"] = encrypt($row["user_id"]);
        $Data[] = $row;
    }
    $result = array(
        "commentData" => $Data
    );

    // Convert the PHP array to JSON and render the output.
    $myjson = json_encode($result, JSON_UNESCAPED_SLASHES);
    header('Content-Type: application/json');
    echo $myjson;

    $stmt->close();

}
