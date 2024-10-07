<?php
error_reporting(E_ALL);

ob_start();
require_once('connection.php');
ob_end_clean();
include 'encrypt.php';
require_once('return_messages.php');


if(isset($_GET['req'])){
    if($_GET['req'] == "checkadmin") {
        $id = decrypt($_GET['id']);
        $adminsql = mysqli_prepare($dbcon, "SELECT * FROM `admin` where `userid` = ?");
        $adminsql->bind_param("s", $id);
        mysqli_stmt_execute($adminsql);
        $adminresult = mysqli_stmt_get_result($adminsql);
    
        if (mysqli_num_rows($adminresult) < 1) {
            $message = "negative";
            echo json_encode($message);
        } else {
            $message = "positive";
            echo json_encode($message);
        }
    
    }
}

if(isset($_POST['mode'])){

    $mode = $_POST['mode'];

    if($mode == "fetchadmins") {

        $adminsql = mysqli_prepare($dbcon, "SELECT * FROM `admin`");
        mysqli_stmt_execute($adminsql);
        $adminresult = mysqli_stmt_get_result($adminsql);

        if (mysqli_num_rows($adminresult) < 1) {
            $message = "no records found";
            echo returnMessage($message);
        } else {
            $message = "records are available";
            $arr = array();

            while ($fetch = mysqli_fetch_assoc($adminresult)) {
                $arr[] = array("firstname" => $fetch["firstname"], "lastname" => $fetch["lastname"],  "image" => $fetch["image"], "email_address" => $fetch["email_address"],"userid" => $fetch["userid"] ,"password" => $fetch["password"],"pin" => $fetch["pin"] , "message" => $message);
                array_push($arr);
            }
            $myjson = json_encode($arr, JSON_UNESCAPED_SLASHES);

            echo $myjson;
        }

    }



    if ($mode == "fetchusers") {
        $usersql = mysqli_prepare($dbcon, "SELECT * FROM `users`");
        mysqli_stmt_execute($usersql);
        $userresult = mysqli_stmt_get_result($usersql);

        if (mysqli_num_rows($userresult) < 1) {
            $message = "no records found";
            echo returnMessage($message);
        } else {
            $message = "records are available";
            $arr = array();

            while ($fetch = mysqli_fetch_assoc($userresult)) {
                $arr[] = array("firstname" => $fetch["firstname"], "lastname" => $fetch["lastname"],  "image" => $fetch["image"], "email_address" => $fetch["email_address"],"userid" => $fetch["userid"] ,"contact_num" => $fetch["contact"] , "message" => $message);
                array_push($arr);
            }
            $myjson = json_encode($arr, JSON_UNESCAPED_SLASHES);

            echo $myjson;
        }
    }

    if ($mode == "deleteadmin") {
        $givenId = $_POST['id'];
        $deleteQuery = "DELETE FROM admin WHERE userid = ?";
        $deleteStatement = $dbcon->prepare($deleteQuery);
        $deleteStatement->bind_param("s", $givenId);
        $deleteStatement->execute();

        if ($deleteStatement->errno) {
            echo returnMessage("Error : ".$deleteStatement->error);
        } else {
            echo returnMessage("operation was successful");
        }
    }

}
?>