$("#loginBtn").click(
	function(){
		
		var email = $("#loginEmail").val();
		var password = $("#loginPassword").val();

		if(email != "" && password != ""){
			
			firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
				
				$("#loginError").show().text(error.message);
								
			});
			
		}
		
});

