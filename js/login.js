require(["config"], function(){
	require(["jquery","cookie"],function($,cookie){
	  $("#btn").click(function(e){
	  	  e=e||event;
	  	e.preventDefault()
	  	var _username=$("#username").val(),
	  	    _password=$("#password").val();
	  	    
		$.getJSON("/mock/login.json",function(date){
			var isII=false;
			for (var i=0;i<date.length;i++){
			   if(date[i].username == _username &&
			      date[i].password == _password){
			      	isII=true;
			   	   $.cookie("username",_username,{path:"/"})
			   	   location="/index.html"   
			   	  var rdm=$("#rdmima").prop("checked")
	  		   	  if(rdm){
	  		   	  
	  			  	$.cookie("password",_password,{path:"/"})
	  			  	$("#rdmima").attr("checked","checked")
	  		      }
			   }
			   
			}
			if(!isII){
				$("#submit-error").css("opacity",1)
			}
			
		})
	  })
	  $(document).click(function(){
	  	   $("#submit-error").css("opacity",0)
	  })
	})
})
