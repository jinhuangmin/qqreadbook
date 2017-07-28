<?php
/*
通用php页面，由其他功能页面调用
*/
header('Content-Type:application/json;charset=UTF-8');
#$conn=mysqli_connect('127.0.0.1','root','','readbook',3306);
$conn=mysqli_connect(SAE_MYSQL_HOST_M,SAE_MYSQL_USER,SAE_MYSQL_PASS,SAE_MYSQL_DB,SAE_MYSQL_PORT);
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);

$output=[];

