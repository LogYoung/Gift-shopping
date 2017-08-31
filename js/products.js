require(["config"], function(){
	require(["jquery", "template","cookie", "load"], function($, template){
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
		
		 	 //购物车使用全局变量
		 	 		 	 var _allnum=0,
		 	 		 	 	 _allpir=0;
		 	 
		 	 //添加购物车

		 	 $(".btn_cart").click(function(){
		 	 	  var _username=$.cookie("username");
		 		    if(!_username){
		 		     	alert("请先登录账号")
		 		    	return
		 		    }
		 	 	   var _imgSrc=$(".smhtml1 img").attr("src");
		 	 	   var _text=$("#pru_name").html();
		 	 	   var _price=$("#pir_new").html();
		 	 	   var _num=$("#pru_num").val();
		 	 	   console.log(_num)
		 	 	   var _id=$("#pru_bianhao").html();
		 	 	   
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
		 		 	_carts[index].num =Number(_carts[index].num)+Number(_num)
		 		 }else{
		 		 	
		 		 	_carts.push(_product)
		 		 }
		 		 
		 		  _carts=JSON.stringify(_carts);
		 		  console.log(_carts)
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
			 			
			 			 console.log(date[i].price.slice(1))
			 		}
			 	
			 		$(".totle_price b").html("￥"+_allpir)
			 		$(".totle_num b").html(_allnum)
			 		$(".cart_box .cart_num").html(_allnum)
					
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
      	     
      	     //商品加减操作
      	     $(".pru_num .jian").click(function(){
      	     	   var _num=$("#pru_num").val();
      	     	   console.log(_num)
      	     	    if(_num<=1){
      	     	    	_num=1
      	     	    }else{
      	     	    	_num--
      	     	    }
      	     	   $("#pru_num").val(_num);
      	     })
      	     
      	      $(".pru_num .jia").click(function(){
      	     	   var _num=$("#pru_num").val();
      	     	   console.log(_num)
      	     	    _num++
      	     	   $("#pru_num").val(_num);
      	     })
      	      
      	      //立即购买功能
      	      $(".btn_buy").click(function(){
      	      		var _username=$.cookie("username");
		 		    if(!_username){
		 		     	alert("请先登录账号")
		 		    	return
		 		    }
		 		    location="cart.html"
      	      })
   });
})