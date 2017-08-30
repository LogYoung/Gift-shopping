require(["config"], function(){
	require(["jquery","cookie","template"],function($,cookie,template){
		$.ajax({  //尾部添加
		 	type:"get",
		 	url:"/html/include/footer.html",
		 	success:function(date){
		 		$(date).appendTo("#footer")
	 		}
		 });
		
		//模拟
		/*$.getJSON("../../mock/carts/carts.json",function(date){
			var html = template("carts",{list:date});
			$(html).appendTo(".line tbody");
		})*/
		var _date= $.cookie("carts")
		console.log(_date)
		var _html = template("carts",{list:_date});
			$(_html).appendTo(".line tbody");
		
	})
})