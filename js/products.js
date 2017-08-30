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
		 
		 //***********商品详情切换
		 $(".main_info .right .right_top span").click(function(){
		 	var _index=$(".main_info .right .right_top span").index(this);
		 	
		 	 $(".main_info .right .right_bottom div").eq(_index)
		 	 	.addClass("activebox").siblings().removeClass("activebox");
		 	 $(this).addClass("active").siblings().removeClass("active")
		 })
		 //**********页面头部JS
		 $.getJSON("/mock/products/products.json",function(date){
		 	console.log(date)
		 	 var _labeltext=date[0].labeltext,//标题
		 	     _price=date[1].price,
		 	     _priceold=date[2].odlprice,
		 	     _prunum=date[3].pru_num,
		 	     imgSrc=date[4].zoomSrc,
		 	     bigimg1=imgSrc[3],
		 	     bigimg2=imgSrc[2],
		 	     smimg2=imgSrc[1],
		 	     smimg1=imgSrc[0],
		 	     _spxq=date[5].spxq;
		 	 
		 	 var zoomHtml=`<img class="imgshow" src="${bigimg1}"/><img src="${bigimg2}"/>`;
		 	 var smhtml=`<li class="smhtml1"><img src="${smimg1}"></li><li class="smhtml2"><img src="${smimg2}"></li>`;
		 	 //添加数据进去
		 	 //商品详情
		 	 var spxqimg=`<img src="${_spxq[0]}"/><img src="${_spxq[1]}" /><img src="${_spxq[2]}" /><img src="${_spxq[3]}"/><img src="${_spxq[4]}"/>`
		 	 $(".spxq").html(spxqimg);
		 	 var _height= $(".spxq img").height();
		 	
		 	 //图片
		 	 $(".zoom").append(zoomHtml);
		 	 $("#smimgSrc").html(smhtml);
		 	 $(".bigzoom").html(zoomHtml);
		 	    //图片放大镜效果
		 	    $(".zoom").hover(function(e){
		 	    	$("#zoombox").show()
		 	    	$(".bigzoom").show()
		 	    	$(this).mousemove(function(e){
		 	    		  var e=e||event;
				 	      var _pgx=e.pageX,
				 	          _pgy=e.pageY,
				 	          _left=_pgx-50-100,
				 	          _top=_pgy-260-100;
				 	        if(_left<=0){
				 	        	_left=0
				 	        }else if(_left>=200){
				 	        	_left=200
				 	        }
				 	        if(_top<=0){
				 	        	_top=0
				 	        }else if(_top>=200){
				 	        	_top=200
				 	        }
				 	    $("#zoombox").css({"left":_left,"top":_top})
				 	
				 	    $(".bigzoom .imgshow").css({"left":-2*_left,"top":-2*_top})
				 	      
		 	    	})
		 	    	
		 	    },function(){
		 	    	$("#zoombox").hide()
		 	    	$(".bigzoom").hide()
		 	    })
		 	    //小图JS效果
		 	    $("#smimgSrc li").mouseenter(function(){
		 	    	var _index= $(this).index();
		 	    	$(".zoom img").eq(_index).addClass("imgshow")
		 	    				  .siblings().removeClass("imgshow");
		 	  		$(".bigzoom img").eq(_index).addClass("imgshow")
		 	    				  .siblings().removeClass("imgshow");
		 	    	
		 	    })
		 	 //价格
		 	 $("#pir_new").html(_price);
		 	 $("#pir_old").html(_priceold);
		 	 //编号
		 	 $("#pru_bianhao").html(_prunum);
		 	 //标题
		 	 $(".nav_path label").html(_labeltext);
		 	 $("#pru_name").html(_labeltext);
		 	 
		 	 
		 	 //左侧推荐
		 	 $.getJSON("../../mock/products/left_pic.json",function(date){
		 	 	 var html = template("ul_nav",{list:date});
			 		$(html).appendTo(".main_info .left .left_bottom");
		 	 })
		 })
   });
})