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
		 var usernameElement = document.createElement("b");
		 usernameElement.textContent = user.username;
		 usernameElement.className = "";

		 var msgElement = document.createElement("div");
		 msgElement.appendChild(usernameElement);
			
		 var messages = user.messages
		 var messagelist = document.createElement("div");
		 messagelist.className = "messageList hide";

		 Object.entries(messages).forEach(([key, value]) => {
			 var messageElement = document.createElement("div");
			 messageElement.innerHTML = value.message;
			 messagelist.appendChild(messageElement);
		 });
		 if(Object.keys(messages).length == 0) {
			 var noCommentsElement = document.createElement("i")
			 noCommentsElement.innerHTML = "Ingen kommentarer";
			 messagelist.appendChild(noCommentsElement);
		 }
		 var hrMsgElement = document.createElement("hr");
			
		 msgElement.appendChild(messagelist);
		 msgElement.className = "container";
		 msgElement.addEventListener("click", (event) => {
			 var childList = event.target.getElementsByClassName("messageList")[0]
			 if(childList) {
				 if(childList.className.indexOf("hide") != -1) {
					 childList.className = "messageList";
				 } else {
					 childList.className = "messageList hide";
				 }
			}
		 })
		 msgElement.appendChild(hrMsgElement);

		 document.getElementById("userList").appendChild(msgElement);
		
	 
		});
 }

 // Begin listening for data
 startListening();