$reserveButtons = $(".reserveButton")
$reserveButtons.click(function(){

	$itemID = this.getAttribute('value');
	console.log('clicked');
	console.log(this.getAttribute('value'));

	$("#modalAgree").click(function(){
		//do reservation
		console.log('Agreed to book');
	});
});


function modalChoice(choice){
	if(choice == true){
		//do reservation
		console.log(choice);
		return true;
	} else {
		//do nothing
		return false;
	}
}
