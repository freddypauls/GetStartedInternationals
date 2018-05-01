$("#loginBtn").click(
	function(){
		
		var email = $("#loginEmail").val();
		var password = $("#loginPassword").val();

		if(email != "" && password != ""){
			
			firebase.auth().signInWithEmailAndPassword(email, password)
			.then(function(){
				$user = firebase.auth().currentUser;
				if($user.email === 'getstartedinternationals@gmail.com'){
					window.location.replace('admin.html');
				} else {
					window.location.replace('index.html');
				}
				console.log($user);
				
			}).catch(function(error){
				$("#loginError").show().text(error.message);				
			});
			
		}
		
});

