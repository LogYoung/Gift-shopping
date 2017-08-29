define(["jquery","cookie"],function($){
	 $.ajax({ //头部添加
	 	type:"get",
	 	url:"/html/include/header.html",
	 	success:function(date){
	 		var _username=$.cookie("username");
	 		if(_username){
	 			$(date).find(".username")
	 			       .html(_username).attr("href","/")
	 			       .next().html("退出")
	 			       .attr("href","/").click(function(){
	 			       	$.removeCookie("username")
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