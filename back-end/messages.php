<?php
 ob_start();
 require_once('connection.php');
 ob_end_clean();
 include 'encrypt.php';

$req = $_GET['req'];
$role = $_GET['role'];
// Query for the last message in chat

if($req === 'new'){
    if($role=="user"){
        $query = mysqli_query($dbcon,  "SELECT messages.*, admin.*, message_count.mcount
        FROM (
            SELECT MAX(id) AS max_id, COUNT(*) AS mcount
            FROM messages
            WHERE received_status = 0 AND recipient_id = '". $_GET['id']."'
            GROUP BY sender_id
        ) AS message_count
        JOIN messages ON messages.id = message_count.max_id
        LEFT JOIN admin ON admin.userid = messages.sender_id
        ORDER BY messages.id DESC
        ");
    }else{
        $query = mysqli_query($dbcon,  "SELECT messages.*, users.*, message_count.mcount
        FROM (
            SELECT MAX(id) AS max_id, COUNT(*) AS mcount
            FROM messages
            WHERE received_status = 0 AND recipient_id = '". $_GET['id']."'
            GROUP BY sender_id
        ) AS message_count
        JOIN messages ON messages.id = message_count.max_id
        LEFT JOIN users ON users.userid = messages.sender_id
        ORDER BY messages.id DESC
        ");
    }
   
}else{
    if($role=="user"){
        $query = mysqli_query($dbcon,  "SELECT h.*, admin.*, sender_message_count.mcount
        FROM (
            SELECT admin.userid, MAX(messages.id) AS max_id
            FROM messages
            LEFT JOIN admin ON (admin.userid = messages.sender_id or admin.userid = messages.recipient_id) 
            WHERE (messages.sender_id != '". $_GET['id']."' AND recipient_id = '". $_GET['id']."')
                OR (messages.sender_id = '". $_GET['id']."' AND recipient_id != '". $_GET['id']."')
            GROUP BY admin.userid
        ) AS latest_messages
        JOIN messages AS h ON h.id = latest_messages.max_id
        LEFT JOIN admin ON (admin.userid = h.sender_id or admin.userid = h.recipient_id)
        LEFT JOIN (
            SELECT sender_id, COUNT(message) AS mcount
            FROM messages where received_status = '0' AND recipient_id = '". $_GET['id']."'
            GROUP BY sender_id
        ) AS sender_message_count ON sender_message_count.sender_id = h.sender_id
        ORDER BY h.id DESC
        "); 
    }else{
        $query = mysqli_query($dbcon,  "SELECT h.*, users.*, sender_message_count.mcount
        FROM (
            SELECT users.userid, MAX(messages.id) AS max_id
            FROM messages
            LEFT JOIN users ON (users.userid = messages.sender_id or users.userid = messages.recipient_id) 
            WHERE (messages.sender_id != '". $_GET['id']."' AND recipient_id = '". $_GET['id']."')
                OR (messages.sender_id = '". $_GET['id']."' AND recipient_id != '". $_GET['id']."')
            GROUP BY users.userid
        ) AS latest_messages
        JOIN messages AS h ON h.id = latest_messages.max_id
        LEFT JOIN users ON (users.userid = h.sender_id or users.userid = h.recipient_id)
        LEFT JOIN (
            SELECT sender_id, COUNT(message) AS mcount
            FROM messages where received_status = '0' AND recipient_id = '". $_GET['id']."'
            GROUP BY sender_id
        ) AS sender_message_count ON sender_message_count.sender_id = h.sender_id
        ORDER BY h.id DESC
        ");  
    }
  
}


$arr = array();
if(mysqli_num_rows($query)<1){
    $arr[] = array("msgcount" => "0","totalcount"=>"0");
    array_push($arr);
}else{
    while ($fetch = mysqli_fetch_assoc($query)) {

        if($fetch['message_type']!=="txtmsg"){
            $msg =  $fetch['message_type'];
            }else{
            $msg =$fetch['message'];
            }

        if ($fetch['sender_id'] == $_GET['id']) {
            $count = 0;
        }else{
            $count = $fetch["mcount"];
        }    

        $arr[] = array("msgcount" => $count === null ? "0" : $count, "sender" => $fetch["firstname"]." ".$fetch["lastname"], "main_msg" => $msg, "id" => encrypt($fetch["userid"]), "tmsg"=>$fetch["time_of_msg"],"totalcount"=>"");
        
    
    array_push($arr);
    } 
    $totalCount = 0;
foreach ($arr as &$item) {
    $totalCount += intval($item['msgcount']); // Convert to integer and sum the counts
    $item['totalcount'] = strval($totalCount); // Update the totalcount field as string
}
}



  

$myjson = json_encode($arr, JSON_UNESCAPED_SLASHES);

    
// Output the JSON response
header('Content-Type: application/json');
echo $myjson;
?>

