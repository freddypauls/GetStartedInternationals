/**
 * [reserveItem reservs an item for user]
 * @param  {[id]} item [item id]
 * @return {[type]}      [reservs the item for the user]
 */
function reserveItem(item){
	$itemID = item;
	console.log($itemID);

	$("#modalAgree").click(function(){
		//do reservation
		console.log('Agreed to book');

		$database = firebase.database().ref().child('items');

		$database.once('value', function(snapshot) {
			//checks if the itemID is unique (it should be)
			if (snapshot.hasChild($itemID)) {

				//puts the new item into the database
				$database.child($itemID).update({
					status: 'Reserved',
					reserved_by: firebase.auth().currentUser.displayName,
					reserved_by_id: firebase.auth().currentUser.uid,
				});
				
				
				M.toast({html: 'Item reserved!'});
				location.reload();
			} else {

				M.toast({html: 'That item does not exist!'})
				console.log("Item does not exist!")
			}
		});
	});
}
