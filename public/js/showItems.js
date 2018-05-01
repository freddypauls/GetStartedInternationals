
// add message function
function addItem(itm) {

			//creates html elemets to be displayed with database data
			var itmUsernameElement = document.createElement("b");
			itmUsernameElement.textContent = itm.owner;
			itmUsernameElement.className="black-text";

			var itmNameElement = document.createElement("p");
			itmNameElement.textContent = "Name: " + itm.name;
			itmNameElement.className="black-text";
	
			var itmAmountElement = document.createElement("p");
			itmAmountElement.textContent = "Amount: " + itm.amount;
			itmAmountElement.className="black-text";
		
			var itmTypeElement = document.createElement("p");
			itmTypeElement.textContent = "Type: " + itm.type;
			itmTypeElement.className="black-text";
	
			var theItmElement = document.createElement("div");
			theItmElement.appendChild(itmUsernameElement);
			theItmElement.appendChild(itmNameElement);
			theItmElement.appendChild(itmAmountElement);
			theItmElement.appendChild(itmTypeElement);
			theItmElement.className = "card-content";
	

			var itmElement = document.createElement("div");
			itmElement.appendChild(theItmElement);
			

			itmElement.className = "card white";


			document.getElementById("displayItemDiv").appendChild(itmElement);
}

// Runs when user adds to database
   var startListening = function() {
	  var now = moment();
	  firebase.database().ref().child('items').on('child_added', function(snapshot) {
	  $('#loadingCircle').hide();
	  var itm = snapshot.val();
	  addItem(itm);
	  // Sends notifications to all users
	  if(itm.date) {
		var datetime = moment(itm.date);
	 	var user = firebase.auth().currentUser;
	 	var u = user.displayName;
	 	var isafter = datetime.isAfter(now);
	 	if(datetime.isAfter(now) && user.displayName != itm.uname) {
		   	if(Notification.permission !== 'default') {
		 	notify = new Notification('New Item', {
		   		'body': 'Some one just posted a item in the GSI app',
			   	'tag': '1234'
		 	});
		 	notify.onclick = function() {
				window.location = '?item=' + this.tag;
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