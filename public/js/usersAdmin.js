firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
		console.log("Hello ")
  } else {
    // No user is signed in.
	  document.location.href = "login.html";
  }
});

$("#signOut").click(
	function(){

		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
			console.log("You are now logged out");
		}).catch(function(error) {
		  // An error happened.
		});

});


// Runs when user adds to database
 var startListening = function() {


		//On message added
		firebase.database().ref().child('users').on('child_added', function(snapshot) {
		 var user = snapshot.val();
     console.log(user);

		 //creates html elemets to be displayed with database data
		 var usernameElement = document.createElement("b");
		 usernameElement.textContent = user.username;
		 usernameElement.className = "";

		 var msgElement = document.createElement("div");
		 msgElement.appendChild(usernameElement);

		});
 }

 // Begin listening for data
 startListening();



/*
// add message function
function printUser(user) {

			 //creates html elemets to be displayed with database data
			 var usernameElement = document.createElement("b");
			 usernameElement.textContent = user.username;
			 usernameElement.className="black-text";

			 var hrMsgElement = document.createElement("hr");

			 var msgElement = document.createElement("div");
			 msgElement.appendChild(usernameElement);
			 msgElement.appendChild(hrMsgElement);

			 msgElement.className = "container";

			 document.getElementById("showUsers").appendChild(msgElement);
}

   // Runs when user adds to database
   var startListening = function() {

      firebase.database().ref().child('users').on('child_added', function(snapshot) {
       var user = snapshot.val();
       // Sends notifications to all users
       printUser(user)
     });
   }

   // Begin listening for data
   startListening();*/
