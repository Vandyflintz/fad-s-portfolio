<?php


$dbcon=mysqli_connect("localhost","u903237695_root_fad","Christabel@02","u903237695_fad_portfolio");  

if($dbcon){
echo "connected";
}else{
    echo "error";
}

?>