// Runs when user adds to database
 var startListening = function() {

	//On item added
	firebase.database().ref().child('items').on('child_added', function(snapshot) {
	 	var item = snapshot.val();
	 	console.log(item);
	 	//Function to be printen in $displayThis
	 	$deleteFunction = "deleteItem('"+item.itemid+"')";

		if(item.status == 'Pending'){
			//Function to be printen in $displayThis
			$function = "approveItem('"+item.itemid+"')";
			$displayThis = '<tr><td>'+item.name+'</td><td>'+item.amount+'</td><td>'+item.type+'</td><td>'+item.owner+'</td><td>'+item.created_at+'</td><td><a href="#modalPending" class="waves-effect waves-light btn modal-trigger modalEdit" onclick="'+$function+'">Edit</a></td><td><i class="small material-icons crossAdmin" onclick="'+$deleteFunction+'">clear</i></td></tr>';
			
			//adds new row with item
			$("#pendingList").append($displayThis);

		} else if(item.status == 'Reserved'){
			//Function to be printen in $displayThis
			$function = "changeReservedStatus('"+item.itemid+"')";
			$displayThis = '<tr><td>'+item.name+'</td><td>'+item.amount+'</td><td>'+item.type+'</td><td>'+item.reserved_by+'</td><td><a href="#modalReserved" class="waves-effect waves-light btn modal-trigger modalEdit" onclick="'+$function+'">Edit</a></td><td><i class="small material-icons crossAdmin" onclick="'+$deleteFunction+'">clear</i></td></tr>';
			
			//adds new row with item
			$("#reservedList").append($displayThis);

		} else if(item.status == 'Delivered'){
			//Function to be printen in $displayThis
			$function = "changeReservedStatus('"+item.itemid+"')";
			$displayThis = '<tr><td>'+item.name+'</td><td>'+item.amount+'</td><td>'+item.type+'</td><td>'+item.reserved_by+'</td><td><i class="small material-icons crossAdmin" onclick="'+$deleteFunction+'">clear</i></td></tr>';
		
			//adds new row with item
			$("#deliveredList").append($displayThis);
		}
	});
 }

/**
 * [deleteItem deletes an item]
 * @param  {[id]} item [the id of an item]
 * @return {[]}      [deletes the item and reloads page]
 */
function deleteItem(item){
	$itemID = item;
	console.log($itemID);

	//locates the spesific item in the database
	$databaseItem = firebase.database().ref().child('items/'+$itemID);
	//removes it from the database
	$databaseItem.remove().then(function(){
		console.log('Item deleted!');
		M.toast({html: 'Item deleted!'});
		location.reload();
	}).catch(function(error){
     	console.log("Deletion failed: " + error.message);
     	M.toast({html: 'Failed to delete!'});
	})
}

/**
 * [approveItem approves an item]
 * @param  {[id]} item [the id of an item]
 * @return {[]}      [sets the status of an item to Availible and reloads]
 */
function approveItem(item){
	$itemID = item;
	console.log($itemID);

	//after you click accept on the pop up (modal)
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

/**
 * [changeReservedStatus approves an item]
 * @param  {[id]} item [the id of an item]
 * @return {[]}      [sets the status of an item to the selected status from popup (Availible or Deliveredsmall) and reloads]
 */
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