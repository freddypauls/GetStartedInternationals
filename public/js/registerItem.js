$(".signOutSelector").click(function(){
		
	firebase.auth().signOut().then(function() {
  		// Sign-out successful.
		console.log("You are now logged out");
	}).catch(function(error) {
  		// An error happened.
	});
		
});