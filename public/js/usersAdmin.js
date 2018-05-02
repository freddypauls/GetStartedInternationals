
// Runs when user adds to database
 var startListening = function() {

		//On message added
		firebase.database().ref().child('users').on('child_added', function(snapshot) {
		 var user = snapshot.val();

		 //creates html elemets to be displayed with database data
		 var usernameElement = document.createElement("td");
		 usernameElement.textContent = user.username;
		 usernameElement.className = "";

		 var emailElement = document.createElement("td");
		 emailElement.textContent = user.userType;
		 emailElement.className = "";

     var crossButton = document.createElement("i");
     crossButton.textContent="clear";
     crossButton.className="tiny material-icons right crossUsersAdmin";

     // Delete user onclick function
     crossButton.onclick=function delOnClick(){

       var firebaseRef = firebase.database().ref("users/" + user.username);
       firebaseRef.remove().then(function(){
         console.log("remove suceeded " + user.username);
         location.reload();
       }).catch(function(error){
         console.log("remove failed: " + error.message);
       })
     };

      var editButton = document.createElement("a");
      editButton.textContent="edit";
      editButton.className="waves-effect waves-light btn modal-trigger modalEdit";
      editButton.setAttribute('href', "#modal1");

      var updateModal = document.getElementById("editUsertype");

      // Edit usertype onclick function
      updateModal.onclick=function editOnClick(){
      const fb = firebase.database().ref();
      var selectedValue = $("#selectedValue option:selected").text();

      $("#selectedValue option:selected").text();

      var userType = selectedValue;
      userType = {userType}

      console.log( fb.child('users/'+ user.userType));
     fb.child('users/' + user.username).update(userType);
     location.reload();

      };

		 var usersElement = document.createElement("tr");

  		usersElement.appendChild(usernameElement);
      usersElement.appendChild(emailElement);
      usersElement.appendChild(crossButton);
      usersElement.appendChild(editButton);

      document.getElementById("userList").appendChild(usersElement);

		});
 }

 // Begin listening for data
 startListening();
