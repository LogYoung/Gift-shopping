define(["jquery","template","cookie"],function($,template){
	 $.ajax({ //头部添加
	 	type:"get",
	 	url:"/html/include/header.html",
	 	success:function(date){
	 		var _username=$.cookie("username");
	 		if(_username){
	 			$(date).find(".username")
	 			       .html(_username).attr("href","/")
	 			       .next().html("退出")
	 			       .attr({"href":"javascript:;","onclick":"location.reload()"}).click(function(){
	 			       	$.removeCookie("username",{path:"/"})
	 			       })
	 			       .end().end().appendTo("#header")
	 			
	 		}else{
	 			$(date).appendTo("#header")
	 			
	 		};
	 		$(".cart_mini").hover(function(){
	 			$(this).children().eq(1).show()
	 		},function(){
	 			$(this).children().eq(1).hide()
	 		})
	 		
	 		if($(".cart_content h4").css("display")!="none"){
	 			$(".cart_content .bottom").hide();
	 		}else{
	 			
	 			$(".cart_content .bottom").show()
	 		}
	 		 //购物车使用全局变量
		 	 		 	 var _allnum=0,
		 	 		 	 	 _allpir=0;
		 	 //页面刷新购物车
		 		$.cookie("carts",function(date){
		 		 var _username=$.cookie("username");
		 		    if(!_username){
		 		    	return
		 		    }
		 			//判断购物车是否为空
		 			if(!date){
		 				
		 				return
		 			}
		 			
					 date=JSON.parse(date)
					var _html = template("mini_carts",{list:date});
					
					
			 		$(".cart_content .top").html(_html);
			 		$(".cart_content h4").hide();
			 		$(".cart_content .bottom").show();
					_allnum=0
			 		for(var i=0;i<date.length;i++){
			 			 _allnum += Number(date[i].num);
			 		}
			 		
			 		for(var i=0;i<date.length;i++){
			 			 _allpir += date[i].num*(date[i].price.slice(1))
			 			
			 		}
			 		$(".totle_price b").html("￥"+_allpir)
			 		$(".totle_num b").html(_allnum)
			 		$(".cart_box .cart_num").html(_allnum)
					
				})
		 	
		 	 
	 	}
	 });
	 
	 $.ajax({  //尾部添加
	 	type:"get",
	 	url:"/html/include/footer.html",
	 	success:function(date){
	 		$(date).appendTo("#footer")
	 	}
	 });
     
})