firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
		console.log("Hello ")
  } else {
    // No user is signed in.
	  document.location.href = "login.html";
  }
});

firebase.auth().onAuthStateChanged(function(user) {
  
	$name = firebase.auth().currentUser.displayName;
	console.log($name);
	
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

// add message function
function addMessage(msg) {

			 //creates html elemets to be displayed with database data
			 var msgUsernameElement = document.createElement("b");
			 msgUsernameElement.textContent = msg.u;
			 msgUsernameElement.className="black-text";
	
			 var msgTextElement = document.createElement("p");
			 msgTextElement.textContent = msg.m;
	 		 msgTextElement.className="black-text";

			 var msgTimeElemt =document.createElement("span");
			 msgTimeElemt.textContent= moment(msg.date).format('MMMM Do YYYY, h:mm:ss a');
			 msgTimeElemt.className="grey-text";

			 var hrMsgElement = document.createElement("hr");
			 
			 var msgElement = document.createElement("div");
			 msgElement.appendChild(msgUsernameElement);
			 msgElement.appendChild(msgTextElement);
			 msgElement.appendChild(msgTimeElemt);
			 msgElement.appendChild(hrMsgElement);

			 msgElement.className = "container";

			 document.getElementById("displayMessageDiv").appendChild(msgElement);
}

 //onClick
 $("#sendMsg").click(
	function(){
		
		//Data to be stored when users clicks
		 $date = new Date();
		 $dateToSting = moment($date).toString();
		 $message = $("#userMsg").val();
		 $uname = firebase.auth().currentUser.displayName;

		 //Pushes users data to database
		 firebase.database().ref().child('messages').push({
			 m: $message,
			 u: $uname,
			 d: $dateToSting
			});
			 //Pushes users data to database
			 firebase.database().ref().child('users').child($uname).child('messages').push({
				 message: $message
				});

		//Clears the input field after posting
 		document.getElementById('userMsg').value = '';

	});

   // Runs when user adds to database
   var startListening = function() {
      var now = moment();
      firebase.database().ref().child('messages').on('child_added', function(snapshot) {
       var msg = snapshot.val();
       // Sends notifications to all users
       addMessage(msg)
      if(msg.date) {
         var datetime = moment(msg.date);
         var user = firebase.auth().currentUser;
         var u = user.displayName;
         var isafter = datetime.isAfter(now);
         if(datetime.isAfter(now) && user.displayName != msg.uname) {
           if(Notification.permission !== 'default') {
             notify = new Notification('New Message', {
               'body': 'Some one just posted a message in your message app',
               'tag': '1234'
             });
             notify.onclick = function() {
               window.location = '?message=' + this.tag;
             }
           } else {
             alert("Please click on request permission link before acessing this link!");
           }
         }
       }
     });
   }

   // Begin listening for data
   startListening();

  // Asks premission to use notifications on click
  var dnperm = document.getElementById("dnperm");
  dnperm.addEventListener('click', function(e) {
    e.preventDefault();
    if(!window.Notification) {
      alert("Notification is not supported!");
    } else {
      Notification.requestPermission().then(function(p) {
        if(p === 'denied') {
          alert("You denied to show notification!");
        } else {
          alert("You granted the notification!");
        }
      });
    }
  });