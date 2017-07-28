/*是否勾选同意的按钮变化*/

/*同意相关协议*/
$("form>:checkbox").click(function () {
  if ($(this).prop("checked")) {
    $("form>:disabled").prop(
      "disabled", false);
    $(this).siblings(":button").css("background", "#69B946");
  } else {
    $(this).siblings(":button").prop(
      "disabled", true).css("background", "#ddd");
  }
});

/**注册方式的切换**/
$(".nav_box").click(function (e) {
  e.preventDefault();
  $(this).addClass("cur");
  $(this).children(".dt").removeClass("nav");
  var msg = $(this).children(".dt").html();
  $("#renum").html("注册" + msg);
  $(this).siblings(".nav_box").removeClass("cur")
    .children(".dt").addClass("nav");
});

/*提交数据*/


// $('#btnre').click(function () {
//   var data = $('#form-register').serialize();
//   $.ajax({
//     type: "POST",
//     url: 'data/user_add.php',
//     data: data,
//     success: function (result) {
//       if (result.code === 1) {
//         alert("注册成功！3秒钟后调整到登录页面");
//         setTimeout(function () {
//           location.href = 'index1.html';
//         }, 3000);
//       } else {
//         alert('注册失败' + result.msg);
//       }
//     },
//     error: function () {
//       alert('响应消息有问题');
//     }
//   });
// });

$(function(){
var uname,phone,upwd;
//失去焦点时
$('#uname').blur(unameCheck);
$('#phone').blur(phoneCheck);
$('#upwd').blur(upwdCheck);
$('#upwd2').blur(upwd2Check);
//提交注册时
$('#register').click(function(){
  var reuname=unameCheck();
  var rephone=phoneCheck();
  var reupwd=upwdCheck();
  var reupwd2=upwd2Check();
  console.log(reuname&&rephone&&reupwd&&reupwd2);
  if(reuname&&rephone&&reupwd&&reupwd2){
    $.ajax({
      type:'post',
      url:'data/user_register.php',
      data:{uname:uname,phone:phone,upwd:upwd},
      success:function(d){
        console.log(d);
        if(d.code==1){
          sessionStorage.uid=d.uid;
          sessionStorage.uname=d.uname;
          alert('恭喜您注册成功！即将为您返回到注册前的页面！')
          history.go(-1);
        }

      }
    });
  }
});
function unameCheck(){
  uname=$.trim($('#uname').val());
  var $unameSpan=$('#uname').next('span');
  var regEmail=/^\w+@\w+\.\w+(\.\w+)?$/;
  if(!uname){//为空
    $unameSpan.show().attr('class','error-block');
    $unameSpan.show().text('用户名不能为空');
    return false;
  }else if(!regEmail.test(uname)){//格式不正确
    $unameSpan.show().attr('class','error-block');
    $unameSpan.show().text('请输入正确的邮箱格式');
    return false;
  }else if(unameExist()){//已被注册
    $unameSpan.show().attr('class','error-block');
    $unameSpan.show().text('该邮箱已被其他用户注册');
    return false;
  }else{
    $unameSpan.hide();
    return true;
  }
}
//验证邮箱是否被注册
function unameExist(){
  var back;
  $.ajax({
    type:'post',
    url:'data/user_check_uname.php',
    data:{uname:uname},
    async:false,
    success:function(d){
      //console.log(d);
      if(d.code==1){
        back=true;
      }else{
        back=false;
      }
    }
  });
  return back;
}
//手机号验证
  function phoneCheck(){
    phone=$.trim($('#phone').val());

    var $phoneSpan=$('#phone').next('span');
    var regPhone=/^1[3578]\d{9}$/;
    if(!phone){//为空
      $phoneSpan.show().attr('class','error-block');
      $phoneSpan.show().text('手机号不能为空');
      return false;
    }else if(!regPhone.test(phone)){//格式不正确
      $phoneSpan.show().attr('class','error-block');
      $phoneSpan.show().text('请输入正确的手机号格式');
      return false;
    }else if(phoneExist()){//已被注册
      $phoneSpan.show().attr('class','error-block');
      $phoneSpan.show().text('该手机号已被其他用户绑定');
      return false;
    }else{
      $phoneSpan.hide();
      return true;
    }
  }
  //验证手机号是否被注册
  function phoneExist(){
    var back;
    $.ajax({
      type:'post',
      url:'data/user_check_phone.php',
      data:{phone:phone},
      async:false,
      success:function(d){
        //console.log(d);
        if(d.code==1){
          back=true;
        }else{
          back=false;
        }
      }
    });
    return back;
  }

  //验证密码
  function upwdCheck(){
    upwd=$.trim($('#upwd').val());
    var $upwdSpan=$('#upwd').next('span');
    if(!upwd){//为空
      $upwdSpan.show().attr('class','error-block');
      $upwdSpan.show().text('密码不能为空');
      return false;
    }else if(upwd.length<6||upwd.length>12){//格式不正确
      $upwdSpan.show().attr('class','error-block');
      $upwdSpan.show().text('密码长度应为6~12位');
      return false;
    }else{
      $upwdSpan.hide();
      return true;
    }
  }
  //验证重复密码
  function upwd2Check(){
    var upwd2=$.trim($('#upwd2').val());
    var $upwd2Span=$('#upwd2').next('span');
    if(!upwd2){//为空
      $upwd2Span.show().attr('class','error-block');
      $upwd2Span.show().text('密码不能为空');
      return false;
    }else if(upwd2.length<6||upwd2.length>12){//格式不正确
      $upwd2Span.show().attr('class','error-block');
      $upwd2Span.show().text('密码长度应为6~12位');
      return false;
    }else if(upwd2!=upwd){
      $upwd2Span.show().attr('class','error-block');
      $upwd2Span.show().text('两次密码不一致');
      return false;
    }else{
      $upwd2Span.show().attr('class','error-block');
      $upwd2Span.hide();
      return true;
    }
  }

});
