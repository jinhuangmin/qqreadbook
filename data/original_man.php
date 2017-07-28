<?php
header('Content-Type:application/json;charset=UTF-8');
require('init.php');
$sql="SELECT * FROM original_man";
$result=mysqli_query($conn,$sql);
$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($list);