// Runs when user adds to database
 var startListening = function() {

	//On message added
	firebase.database().ref().child('items').on('child_added', function(snapshot) {
	 	var item = snapshot.val();
	 	console.log(item);
	 	$deleteFunction = "deleteItem('"+item.itemid+"')";

		if(item.status == 'Pending'){
			$function = "approveItem('"+item.itemid+"')";
			$displayThis = '<tr><td>'+item.name+'</td><td>'+item.amount+'</td><td>'+item.type+'</td><td>'+item.owner+'</td><td>'+item.created_at+'</td><td><a href="#modalPending" class="waves-effect waves-light btn modal-trigger modalEdit" onclick="'+$function+'">Edit</a></td><td><i class="tiny material-icons crossAdmin" onclick="'+$deleteFunction+'">clear</i></td></tr>';
			$("#pendingList").append($displayThis);

		} else if(item.status == 'Reserved'){
			$function = "changeReservedStatus('"+item.itemid+"')";
			$displayThis = '<tr><td>'+item.name+'</td><td>'+item.amount+'</td><td>'+item.type+'</td><td>'+item.reserved_by+'</td><td><a href="#modalReserved" class="waves-effect waves-light btn modal-trigger modalEdit" onclick="'+$function+'">Edit</a></td><td><i class="tiny material-icons crossAdmin" onclick="'+$deleteFunction+'">clear</i></td></tr>';
		
			$("#reservedList").append($displayThis);
		} else if(item.status == 'Delivered'){
			$function = "changeReservedStatus('"+item.itemid+"')";
			$displayThis = '<tr><td>'+item.name+'</td><td>'+item.amount+'</td><td>'+item.type+'</td><td>'+item.reserved_by+'</td><td><a href="#modalReserved" class="waves-effect waves-light btn modal-trigger modalEdit" onclick="'+$function+'">Edit</a></td><td><i class="tiny material-icons crossAdmin" onclick="'+$deleteFunction+'">clear</i></td></tr>';
		
			$("#deliveredList").append($displayThis);
		}

		 // Delete user onclick function
		/*$('.crossAdmin').click(function (){

	   		var firebaseRef = firebase.database().ref("items/" + item.itemid);
			firebaseRef.remove().then(function(){
		 		console.log("remove suceeded " + item.name);
		 		location.reload();
			}).catch(function(error){
		 		console.log("remove failed: " + error.message);
	   		})
	 	};

	  	var updateModal = document.getElementById("editUsertype");

	  	$('#editReservedItems').click(function(){
	  		$firebase = firebase.database().ref();


	  	})*/

	  	// Edit usertype onclick function
	  /*	updateModal.onclick=function editOnClick(){
			const fb = firebase.database().ref();
			var selectedValue = $("#selectedValue option:selected").text();

			$("#selectedValue option:selected").text();

			var userType = selectedValue;
			userType = {userType}

			console.log( fb.child('users/'+ user.userType));
			fb.child('users/' + user.username).update(userType);
			location.reload();

	  	};*/


		  

	});
 }

function deleteItem(item){
	$itemID = item;
	console.log($itemID);

	$databaseItem = firebase.database().ref().child('items/'+$itemID);
	$databaseItem.remove().then(function(){
		console.log('Item deleted!');
		M.toast({html: 'Item deleted!'});
		location.reload();
	}).catch(function(error){
     	console.log("Deletion failed: " + error.message);
     	M.toast({html: 'Failed to delete!'});
	})
}

function approveItem(item){
	$itemID = item;
	console.log($itemID);

	$("#editPendingStatus").click(function(){
		//do reservation
		console.log('Agreed to book');

		$database = firebase.database().ref().child('items');

		$database.once('value', function(snapshot) {
			//checks if the itemID is unique (it should be)
			if (snapshot.hasChild($itemID)) {

				//puts the new item into the database
				$database.child($itemID).update({
					status: 'Available',
				});
				
				M.toast({html: 'Item now avalible!'})
				location.reload();
			} else {

				M.toast({html: 'That item does not exist!'})
				console.log("Item does not exist!")
			}
		});
	});
}

function changeReservedStatus(item){

	$itemID = item;
	console.log($itemID);

	$("#editReservedStatus").click(function(){
		//do reservation
		console.log('Agreed to book');

		//gets new status selected
		$newStatus = $('#selectedReservedValue').val();

		$database = firebase.database().ref().child('items');

		$database.once('value', function(snapshot) {
			//checks if the itemID is unique (it should be)
			if (snapshot.hasChild($itemID)) {

				//puts the new item into the database
				$database.child($itemID).update({
					status: $newStatus,
				});
				
				
				M.toast({html: 'Item changed!'})
				location.reload();
			} else {

				M.toast({html: 'That item does not exist!'})
				console.log("Item does not exist!")
			}
		});
	});
}

 // Begin listening for data
 startListening();