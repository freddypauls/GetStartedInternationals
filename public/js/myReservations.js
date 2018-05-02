
/**
 * [deleteItem reverts an item from reserved to availible]
 * @param  {[id]} item [id of item]
 * @return {[type]}      [sets the item status back to Availible and clears the reserved by values ]
 */
function deleteItem(item){
	$itemID = item;
	console.log($itemID);

	$("#modalAgree").click(function(){
		//do reservation
		console.log('deleted');

		$database = firebase.database().ref().child('items/'+$itemID);

		//puts the new item into the database
		$database.update({
			status: 'Available',
			reserved_by: '',
			reserved_by_id: '',
		});
		
		
		M.toast({html: 'Item removed!'});
		location.reload();

	});
}

// Runs when user adds to database
 var startListening = function() {

	//On message added
	firebase.database().ref().child('items').on('child_added', function(snapshot) {
	 	var item = snapshot.val();
	 	console.log(item);
	 	
	 	$deleteFunction = "deleteItem('"+item.itemid+"')";

		if(item.reserved_by == firebase.auth().currentUser.displayName){
			$displayThis = '<tr><td>'+item.name+'</td><td>'+item.amount+'</td><td>'+item.type+'</td><td><i class="tiny material-icons crossAdmin" onclick="'+$deleteFunction+'">clear</i></td></tr>';
			
			$("#myReservationsList").append($displayThis);

		} 
	});
 }

 // Begin listening for data
 startListening();