
var chests = [];
const site = 'http://castles.poulpi.fr'; 


var t = Date.Now;
//countChests(chests);
requestElements ('http://castles.poulpi.fr/castles/1/rooms/entry');
console.log(chests);
console.log("temps écoulé :"  + (Date.Now-t)/1000 + "s")

//gestion de l'objet jSON
function manageObject(roomOrChestObject){

	//cas ou roomOrChestObject est une pièce
	if (roomOrChestObject.hasOwnProperty("chests")){
			//gestion des sous-pièces 
		var subrooms = roomOrChestObject.rooms;
		var subroomUrl = "";
		for (var i = 0; i< subrooms.length;i++){
			subroomUrl =  site + subrooms[i];
			console.log(subroomUrl);
			requestElements(subroomUrl, chests);
			//chestNow = requestElements(subroomUrl, countChestsInRooms, chestNow, addressRoot);
			// console.log(subrooms[i]);
		}

		//gestion des coffres de la pièce
		var chestsInRoom = roomOrChestObject.chests;
		var chestUrl = "";
		for (var j=0;j<chestsInRoom.length;j++){
			chestUrl = site + chestsInRoom[j];
			requestElements(chestUrl, chests);
		}

	}else if (roomOrChestObject.hasOwnProperty("status")){
		//gestion du coffre
		var chestStatus = roomOrChestObject.status;
		if (chestStatus !== "This chest is empty :/ Try another one!"){
		 	console.log("TREASURE CHEST FOUND !!!! " + currentChest.id);
		 	chests.push(roomOrChestObject.id);
	  }	
	}

}


function requestElements(address){
	var http = require('http');
	//let args = Array.prototype.slice.call(arguments, 1);
	
	var xhr = http.get(address, function(res){
		// console.log("STATUS: " + res.statusCode );
	 //  console.log("HEADERS: " + JSON.stringify(res.headers));
	  let z = "";
	  let res1;
	  res.on('data',function(chunk){
	  		z = z + chunk;
		});
		
		res.on('end', function(){
				
				// console.log(JSON.parse(z));
				try{
					res1 = JSON.parse(z);
					manageObject(res1);
				}catch(e){
					console.log("Erreur de gestion de l'objet JSON trouvé: " + e.message);
				}
				
		});
		
	});
	xhr.on("error",function(e){
		console.log("Error:" + e.message);
	})
	xhr.end();

}
//myRequest.read();
//myRequest.send();
