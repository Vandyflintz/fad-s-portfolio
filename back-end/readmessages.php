<?php

ob_start();
require_once('connection.php');
ob_end_clean();
include 'encrypt.php';
if(isset($_GET['som'])){
    $id = decrypt($_GET['id']);
    $rec = decrypt($_GET['rec']);
}else{
    $id = $_GET['id'];
    $rec = $_GET['rec'];
}



$imgdir = "chat_media/pics/";
$audiodir = "chat_media/audio/";
$docdir = "chat_media/documents/";
$viddir = "chat_media/video/";

function formatbytes($bytes)
{
    if($bytes >= 1073741824) {
        $bytes = round($bytes/ 1073741824). ' GB';
    } elseif($bytes >= 1048576) {
        $bytes = round($bytes/ 1048576). ' MB';
    } elseif($bytes >= 1024) {
        $bytes = round($bytes/ 1024). ' KB';
    } elseif($bytes < 1024) {
        $bytes = $bytes. ' B';
    }

    return $bytes;
}


function getFileSize($mtype, $fmsg)
{
    $imgdir = "chat_media/pics/";
    $audiodir = "chat_media/audio/";
    $docdir = "chat_media/documents/";
    $viddir = "chat_media/video/";
    $fsize = "";
    if($mtype == "image") {
        $file = $imgdir.$fmsg;
        $filesize = filesize($file);
        $fsize = formatbytes($filesize);
    } elseif($mtype == "audio") {
        $file = $audiodir.$fmsg;
        $filesize = filesize($file);
        $fsize = formatbytes($filesize);
    }elseif($mtype == "video") {
        $file = $viddir.$fmsg;
        $filesize = filesize($file);
        $fsize = formatbytes($filesize);
    }
     elseif($mtype == "document") {
        $file = $docdir.$fmsg;
        $filesize = filesize($file);
        $fsize = formatbytes($filesize);
    } else {
        $fsize = "";
    }
    return $fsize;
}
 function getFilePath($mtype, $fmsg){
    $imgdir = "chat_media/pics/";
    $audiodir = "chat_media/audio/";
    $docdir = "chat_media/documents/";
    $viddir = "chat_media/video/";
    $pref = "http://www.emkapp.com/fad_s_portfolio/back-end/";
    if($mtype == "image") {
        $file = $pref . $imgdir . $fmsg;
    } elseif($mtype == "audio") {
        $file = $pref . $audiodir.$fmsg;
    }elseif($mtype == "video") {
        $file = $pref . $viddir.$fmsg;
    }
     elseif($mtype == "document") {
        $file = $pref . $docdir.$fmsg;
    } else {
        $file = "";
    }
    return $file;
 }

//
$query = mysqli_query($dbcon, "SELECT
main.*, main.time_of_msg AS maintime, main.id AS rowid, main.parent_id AS pid,
reply.message_type AS `reply-mtype`, reply.time_of_msg AS `reply-mtime`,
reply.sender_id AS `reply-sender`, users.*, reply.message AS `reply-message`, reply.modified_message AS `reply-modified-message`
FROM
messages main
LEFT JOIN
messages reply ON main.parent_id = reply.id
LEFT JOIN `users` ON (
users.userid = main.sender_id
OR users.userid = reply.recipient_id
OR users.userid = reply.sender_id
OR users.userid = main.recipient_id
)
where (main.sender_id = '".$id."' AND main.recipient_id = '".$rec."')
OR (main.sender_id = '".$rec."' AND main.recipient_id = '".$id."')
ORDER BY
main.time_of_msg;");

$arr = array();
while($fetch = mysqli_fetch_assoc($query)) {
    $sen = encrypt($fetch['sender_id']);
    $rec = $fetch['recipient_id'];
    $time = $fetch['time_of_msg'];
    $messtype = $fetch['message_type'];
    //if(!empty($fetch['modified_message'])){
       // $msg = $fetch['modified_message'];
    //}else{
    $msg = $fetch['message'];
   //}
    $fsize = getFileSize($fetch['message_type'], $fetch['modified_message']);
    
    $mainfile = getFilePath($fetch['message_type'], $fetch['modified_message']);
    $subfile = getFilePath($fetch['reply-mtype'], $fetch['reply-modified-message']);
    $sfsize = getFileSize($fetch['reply-mtype'], $fetch['reply-modified-message']);

    $arr[] = array("message"=>$msg, "modified_message"=>$fetch["modified_message"], "mtime"=>$time,"sender"=>$sen, "sender_name" => $fetch["firstname"]." ".$fetch["lastname"],"message_type"=> $fetch['message_type'],"submessage"=> $fetch['submessage'],"fsize"=>$fsize,"mainfile"=> $mainfile , "sfsize"=>$sfsize, "subfile" => $subfile, "repmsg"=>$fetch['reply-message'] === null ? "" : $fetch['reply-message'], "reptime"=>$fetch['reply-mtime'] === null ? "" : $fetch['reply-mtime'] , "repsender"=>$fetch['reply-sender'] === null ? "" : $fetch['reply-sender'], "rowid"=> $fetch["rowid"], "reply_message_type"=> $fetch['reply-mtype'], "parent_id"=>$fetch["pid"]);
    array_push($arr);




}

$myjson = json_encode($arr, JSON_UNESCAPED_SLASHES);


// Output the JSON response
header('Content-Type: application/json');
echo $myjson;
