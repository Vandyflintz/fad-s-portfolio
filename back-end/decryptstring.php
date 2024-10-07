<?php
//$input = '{"payload":{"userinput":"1234","userid":"dd2023hmsadmin","operation":"checkpin"}}';
include 'encrypt.php';
//$ddata = json_decode($input, true);
$ddata = json_decode(file_get_contents('php://input'), true);
$userid = $_POST["userid"];
$userval = $_POST["userinput"];
$useroperation = $_POST["operation"];
//echo decrypt($userid);
function decryptval  ($clientval , $clientid, $operation){
    ob_start();
    require_once('connection.php');
    ob_end_clean();
   
    $message = "";
    $id = decrypt($clientid);
// Prepare statement for main_admins table
$adminsql = mysqli_prepare($dbcon, "SELECT * FROM `admin` WHERE `userid` = ?");
mysqli_stmt_bind_param($adminsql, "s", $id);
mysqli_stmt_execute($adminsql);
$adminresult = mysqli_stmt_get_result($adminsql);
  // print_r($adminresult);
// Prepare statement for user_data table
$usersql = mysqli_prepare($dbcon, "SELECT * FROM `users` WHERE `userid` = ?");
mysqli_stmt_bind_param($usersql, "s", $id);
mysqli_stmt_execute($usersql);
$userresult = mysqli_stmt_get_result($usersql);



if(mysqli_num_rows($adminresult)>0){
        //echo "records found";
        while ($fetch = mysqli_fetch_assoc($adminresult)) {
            $spassword = $fetch['password'];
            $spin = $fetch['pin'];
           
            if($operation=="checkpin"){
                if($clientval === $spin){
                    $message = "match found";
            }else{
                    $message = "match not found";
            }  
            }
            if($operation=="checkpassword"){
                if($clientval === $spassword){
                    $message = "match found";
            }else{
                    $message = "match not found";
            }  
            }
        }

}else if(mysqli_num_rows($userresult)>0){
        while ($fetch = mysqli_fetch_assoc($userresult)) {
             
        $spassword = $fetch['password'];
            $spin = $fetch['pin'];
            if($operation=="checkpin"){
                if($clientval === $spin){
                    $message = "match found";
            }else{
                    $message = "match not found";
            }  
            }
            if($operation=="checkpassword"){
                if($clientval === $spassword){
                    $message = "match found";
            }else{
                    $message = "match not found";
            }  
            }
        }

}


// Close the statements and free up memory
mysqli_stmt_close($adminsql);
mysqli_stmt_close($usersql);
 
$arr[] = array("message" => $message);
array_push($arr);
    return json_encode($arr, JSON_UNESCAPED_SLASHES);
}

echo decryptval($userval, $userid, $useroperation);



?>