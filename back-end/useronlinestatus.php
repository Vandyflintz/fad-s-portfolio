<?php
ob_start();
require_once('connection.php');
ob_end_clean();

$id = $_GET['id'];

$sql = mysqli_prepare($dbcon, "SELECT * FROM `user_online` WHERE `userid` = ?");
mysqli_stmt_bind_param($sql, "s", $id);
mysqli_stmt_execute($sql);
$result = mysqli_stmt_get_result($sql);

$arr = array();
while ($fetch = mysqli_fetch_assoc($result)) {
    $arr[] = array("status" => $fetch['online_status']);
    array_push($arr);
}
$myjson = json_encode($arr, JSON_UNESCAPED_SLASHES);

            echo $myjson;


?>