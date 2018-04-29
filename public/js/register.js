$("#regBtn").click(
	function(){
		
		var email = $("#regEmail").val();
		var password = $("#regPassword").val();
		var name = $("#regName").val();
		var user = firebase.auth().currentUser;

		if(email != "" && password != "" && name != ""){

			firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
				// Handle Errors here.
				$("#regError").show().text(error.message);

				user.updateProfile({
					displayName: name,
				}).then(function() {
					// Update successful.
				}).catch(function(error) {
					// An error happened.
				});
				
				
				document.location.href = "login.html";
			});
			
		}
		
});