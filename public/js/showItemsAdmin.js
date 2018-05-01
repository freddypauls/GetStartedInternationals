
// add message function
function addItem(itm) {

	if(itm.status == "Available"){
			//creates html elemets to be displayed with database data
			var itmNameElement = document.createElement("b");
			itmNameElement.textContent = itm.name;
			itmNameElement.className="black-text";

			var itmAmountElement = document.createElement("p");
			itmAmountElement.textContent = "Amount: " + itm.amount;
			itmAmountElement.className="black-text";

			var itmTypeElement = document.createElement("p");
			itmTypeElement.textContent = "Type: " + itm.type;
			itmTypeElement.className="black-text";

      var crossButton = document.createElement("i");
      crossButton.textContent="clear";
      crossButton.className="small material-icons right";

      //Adds delete function to clear icon
      crossButton.onclick=function delOnClick(){
        var firebaseRef = firebase.database().ref("items/" + itm.itemid);
        firebaseRef.remove().then(function(){
          console.log("remove suceeded " + itm.itemid);
          location.reload();
        }).catch(function(error){
          console.log("remove failed: " + error.message);
        })
      };

			var theItmElement = document.createElement("div");
			theItmElement.appendChild(itmNameElement);
			theItmElement.appendChild(itmAmountElement);
			theItmElement.appendChild(itmTypeElement);
      theItmElement.appendChild(crossButton);

			theItmElement.className = "card-content";


			var itmElement = document.createElement("div");
			itmElement.appendChild(theItmElement);


			itmElement.className = "card white card-margin";

			var colItmElement = document.createElement("div");
			colItmElement.appendChild(itmElement);

			colItmElement.className = "col s12 m4";


			document.getElementById("displayItemDiv").appendChild(colItmElement);
	}
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
