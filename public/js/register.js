$("#regBtn").click(
	function(){
		
		var email = $("#regEmail").val();
		var password = $("#regPassword").val();
		var name = $("#regName").val();
		

		if(email != "" && password != "" && name != ""){

			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(function() {
				firebase.auth().signInWithEmailAndPassword(email, password)
				.then(function(){
					var user = firebase.auth().currentUser;
					
					user.updateProfile({displayName: name})
					.then(function() {
							// Update successful.
							window.location.replace('index.html');
						}).catch(function(error) {
							$("#regError").show().text(error.message);
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
				//window.location.replace('login.html');
		}
		
	}

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
);