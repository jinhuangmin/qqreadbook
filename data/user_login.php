<?php
/**
*接收客户端提交的uname和upwd，执行数据库验证，返回 {"code":1, "uname":"qiangdong", "uid":10} 或 {"code":2, "msg":"用户名或密码错误" }
*/
header('Content-Type: application/json;charset=UTF-8');

@$n = $_REQUEST['uname'] or die('{"code":3, "msg":"uname required"}');
@$p = $_REQUEST['upwd'] or die('{"code":4, "msg":"upwd required"}');

require('1_init.php');
$sql = "SELECT * FROM read_user WHERE uname='$n' AND upwd='$p'";
$result = mysqli_query($conn,$sql);
//此处省略了$result为false的判断

$row = mysqli_fetch_assoc($result);
if($row===null){		//查询结果集中没有记录
  $output=['code'=>2,'msg'=>'用户名或密码错误'];
}else {  //查询结果集中有数据,验证成功
  $output = ['code'=>1,'uname'=>$n,'uid'=>$row['uid']];
}
echo json_encode( $output );