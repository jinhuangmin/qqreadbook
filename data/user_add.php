<?php
header('Content-Type:application/json');
@$n=$_REQUEST['uname']or die('{"code":2,"msg":"uname required"}');
@$p=$_REQUEST['upwd']or die('{"code":3,"msg":"upwd required"}');
require('init.php');
$sql="INSERT INTO read_user VALUES(NULL,'$n','$p')";
$result=mysqli_query($conn,$sql);
if($result===false){
    $output['code']=5;
    $output['msg']='insert err';
    $output['sql']=$sql;
}else{
   $output['code']=1;
   $output['userId']=mysqli_insert_id($conn);
}
echo json_encode($output);