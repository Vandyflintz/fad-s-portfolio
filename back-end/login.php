<?php

ob_start();
require_once('connection.php');
ob_end_clean();
include 'encrypt.php';
$ddata = json_decode(file_get_contents('php://input'), true);
$encdata = json_encode($ddata);
$myArray = json_decode(json_encode($encdata), true);

$newarray = json_decode($myArray, true);
$user =  $ddata["payload"]["user"];
$password = $ddata["payload"]['pass'];



$adminsql = mysqli_prepare($dbcon, "SELECT * FROM `admin` WHERE `email_address` = ? AND `password` = ?");
mysqli_stmt_bind_param($adminsql, "ss", $user, $password);
mysqli_stmt_execute($adminsql);
$adminresult = mysqli_stmt_get_result($adminsql);



$usersql = mysqli_prepare($dbcon, "SELECT * FROM `users` WHERE `email_address` = ? AND `password` = ?");
mysqli_stmt_bind_param($usersql, "ss", $user, $password);
mysqli_stmt_execute($usersql);
$userresult = mysqli_stmt_get_result($usersql);

if (mysqli_num_rows($adminresult) < 1) {
    if (mysqli_num_rows($userresult) < 1) {
        $arr = array();
        $arr[] = array("message" => "operation failed");
        array_push($arr);
        echo json_encode($arr, JSON_UNESCAPED_SLASHES);
    }else{
        $checkonline = mysqli_query($dbcon, "SELECT * FROM `user_online` WHERE `userid` = '".$user."'");

        if(mysqli_num_rows($checkonline)<1){
            $status="online";
            $oquery = mysqli_query($dbcon, "INSERT INTO `user_online`(`userid`, `online_status`) VALUES ('".$user."','".$status."')"); 
            
        }
        $arr = array();
        while ($fetch = mysqli_fetch_assoc($userresult)) {
         
            $arr[] = array("username" =>  $fetch['firstname'] . " " . $fetch['lastname'], "password" => encrypt($fetch['password']), "pin" => encrypt($fetch['pin']), "image" => $fetch['image'], "userid" => encrypt($fetch['userid']), "generalrole" => $fetch['role'],  "message" => "operation was successful",  "pl"=>strlen($fetch['pin']));
            array_push($arr);
        }
        $myjson = json_encode($arr, JSON_UNESCAPED_SLASHES);

        echo $myjson;
    }

} else {
    $arr = array();
    while ($fetch = mysqli_fetch_assoc($adminresult)) {
       
        $arr[] = array("username" => $fetch['firstname'] . " " . $fetch['lastname'], "password" => encrypt($fetch['password']), "pin" => encrypt($fetch['pin']), "image" => $fetch['image'], "userid" => encrypt($fetch['userid']), "generalrole" => $fetch['role'],  "message" => "operation was successful",  "pl"=>strlen($fetch['pin']));
        array_push($arr);
    }
    $myjson = json_encode($arr, JSON_UNESCAPED_SLASHES);

    echo $myjson;
}   





?>