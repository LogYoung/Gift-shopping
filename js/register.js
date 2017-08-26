require(["config"], function(){
	require(["jquery","cookie"],function($,cookie){
	   	function usblur(){  //用户名正则判断
		  var _username=$("#usn").val();
		  var emil=/[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/,
		      phone=/^1[0-9]{10}/,
		      zh = /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{3,23}/,
		      hanzi=/^[\u4e00-\u9fa5]{2,8}$/;
           if(!_username){
           	  $("#usrinfo").show().html("用户名不能为空，请填写")
           }else if(!emil.test(_username)&&
           			!phone.test(_username)&&
           			!hanzi.test(_username)&&
           			!zh.test(_username)){
           	  $("#usrinfo").show().html("用户名只能为中文、英文、邮箱、电话")
           }else{
           	   $("#usrinfo").hide().html(" ")
           }
		};
		
		function paswblur(){  //密码正则判断
			var _password=$("#pasw").val();
		    var	pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
		    if(!_password){
		    	$("#pasinfo").show().html("密码不能为空，请填写")
		    }else if(!pwdReg.test(_password)){
		    	$("#pasinfo").show().html("密码必须8到16位数字与字母组合")
		    }else{
		    	$("#pasinfo").hide().html(" ")
		    }
		};
		
		function agblur(){ //重复密码正则判断
			var agpassword=$("#agpasw").val(),
			    _password=$("#pasw").val();
			if(!agpassword){
				$("#aginfo").show().html("密码不能为空，请填写");
			}else if(agpassword != _password){
				$("#aginfo").show().html("俩次输入的密码不一致")
			}else{
				$("#aginfo").hide().html(" ");
			}
		}
		$("#usn").blur(usblur);
		$("#pasw").blur(paswblur);
		$("#agpasw").blur(agblur);
		$.ajax({
			type:"get",
			url:"http://route.showapi.com/26-4",
			data:{"showapi_appid":"43701","showapi_sign":"b612189529f54d96b30f817ba67a6d2a","textproducer_char_string":"abcde2345678","image_width":"90","image_height":"50"},
			success:function(date){
				console.log(date)
			    var _date= date["showapi_res_body"],
			        imgsrc=_date["img_path"],
					_text=_date["text"];
			    $("#rttext").html(_text);
			    var _html=`<img src=${imgsrc} />`;
			    $("#yzmImg").html(_html)
				$("#yzminfo").hide().html(" ")
			}
		})
		$("#yzmImg").click(function(){
			 $.ajax({
			type:"get",
			url:"http://route.showapi.com/26-4",
			data:{"showapi_appid":"43701","showapi_sign":"b612189529f54d96b30f817ba67a6d2a","textproducer_char_string":"abcde2345678","image_width":"90","image_height":"50"},
			success:function(date){
			    var _date= date["showapi_res_body"],
			        imgsrc=_date["img_path"],
			    	_text=_date["text"];
			   	$("#rttext").html(_text);
			    var _html=`<img src=${imgsrc} />`;
			    $("#yzmImg").html(_html)
			    $("#yzminfo").hide().html(" ")
			}
		  })
		})
		$("#change").click(function(){
			 $.ajax({
			type:"get",
			url:"http://route.showapi.com/26-4",
			data:{"showapi_appid":"43701","showapi_sign":"b612189529f54d96b30f817ba67a6d2a","textproducer_char_string":"abcde2345678","image_width":"90","image_height":"50"},
			success:function(date){
			    var _date= date["showapi_res_body"],
			        imgsrc=_date["img_path"],
			      	_text=_date["text"];
			    $("#rttext").html(_text);
			    var _html=`<img src=${imgsrc} />`;
			    $("#yzmImg").html(_html)
			    $("#yzminfo").hide().html(" ")
			}
		  })
		})
	    $("#btn").click(function(e){
	    		    	
	    	e=e||event;
	    	e.preventDefault();
	    	usblur();
	    	paswblur();
			agblur();
	    	var isII=0;
	    	var _text=$("#rttext").html();
	    	var _yzm=$("#yzm").html();
	    	var _usr=$("#usrinfo").css("display");
	    	var _paw=$("#pasinfo").css("display");
	    	var _agp=$("#aginfo").css("display");
	    	var _che=$("#che").prop("checked");
	    	if(!_text==_yzm){
	    	 var _html=`<img src="../../images/eorro.png/" style="width:20px;height:20px;position: relative;top:5px">`;
	    		$("#yzminfo").show().html(_html)
	    		
	    	}else{
	    		$("#yzminfo").hide().html(" ")
	    		isII += 1;
	    	}
	        if(_usr=="none"){
	        	isII += 1;
	        } 
	        if(_paw=="none"){
	        	isII += 1;
	        }
	        if(_agp=="none"){
	        	isII += 1;
	        	
	        }
	        console.log(isII)
	        if(isII==4 && _che){
	        	var _username=$("#usn").val();
	        	$.cookie("username",_username,{path:"/"})
	        	location="/index.html" ;
	        }
	    })
   })
})
