function registerItem(){
	$name = $('#itemName').val();
	$type = $('#itemType').val();
	$amount = $('#itemAmount').val();

	$dateNow = new Date();
	$formatDate = $dateNow.getDate() + '/' + ($dateNow.getMonth()+1) + '/' + $dateNow.getFullYear() + ' ' + $dateNow.getHours() + ":" + $dateNow.getMinutes() + ':' + $dateNow.getSeconds();
	$user = firebase.auth().currentUser;
	//creates item id with userID and a random number
	$itemID = $user.uid + Math.round(Math.random()*1000000000);

	$database = firebase.database().ref().child('items');

	$database.once('value', function(snapshot) {
		//checks if the itemID is unique (it should be)
		if (!snapshot.hasChild($itemID)) {

			//puts the new item into the database
			$database.child($itemID).set({
				itemid: $itemID,
				name: $name,
				type: $type,
				amount: $amount,
				owner: $user.displayName,
				ownerID: $user.uid,
				status: 'Pending',
				created_at: $formatDate,
			});
			
			
			M.toast({html: 'Item created!'})
			//takes you to the indexpage
			window.location.replace('index.html');
		} else {
			alert("That item already exists");
			M.toast({html: 'That item already exists!'})
			console.log("Item with that item id already exists!")
		}
	});
}