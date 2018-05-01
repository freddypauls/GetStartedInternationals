
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

       var firebaseRef = firebase.database().ref("users/" + user.username);
       firebaseRef.remove().then(function(){
         console.log("remove suceeded " + user.username);
         location.reload();
       }).catch(function(error){
         console.log("remove failed: " + error.message);
       })
     };

		 var usersElement = document.createElement("tr");

		usersElement.appendChild(usernameElement);
    usersElement.appendChild(emailElement);
    usersElement.appendChild(crossButton);

    document.getElementById("userList").appendChild(usersElement);

		});
 }

 // Begin listening for data
 startListening();
