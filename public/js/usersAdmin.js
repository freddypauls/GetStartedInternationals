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

		 //creates html elemets to be displayed with database data
		 var usernameElement = document.createElement("td");
		 usernameElement.textContent = user.username;
		 usernameElement.className = "";

     //creates html elemets to be displayed with database data
		 var emailElement = document.createElement("td");
		 emailElement.textContent = user.userType;
		 emailElement.className = "";

     var crossButton = document.createElement("i");
     crossButton.textContent="clear";
     crossButton.className="small material-icons right crossUsersAdmin";

     // Delete user
     crossButton.onclick=function delOnClick(){


    var userAuth = firebase.auth().user.username;

    console.log(userAuth);
    /*
    user.delete().then(function() {
      // User deleted.
    }).catch(function(error) {
      // An error happened.
    });



       var firebaseRef = firebase.database().ref("users/" + user.username);
       firebaseRef.remove().then(function(){
         console.log("remove suceeded " + user.username);
         location.reload();
       }).catch(function(error){
         console.log("remove failed: " + error.message);
       })

         */
     };

		 var msgElement = document.createElement("tr");

		 msgElement.appendChild(usernameElement);
     msgElement.appendChild(emailElement);
      msgElement.appendChild(crossButton);

     document.getElementById("userList").appendChild(msgElement);

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
