//function fetchJsonFromURL(url){
	
	
	


	// httpRequest.onreadystatechange = function() {
	//     if (this.readyState == 4 && this.status == 200) {
	//         //console.log(this.responseText);
	//         var myArr = JSON.parse(this.responseText);
	//         console.log(myArr.size);
	//         //console.log(this.responseText);
	//         //myFunction(myArr);
	//     }
	// };
var t = Date.now();
var chests = [];
countChests(chests);
console.log(chests);
console.log((Date.now()-t)/1000);

function countChests(chestTable){

	var basicUrl = "http://castles.poulpi.fr"
	var url = basicUrl + "/castles/1/rooms/entry";
	
	var httpRequest = new XMLHttpRequest();
	countChestsInRooms(chestTable, basicUrl, url, httpRequest);
	

	//console.log(subroomUrl);
	// console.log(room.id);
	// console.log(room.rooms);
	// console.log(room.chests);

	//return 0; 
	
}

//récupère les coffres pleins dans une pièces et ses sous pièces
function countChestsInRooms(chestTable, addressRoot, address, request){
	
	var currentRoom = requestElements(address, request);
	if (currentRoom != null) {

		//gestion des coffres de la pièce

		var chestsInRoom = currentRoom.chests;
		var chestUrl = "";

		// console.log("Room : " + currentRoom.id);
		for (var i = 0; i< chestsInRoom.length;i++){
			chestUrl = addressRoot + chestsInRoom[i];
			//console.log(chestUrl);
			checkChests(chestTable,chestUrl,request);
		}

		//gestion des sous pieces 
		var subrooms = currentRoom.rooms;
		
		for (var i = 0; i< subrooms.length;i++){
			subroomUrl =  addressRoot + subrooms[i];
			countChestsInRooms(chestTable, addressRoot, subroomUrl, request);
			// console.log(subrooms[i]);
		}
	}
	
	
}

function checkChests(chestTable,address,request){
	var currentChest = requestElements(address, request);
	var chestStatus;
	if (currentChest != null){
		 chestStatus = currentChest.status;
		 
		 if (chestStatus !== "This chest is empty :/ Try another one!"){
		 	console.log("TREASURE CHEST FOUND !!!! " + currentChest.id);
		 	chestTable.push(currentChest.id);
		 }
	}

}

function requestElements(address, request){
	var httpRequest = request;
	var currentObject;

	//appel en synchrone (a voir pour les perfs)
	httpRequest.open("GET", address, false);
	httpRequest.setRequestHeader("content-type", "application/json")
	httpRequest.send();
	if (httpRequest.status == 200){
		currentObject = JSON.parse(httpRequest.responseText);
		return currentObject;
	}else{
		console.log("Erreur avec l'adresse '" + address + "'");
		return null;
	}

}


