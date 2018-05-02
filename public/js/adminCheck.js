firebase.auth().onAuthStateChanged(function(user) {
	if (user.email == 'getstartedinternationals@gmail.com') {
		// admin is signed in.
		console.log("Hello admin");
	} else {
		// not admin
		document.location.href = "login.html";
	}
});