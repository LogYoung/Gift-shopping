require(["config"], function(){
	require(["jquery","cookie","template"],function($,cookie,template){
		$.ajax({  //尾部添加
		 	type:"get",
		 	url:"/html/include/footer.html",
		 	success:function(date){
		 		$(date).appendTo("#footer")
	 		}
		 });
		//账号登录
		var _username= $.cookie("username")
		   if(!_username ){
		   	
		   	 var _html=`<div class="kongcart">亲,您的购物车空空的.<br>温馨提示:<a href="/html/include/login.html">请登录</a>查看之前加入的商品,或者<a href="../../index.html">随便逛逛</a>,挑选喜欢的商品</div>`
		   	 $(".line").html(_html);
		   }else{
		   	var _html="<span class='tuichu redherf'>退出</span>"
		   	  $(".username").html(_username).attr("href","/")
		   	  			    .next().remove()
		   	  $(".header_top_wel_login").append($(_html))
		   }
		   $(".tuichu").click(function(){
		  
		   	   $.removeCookie("username",{path:"/"})
		   	   location="http://192.168.155.1:8080/html/include/cart.html"
		   })
		//模拟
		
		
		$.cookie("carts",function(date){
			
		 if(date=="[]"){
			alert("购物车为空，请选购商品")
			setTimeout(function(){
				location="../../index.html"
			},2000)
			
		  }else{
		  	date=JSON.parse(date)
		  }
		   
		   
		  var _html = template("carts",{list:date});
			$(_html).appendTo(".line tbody")
		})
		
		
		
      	     //加减操作
      	     $(".quantity").on("click",".jia, .jian",function(){
      	     	 // 获取点击的 + 所在行
				var _row = $(this).parents(".cart_main");
				// 获取原有数量
				var _amount = _row.find("#num").val();

				if ($(this).is(".jia")) {
					// 加
					_amount++;
				} else {
					if (_amount <= 1)
						return;
					_amount--;
				}
				
				var _products=$.cookie("carts");
				    _products=JSON.parse(_products);
				
				// 获取+所在行商品编号
				var _id = _row.children().eq(0).children().eq(1).html();
				// 获取商品在数组中索引
				var index = isExist(_id, _products);
				// 修改数组中index索引处元素的数量
				_products[index].num = _amount;
				_products=JSON.stringify(_products)
				// 修改 cookie 中商品数量
				$.cookie("carts", _products,{path:"/"});
				// 修改页面显示的商品数量
				_row.find("#num").val(_amount);
				// 获取当前商品单价
				var _price = _row.children(".price").html();
				   _price=Number(_price.slice(1));
				   
				
				// 显示修改数量后的小计
				_row.children(".all_price").text(_price * _amount);

				// 更新合计
				calcTotal();
      	     })
      	     
      	     // 全选
			$("#allche").click(function(){
				$(".check").prop("checked", $(this).prop("checked"));
				calcTotal();
			});

			// 点每行前复选框
			$(".cart_main .check").click(function(){
				var b = $(".check:checked").length == $(".check").length;
				$("#allche").prop("checked", b);
				// 更新合计
				calcTotal();
			});
			//删除
			$(".delete").on("click", ".shanchu", function(){
				var _products=$.cookie("carts");
				    _products=JSON.parse(_products);
				
				// 获取当前删除元素的id
				var _id = $(this).parent().parent().children().eq(0).children().eq(1).html();
				
				// 查找 _id 所表示商品在数组中的索引
				var index = isExist(_id, _products);
				// 删除数组 index 索引处元素
				_products.splice(index, 1);
				// 保存回 cookie 中
				_products=JSON.stringify(_products)
				$.cookie("carts", _products, {path:"/"});
				// 删除页面当前行DOM元素
				$(this).parents(".cart_main").remove();
				// 判断是否购物车为空
				if(_products=="[]"){
					alert("购物车为空，请选购商品")
					setTimeout(function(){
						location="../../index.html"
				},2000)
			
		  }

				// 更新合计
				calcTotal();
			});
      	      
      	      
      	function calcTotal() {
				var sum = 0;
				$(".check:checked").each(function(){
					var _row = $(this).parents(".cart_main");
					sum += Number(_row.children(".all_price").text());
				});
				// 显示合计金额
				$(".heji label span").html(sum);
			}
      	
      	function isExist(id, products) {
				for (var i = 0, len = products.length; i < len; i++) {
					if (products[i].id == id)
						return i;
				}

				return -1;
			}
		});
})