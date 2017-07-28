/*****轮播*****/
var imgs=[
  {"i":0,"img":"images/carousel_01.jpg"},
  {"i":1,"img":"images/carousel_02.jpg"},
  {"i":2,"img":"images/carousel_03.jpg"},
  {"i":3,"img":"images/carousel_04.jpg"},
  {"i":4,"img":"images/carousel_05.jpg"}, 
];
var adv={
  LIWIDTH:0,//每个li的宽度
  $ulImgs:null,//#imgs的ul
  INTERVAL:1000,//动画的时间间隔
  WAIT:3000,//自动轮播之间的等待
  timer:null,//自动轮播定时器的序号
  init(){
    //获得id为slider的元素的width转为浮点数保存在LIWIDTH属性中
    this.LIWIDTH=parseFloat(
      $("#banner").css("width")
    );
    //获得id为imgs的ul保存在$ulImages中
    this.$ulImgs=$("#imgs");
    this.updateView();//更新页面
    //为id为indexs的ul添加鼠标进入事件委托
      //要求: li元素可响应事件
    $("#indexs").on("mouseover","li",(e)=>{ 
      //用index检查当前li在indexs>li中的下标i保存在变量target
      var target=$("#indexs>li").index(e.target);
      //获得imgs数组中0位置的元素的i属性保存在old
      var old=imgs[0].i;
      this.move(target-old);//调用moveLeft
    });
    this.autoMove();//启动自动轮播
  },
  autoMove(){//启动自动轮播
    //启动一次性定时器,等待WAIT后,执行move(1),将序号保存在timer中
    this.timer=setTimeout(
      ()=>this.move(1),this.WAIT
    );
  },
  movePrev(n){//右移前的准备
    n*=-1;//将n*-1
    //删除imgs结尾的n个元素拼到开头
    imgs=imgs.splice(-n,n).concat(imgs)
    this.updateView();//更新界面
    //修改$ulImgs的left为left-n*LIWIDTH
    this.$ulImgs.css("left",
      parseFloat(this.$ulImgs.css("left"))
      -n*this.LIWIDTH
    );
  },
  move(n){
    clearTimeout(this.timer);//停止一次性定时器
    if(n<0){//如果右移:
      this.movePrev(n);//先准备
      this.$ulImgs.stop(true).animate(//再移动
        {left:0}, 
        this.INTERVAL, 
        ()=>this.autoMove()
      );
    }else{
      //停止$ulImgs上一切动画
      //让$ulImgs的left在INTERVAL时间内变到-n*LIWIDTH,动画接收后执行moveLeftCallback
      this.$ulImgs.stop(true).animate(//先移动
        {left:-n*this.LIWIDTH},
        this.INTERVAL,
        ()=>this.moveCallback(n)//再修改
      );
    }
  },
  moveCallback(n){//左移结束的回调函数
    //删除数组开头的n个元素拼接到结尾
    imgs=imgs.concat(imgs.splice(0,n));
    this.updateView();//更新页面
    //让$ulImgs的left归0
    this.$ulImgs.css("left",0);
    this.autoMove();//启动自动轮播
  },
  updateView(){//将imgs数组中的内容更新到页面
    //遍历imgs数组,同时声明空字符串lis,idxs
    for(var i=0,lis="",idxs="";
        i<imgs.length;
        i++){
      lis+=`<li><img src="${imgs[i].img}"></li>`
      idxs+="<li></li>"
    }
    //设置$ulImgs的内容为lis，继续设置宽为imgs数组的元素个数*LIWIDTH
    this.$ulImgs.html(lis).css(
      "width",imgs.length*this.LIWIDTH);
    //设置id为indexs的内容为idxs
    //设置id为indexs下的?位置的li的class为hover
      //其中?是imgs中0位置的元素的i属性值
    $("#indexs").html(idxs)
      .children(`li:eq(${imgs[0].i})`)
        .addClass("hover");
  }
}
adv.init();

/*查看详细内容*/
$(".bookinfor").hover(
	function(e){
		 e.preventDefault();	 
		 $(this).addClass("hide").removeClass("show").next().addClass("show");
			$(this).parent().siblings('li').children(".bookinfor")
				.addClass("show").removeClass("hide")
				.next().addClass("hide").removeClass("show");
	}
);
/*单击关闭事件*/
$("#close").click(
	function(e){
		e.preventDefault();
		$(this).parent().addClass("eclose");
	}
);
/**登录框的出现和隐藏设置**/

/*$("#user-enter").click(function(e){
	e.preventDefault();
	$(".modal").addClass("show1");
});*/
/*$("#user-enter").live("click",function(e){
e.preventDefault();
	$(".modal").addClass("show1");
});*/
$("#topright").on("click","#user-enter",function(e){
	e.preventDefault();
	$(".modal").addClass("show1");
});
$(".close").click(function(e){
	e.preventDefault();
	$(".modal").removeClass("show1");
});
$(".modal-dialog").one("mouseenter",function(){
	$(this).addClass("rotate");
});

/**登录的异步请求*/
$('#btn-enter').click(function(){
  //收集用户的输入，组成一个k=v&k=v形式字符串
  var data = $('#form-enter').serialize();
  //发起异步请求，进行服务器验证
  $.ajax({
    type: 'POST',
    url:'data/user_login.php',
    data: data,
    success: function(result){
      //console.log('响应完成且成功');
      //console.log(arguments);
      if(result.code!==1){  //登录验证失败
        //$('p.alert').html(result.msg);
		alert("用户名或密码错误");
        return;
      }
      /////登录验证成功/////
      $('.modal').hide();
      // loginUname = result.uname; //登录用户名
      // loginUid = result.uid;     //登录用户编号
      //把登录相关数据保存在客户端浏览器中，供后续页面使用
      sessionStorage['LoginName']=result.uname;
      sessionStorage['LoginUid']=result.uid;
      $('#user-enter').html('欢迎您：'+result.uname+'<a class="exit">退出</a>');
    },
    error: function(){ 
      alert('响应完成但有问题');
      console.log(arguments);
    }
  });
});
/*$("#topright").on('click','.exit',function(e){
	e.preventDefault();
	//sessionStorage['LoginName']='';
    //  sessionStorage['LoginUid']='';
	  var msg="登录";
	  $('#user-enter').html('登录');
});*/
$("#topright").on('click','.exit',function(e){
	e.preventDefault();
	sessionStorage['LoginName']='';
      sessionStorage['LoginUid']='';
	   location.reload();
});

/*上升锚点*/
document.addEventListener('scroll',
		function(){
			var scrollTop=document.body.scrollTop;
			document.getElementById("box")
					.style.bottom=
					scrollTop>600?"50px":"1000px";
			
			 
			}
		);	
/******正方形放回顶部样式设计*******/
$("#menu ul li a").click(
	function(e){
		 e.preventDefault();
		$(this).parent().addClass("menu-target")
				.siblings('.menu-target').removeClass('menu-target');
	}
);
$("#box").hover(function(){
$("#aaa1").css("transform","translatez(20px)");
$("#aaa2").css("transform","rotatey(90deg) translatez(20px)");
$('#aaa4').css("transform","translatez(-20px)");
$("#aaa5").css("transform","rotatey(90deg) translatez(-20px)");
$("#aaa3").css("transform","rotatex(90deg) translatez(20px)");
$("#aaa6").css("transform","rotatex(90deg) translatez(-20px)")
},function(){
$("#aaa1").css("transform","translatez(10px)");
$("#aaa2").css("transform","rotatey(90deg) translatez(10px)");
$('#aaa4').css("transform","translatez(-10px)");
$("#aaa5").css("transform","rotatey(90deg) translatez(-10px)");
$("#aaa3").css("transform","rotatex(90deg) translatez(10px)");
$("#aaa6").css("transform","rotatex(90deg) translatez(-10px)")
}
);
$("#box").on('click','a',function(e){
e.preventDefault();
$('body,html').animate({scrollTop:0},500);
})

/*页面加载后，异步请求咨询中的内容*/
$.ajax({
type:'GET',
  url:'data/read_consult.php',
  success:function(list){
var html='';
    $.each(list,function(i,c){
      html+=`
      <li><b></b><a href='#'>${c.type}</a><a href='#'>${c.content}</a></li>
      `;
    });
    $('#read_consult').html(html);
  }

});
/*页面加载后,异步请求原创男生的内容*/
$.ajax({
  type:'GET',
  url:'data/original_man.php',
  success:function(list){
    var html='';
    $.each(list,function(i,m){
      html+=`
      	<li><a href="#"><img src=${m.omimg}  alt="" /></a>
								<div class="intro">
								<h4>《<a href="#">${m.omtitle}</a>》</h4>
								<p>作者：<a href="#">${m.omauthor}</a></p>
								<p>${m.omintro}</p>
								</div>
								</li>
      `;
    });
    $('.otherbook1 ul').html(html);
  }

});
