require(["config"], function(){
	require(["jquery", "template", "load"], function($, template){
		  $(document).scroll(function(){
		  	   var _scroll=$(this).scrollTop();
		  	   if(_scroll >= 200){
		  	   	   $("#backtop").stop().animate({"opacity":1},1000)
		  	   }else{
		  	   	   $("#backtop").stop().animate({"opacity":0},1000)
		  	   }
		  })
		  $("#backtop").click(function(){
		  	   $("body").stop().animate({"scrollTop":"0"},1000)
		  })
		  $(".hidenav").hover(function(){
		  	$(this).show()
		    var y=$(".hidenav").index(this);
		    $("#main_top .left .nav li").eq(y+1).addClass("navmo_hover")
		    $("#main_top .left .nav li").eq(y+1).removeClass("navmo")
		  },function(){
		  	$(this).hide() 
		  	var y=$(".hidenav").index(this);
		  	$("#main_top .left .nav li").eq(y+1).removeClass("navmo_hover")
		    $("#main_top .left .nav li").eq(y+1).addClass("navmo")
		  	var y=$(this).index();
		  })
		 $(".navmo").hover(function(){
		 	var x= $(this).index()
		    $(this).addClass("navmo_hover")
		    $(this).removeClass("navmo")
		    $(".hidenav").eq(x-1).show()
		 },function(){
		 	var x= $(this).index()
		 	$(this).removeClass("navmo_hover")
		    $(this).addClass("navmo")
		    $(".hidenav").eq(x-1).hide()
		 })
		 
		 //轮播图
		var $lis = $("#scrollnav ul li"), // 所有轮播图片的盒子
			len = $lis.length, // 轮播图片张数
			liWidth = $lis.outerWidth(), // 图片盒子宽度
			currentIndex = 1, // 当前显示图片索引
			nextIndex = 2, // 即将显示图片索引
			timer = null; // 轮播计时器
		// 克隆第一张及最后一张图片
		var $first = $lis.eq(0).clone(true),
			$last = $lis.eq(len - 1).clone(true);
		// 将克隆的第一张图片添加到最后
		$("#scrollnav ul").append($first);
		// 将克隆的最后一张图片添加到开头
		$("#scrollnav ul").prepend($last);
		// len增加:新增了2张图片
		len += 2;
		// 设置 ul 宽度
		$("#scrollnav ul").width(len * liWidth);
		// 默认显示第一张内容的图片
		$("#scrollnav ul").css({
			left : -liWidth
		});

		// 自动轮播切换
		// timer = setInterval(move, 3000);

		//默认小圆点
		$(".yuandian").children().eq(0).addClass("yuan")

		// 鼠标移入/移出容器，停止/开启自动轮播计时器
		$("#scrollnav").hover(function(){
			// mouseenter
			clearInterval(timer);
		}, function(){
			// mouseleave
			timer = setInterval(move, 3000);
		}).mouseleave(); //.trigger("mouseleave");

		// 点击小圆点，切换显示图片
		$(".yuandian").on("click", "span", function(){
			var _index = $(this).index(); // 获取当前点击小圆点索引
			nextIndex = _index + 1;
			move();
		});


		function move() {
			// 计算运动定位
			var _left = -1 * liWidth * nextIndex;
			// 计算待显示红色小圆点的索引
			var circleIndex;
			if (nextIndex === len - 1)
				circleIndex = 0;
			else if (nextIndex === 0)
				circleIndex = len - 3;
			else
				circleIndex = nextIndex - 1;
			// 切换小圆点样式
			$(".yuandian span").eq(circleIndex).addClass("yuan").siblings().removeClass("yuan");

			// 调用运动方法
			$("#scrollnav ul").stop().animate({left : _left},1000, function(){
				if (nextIndex >= len) {
					currentIndex = 1;
					nextIndex = 2;
					$("#scrollnav ul").css("left", -liWidth);
				}
				if (currentIndex <= 0) {
					currentIndex = len - 2;
					nextIndex = len - 1;
					$("#scrollnav ul").css("left", -liWidth * (len - 2));
				}
			});
			// 修改索引
			currentIndex = nextIndex;
			nextIndex++;
		}
		//轮播图下方数据添加
		$.getJSON("/mock/bannerbottom.json",function(date){
			 var html = template("main_scroll_bottom", {list:date});
			 $(html).appendTo("#main_top .center .bottom");
		})
		//轮播图侧面活动数据添加
		$.getJSON("/mock/actext.json",function(date){
			 var html = template("activity_notice",{list:date});
			 $(html).appendTo(".activity_text");
		})
		$.getJSON("/mock/notext.json",function(date){
			 var html = template("activity_notice",{list:date});
			 $(html).appendTo(".notice_text");
		})
		$(".notice_activity .header .activity").mouseenter(function(){
			$(this).addClass("checkde");
			$(".activity_text").addClass("showtext");
			$(".notice_text").removeClass("showtext");
			$(".notice_activity .header .notice").removeClass("checkde")
		})
		$(".notice_activity .header .notice").mouseenter(function(){
			$(this).addClass("checkde");
			$(".notice_text").addClass("showtext");
			$(".activity_text").removeClass("showtext");
			$(".notice_activity .header .activity").removeClass("checkde")
		})
	});
})