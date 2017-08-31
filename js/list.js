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
		 
		 //购物车使用全局变量
		 	 		 	 var _allnum=0,
		 	 		 	 	 _allpir=0;
		 	 
		 	 //添加购物车
			
		 	 $("#pruts").on("click",".cart",function(){
		 	   		var _username=$.cookie("username");
		 		    if(!_username){
		 		     	alert("请先登录账号")
		 		    	return
		 		    }
		 	   		
		 	   		
		 	 	   var _imgSrc=$(this.parentNode.parentNode.parentNode.children[0].children).attr("src");
		 	 	   var _text=$(this.parentNode.parentNode.children[0]).html();
		 	 	   var _price=$(this.parentNode.parentNode.children[1]).html();
		 	 	   var _num=1;
		 	 	   var _id=$(this.parentNode.parentNode.children[2]).html();
		 	 	   
		 	 	var _product={"imgSrc":_imgSrc,
		 	 				  "text":_text,
		 	 				  "price":_price,
		 	 				  "num":_num,
		 	 				  "id":_id};
		 	 				  
					
		 	 	//判断cookie中是否有重复商品
		 	 	 var _carts=$.cookie("carts");
		 	 	
		 	 	    if(!_carts){  //判断是否为空
		 	 	    	_carts=[] ;
		 	 	    
		 	 	    }else{
					    _carts=JSON.parse(_carts);
		 	 	    }
		 		 var index=refer(_product.id,_carts);
		 		 if(index != -1){ 
		 		 	_carts[index].num++
		 		 }else{
		 		 	
		 		 	_carts.push(_product)
		 		 }
		 		 
		 		  _carts=JSON.stringify(_carts);
				$.cookie("carts",_carts,{path:"/"})
				
				//添加到小购物车
				$.cookie("carts",function(date){
					 date=JSON.parse(date)
				
					var _html = template("mini_carts",{list:date});
			 		$(".cart_content .top").html(_html);
			 		$(".cart_content h4").hide();
			 		$(".cart_content .bottom").show();
			 		//总数量
					_allnum=0;
			 		for(var i=0;i<date.length;i++){
			 			 _allnum += Number(date[i].num);
			 		}
			 		  
			 		//总价格
			 	    
			 		for(var i=0;i<date.length;i++){
			 			 _allpir += date[i].num*(date[i].price.slice(1))
			 		}
			 	
			 		$(".totle_price b").html("￥"+_allpir)
			 		$(".totle_num b").html(_allnum)
			 		$(".cart_box .cart_num").html(_allnum)
					alert("添加购物车成功！")
				})
				
		 	 })
		 	 
		 	 //refer函数，判断购物车里面是否有id这个元素
      	     function refer(id,products) {
      	     	 for(var i=0;i<products.length;i++){
      	     	 	if(products[i].id==id){
      	     	 		return i
      	     	 	}
      	     	 }
      	     	 return -1
      	     }
	})
})