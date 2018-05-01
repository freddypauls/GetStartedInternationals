$("#regBtn").click(function(){
		if(validatePassword()){
		var email = $("#regEmail").val();
		var password = $("#regPassword").val();
		var name = $("#regName").val();
		var userType = $("#regType").val();

		

		if(email != "" && password != "" && name != ""){

			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(function() {

				firebase.auth().signInWithEmailAndPassword(email, password)
				.then(function(){

					firebase.database().ref().child('users').once('value', function(snapshot) {
						if (!snapshot.hasChild(name)) {
							$uid = firebase.auth().currentUser.uid;
							console.log('User created!');
							
							//puts the new user into the database
							firebase.database().ref().child('users').child(name).set({
								uid: $uid,
								username: name,
								email: email,
								userType: userType
							});
							
							$user = firebase.auth().currentUser;
							
							$user.updateProfile({
								displayName: name,
							}).then(function() {
								// Update successful.
								$username = firebase.auth().currentUser.displayName;
								console.log($username);
							}).catch(function(error) {
								// An error happened.
							});
							
							//takes you to the indexpage
							window.location.replace('index.html');
						} else {
							alert("That user already exists");
							console.log("User with username: " + $uname + " already exists!")
						}
					});
				
				}).catch(function(error){
						//Login error
						$("#regError").show().text(error.message);
				});
		
			}).catch(function(error) {
				//reg error
				// Handle Errors here.
				$("#regError").show().text(error.message);					
			});
		}
		
	}else{
		$("#regError").show().text('Passwords does not match!');
	}
});


	/* MULIG VI KAN BRUKE NOE SLIKT FOR Å FIKSE BRUKER NAVN
	firebase.auth().onAuthStateChanged(function(user) {

				if (user) {

				   // Updates the user attributes:

				  user.updateProfile({ // <-- Update Method here

					displayName: "NEW USER NAME",
					photoURL: "https://example.com/jane-q-user/profile.jpg"

				  }).then(function() {

					// Profile updated successfully!
					//  "NEW USER NAME"

					var displayName = user.displayName;
					// "https://example.com/jane-q-user/profile.jpg"
					var photoURL = user.photoURL;

				  }, function(error) {
					// An error happened.
				  });     

				}
	});*/
