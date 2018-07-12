
var chests = [];
var rooms = [];
const site = 'http://castles.poulpi.fr'; 


var t = Date.now();


//cas avec http.get
// requestElements ('http://castles.poulpi.fr/castles/1/rooms/entry');
//cas avec http.request
requestElements (site + '/castles/1/rooms/entry');

//gestion de l'objet jSON
function manageObject(roomOrChestObject){
	if (chests.length > 0){
		console.log(chests);
	}
	//cas ou roomOrChestObject est une pièce
	if (roomOrChestObject.hasOwnProperty("chests") && roomOrChestObject.hasOwnProperty("rooms")){
			//gestion des sous-pièces 
		var subrooms = roomOrChestObject.rooms;
		var subroomUrl = "";
		for (var i = 0; i< subrooms.length;i++){
			subroomUrl = site+subrooms[i]//subrooms[i];// si http.get()
			console.log(subroomUrl);
			requestElements(subroomUrl);
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

	//pour définir le port
	var options= {
		hostname: site,
		port: 80,
  	path:  address,
  	method: 'GET',
	  headers: {
	    'Content-Type': 'application/JSON'
	  }
	};	
	//options.path = address;
	// console.log(options);

	var xhr = http.get(address, function readApi(res){
	//var xhr = http.get(options, function readApi(res){
		// console.log("STATUS: " + res.statusCode );
	 	//  console.log("HEADERS: " + JSON.stringify(res.headers));
	 	var stat = res.statusCode;
	 	var error;
	 	if (stat !== 200){
	 		error = new Error("Request failed : " + stat);
	 	}
	 	if (error){
	 		console.error(error.message);
	 		res.resume();
	 	}

	  var z = "";
	  var res1;
	  res.on('data',function(chunk){
	  		z = z + chunk;
		});
		
		res.on('end', function explore(){

			if (this.statusCode === 200){
				try{
					res1 = JSON.parse(z);
					//console.log(res1);
					//manageObject(res1);
					manageRooms(res1);
				}catch(e){
					console.log("Erreur de gestion de l'objet JSON trouvé: " + e.message);
				}
				// console.log("temps écoulé :"  + (Date.now()-t)/1000 + "s");
			}
		});

	});
	xhr.on("error",function(e){
		console.log("Error:" + e.message);
	})
	xhr.end();

}

function manageRooms(roomOrChestObject){
	if (roomOrChestObject.hasOwnProperty("rooms")){
			//gestion des sous-pièces 
		var subrooms = roomOrChestObject.rooms;
		var subroomUrl = "";
		for (var i = 0; i< subrooms.length;i++){
			subroomUrl =  site+subrooms[i];//subrooms[i];// si http.get()
			rooms.push(subroomUrl);
			console.log(subroomUrl);
			requestElements(subroomUrl);
			//chestNow = requestElements(subroomUrl, countChestsInRooms, chestNow, addressRoot);
			// console.log(subrooms[i]);
		}
	}
}
//myRequest.read();
//myRequest.send();