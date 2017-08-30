require(["config"], function(){
	require(["jquery", "template", "load"], function($, template){
	  	//侧拉导航
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
		 //导航显示效果
		 
		 $("#header_nav_hide").hover(function(){
		 	$("#header_nav_hide .left").show()
		 },function(){
		 	$("#header_nav_hide .left").hide()
		 })
		 
		 //商品
		 
		 $.getJSON("../../mock/list.json",function(date){
		 	 	 var html = template("prut",{list:date});
			 		$(html).appendTo("#pruts");
		 	 })
		 //下边翻页js
		 $(".navbox .page").click(function(e){
		 	e=e||event;
		 	e.preventDefault();
		 	$(this).addClass("chespan").siblings().removeClass("chespan")
		 })
		 $(".navbox .next").click(function(e){
		 	e=e||event;
		 	e.preventDefault();
		 	if($(".navbox .chespan").next()[0]==$(this)[0]){
		 		return
		 	}
		 	console.log($(".navbox .chespan").next()[0])
		 	console.log($(this)[0])
		 	$(".navbox .chespan").removeClass("chespan").next()
		 						 .addClass("chespan")
		 })
	})
})