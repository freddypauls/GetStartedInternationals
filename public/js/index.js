firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
		console.log("Hello "+user.displayName);
  } else {
    // No user is signed in.
	  document.location.href = "login.html";
  }
});