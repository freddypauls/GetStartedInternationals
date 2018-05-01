$("#loginBtn").click(
	function(){
		
		var email = $("#loginEmail").val();
		var password = $("#loginPassword").val();

		if(email != "" && password != ""){
			
			firebase.auth().signInWithEmailAndPassword(email, password)
			.then(function(){
				window.location.replace('index.html');
			}).catch(function(error){
				$("#loginError").show().text(error.message);				
			});
			
		}
		
});

