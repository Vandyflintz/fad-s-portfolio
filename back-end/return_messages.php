<?php
function returnMessage($msg)
{
    $arr = array();
    $arr[] = array("message" => $msg);
    array_push($arr);
    return json_encode($arr, JSON_UNESCAPED_SLASHES);
}

?>