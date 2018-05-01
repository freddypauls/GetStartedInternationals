
// add message function
function addItem(itm) {
		
	if(itm.status == "Available"){
			

			var theImage = document.createElement('img');
			theImage.setAttribute('src', 'images/'+ itm.type +'.jpg');
			theImage.setAttribute('alt','Image of '+ itm.type);
			theImage.className="itemImageClass";

			var theItemTitle = document.createElement('span');
			theItemTitle.className="card-title black-text";
			theItemTitle.textContent = itm.name;

			var theItemTop = document.createElement("div");
			theItemTop.className = "card-image";
			theItemTop.appendChild(theImage);
			theItemTop.appendChild(theItemTitle);

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

			var theButton = document.createElement('a');
			theButton.className = "reserveButton waves-effect waves-light btn";
			theButton.id = 'reserveButton';
			theButton.textContent = "Reserve";
			theButton.setAttribute('value', itm.itemid);

			var theItemEnd = document.createElement('div');
			theItemEnd.className = 'card-action';
			theItemEnd.appendChild(theButton);

			var theItmElement = document.createElement("div");
			theItmElement.appendChild(theItemTop);
			theItmElement.appendChild(itmNameElement);
			theItmElement.appendChild(itmAmountElement);
			theItmElement.appendChild(itmTypeElement);
			theItmElement.appendChild(theItemEnd);
			theItmElement.className = "card-content";
	

			var itmElement = document.createElement("div");
			itmElement.appendChild(theItmElement);
			

			itmElement.className = "card white";
	
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