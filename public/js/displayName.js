//click listener on the sign up button
$('#regNick').click(function() {

	$uid = firebase.auth().currentUser.uid;
	$uname = $('#nickName').val();
	//stores user to database if username is not allready taken
	firebase.database().ref().child('users').once('value', function(snapshot) {
		if (!snapshot.hasChild($uname)) {
			console.log('User created!');
			
			//puts the new user into the database
			firebase.database().ref().child('users').child($uname).set({
				uid: $uid,
				username: $uname
			});
			
			$user = firebase.auth().currentUser;
			
			$user.updateProfile({
				displayName: $uname,
			}).then(function() {
				// Update successful.
			}).catch(function(error) {
				// An error happened.
			});
			
			$username = firebase.auth().currentUser.displayName;
			console.log($username);

			//takes you to the chat view
			document.location.href = "index.html";
		} 
		else {
			alert("That user already exists");
			console.log('User with username: ' + $uname + " already exists!")
		}
	});
	//checks if the function get get username works if it does you have succesfully logged in
	if (firebase.auth().currentUser.displayName) {
		document.location.href = "index.html";
	}
});