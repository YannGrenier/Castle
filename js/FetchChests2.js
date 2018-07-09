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
var chests = [];
countChests(chests);
console.log(chests);


function countChests(chestTable){

	var basicUrl = "http://castles.poulpi.fr"
	var url = basicUrl + "/castles/1/rooms/entry";
	
	requestElements(url, countChestsInRooms, chestTable, basicUrl);
	//countChestsInRooms(chestTable, basicUrl, url, httpRequest);
	

	//console.log(subroomUrl);
	// console.log(room.id);
	// console.log(room.rooms);
	// console.log(room.chests);

	//return 0; 
	
}

//récupère les coffres pleins dans une pièces et ses sous pièces
function countChestsInRooms(chestTable, addressRoot, roomObject){
	
	var currentRoom = roomObject;
	if (currentRoom != null) {

		//gestion des coffres de la pièce

		var chestsInRoom = currentRoom.chests;
		var chestUrl = "";

		console.log("Room : " + currentRoom.id);
		for (var i = 0; i< chestsInRoom.length;i++){
			chestUrl = addressRoot + chestsInRoom[i];
			requestElements(chestUrl, checkChests, chestTable, addressRoot);
			//console.log(chestUrl);
			//checkChests(chestTable,chestUrl);
		}

		//gestion des sous pieces 
		var subrooms = currentRoom.rooms;
		
		for (var i = 0; i< subrooms.length;i++){
			subroomUrl =  addressRoot + subrooms[i];
			requestElements(subroomUrl, countChestsInRooms, chestTable, addressRoot);
			// console.log(subrooms[i]);
		}
	}
	
	
}

function checkChests(chestTable, addressRoot, chestObject){
	//requestElements(address);//var currentChest = 
	var currentChest = chestObject;
	var chestStatus;
	if (currentChest != null){
		 chestStatus = currentChest.status;
		 
		 if (chestStatus !== "This chest is empty :/ Try another one!"){
		 	console.log("TREASURE CHEST FOUND !!!! " + currentChest.id);
		 	chestTable.push(currentChest.id);
		 }
	}

}

function requestElements(address, callback, chestTable, basicAddress){
	
	//var currentObject;

	var httpRequest = new XMLHttpRequest();
	//appel en asynchrone (faire passer des arguments en parametre)
	var args = Array.prototype.slice.call(arguments,2);
	httpRequest.onload = function(){
		if (this.readyState == 4){
			if (this.status == 200){
				var currentObject = JSON.parse(httpRequest.responseText);
				args.push(currentObject);
				callback.apply(this,args);
			}else{
				console.error(this.statusText);
			}
		}
	}
	httpRequest.open("GET", address, true);
	httpRequest.setRequestHeader("content-type", "application/json")
	httpRequest.send();

}


