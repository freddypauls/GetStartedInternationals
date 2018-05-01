firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
		console.log("Hello "+user.displayName;)
  } else {
    // No user is signed in.
	  document.location.href = "login.html";
  }
});

$(".signOutSelector").click(
	function(){
		
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
			console.log("You are now logged out");
		}).catch(function(error) {
		  // An error happened.
		});
		
});