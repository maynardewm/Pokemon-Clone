// Image preloader
	(function($) {
	  var cache = [];
	  // Arguments are image paths relative to the current page.
	  jq.preLoadImages = function() {
		var args_len = arguments.length;
		for (var i = args_len; i--;) {
		  var cacheImage = document.createElement('img');
		  cacheImage.src = arguments[i];
		  cache.push(cacheImage);
		}
	  }
	})(jQuery)
	jQuery.preLoadImages("sprites/ash/ash-down.gif", "sprites/ash/ash-left.gif", "sprites/ash/ash-right.gif", "sprites/ash/ash-up.gif");

var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'music/PalletTown.ogg');
audioElement.load();
setTimeout(function() {
	audioElement.play();
}, 1000);

var audioElementTwo = document.createElement('audio2');
audioElementTwo.setAttribute('src', 'music/OakLab.ogg');
audioElementTwo.preload = 'auto';


// STOP AUDIO
jq("#disable-audio").click(function() {
	audioElement.pause();
});


// Create the canvas object
var CANVAS_WIDTH = 416;
var CANVAS_HEIGHT = 416;
var canvasElement = jq("<canvas id = 'game-box' width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('#wrapper');


var CANVAS_PLR_WIDTH = 416;
var CANVAS_PLR_HEIGHT = 416;
var canvasPlrElement = jq("<canvas id = 'canvas_plr' width='" + CANVAS_PLR_WIDTH + "' height='" + CANVAS_PLR_HEIGHT + "'></canvas>");
var canvasPlr = canvasPlrElement.get(0).getContext("2d");
canvasPlrElement.appendTo('#wrapper');

var CANVAS_NPC_WIDTH = 416;
var CANVAS_NPC_HEIGHT = 416;
var canvasNPCElement = jq("<canvas id = 'canvas_npc' width='" + CANVAS_NPC_WIDTH + "' height='" + CANVAS_NPC_HEIGHT + "'></canvas>");
var canvasNPC = canvasNPCElement.get(0).getContext("2d");
canvasNPCElement.appendTo('#wrapper');

var CANVAS_INF_WIDTH = 416;
var CANVAS_INF_HEIGHT = 416;
var canvasInfElement = jq("<canvas id = 'canvas_inf' width='" + CANVAS_INF_WIDTH + "' height='" + CANVAS_INF_HEIGHT + "'></canvas>");
var canvasInf = canvasInfElement.get(0).getContext("2d");
canvasInfElement.appendTo('#wrapper');

var CANVAS_MENU_WIDTH = 416;
var CANVAS_MENU_HEIGHT = 416;
var canvasMenuElement = jq("<canvas id = 'canvas_menu' width='" + CANVAS_MENU_WIDTH + "' height='" + CANVAS_MENU_HEIGHT + "'></canvas>");
var canvasMenu = canvasMenuElement.get(0).getContext("2d");
canvasMenuElement.appendTo('#wrapper');

//Set FPS of map
var FPS = 64;
setInterval(function() {
	draw();
	updatePlayer();
	movePlayer();
	signOpenNoMove();
	npcWallHit();
	npcDraw();
	girl1Move();
	if(activeDoors == true) {
	changeMap();
	}
}, 1000/FPS);

// Set FPS of player layer
setInterval(function() {
	drawPlayer();
	playerMove();
}, 140);

// Player object
var player = new Image();
player.src = "sprites/ash/ash-down.gif";
playerWidth = 32;
playerHeight = 32;
playerSX = 0;
playerSY = 0;
playerSWidth = 28;
playerSHeight = 32;
playerX = CANVAS_PLR_WIDTH/2 - playerWidth/2;
playerY = CANVAS_PLR_HEIGHT/2 - playerHeight/2;

/* ---------- GLOBAL VARIABLES ---------- */
var curMap = palletTown;
mapX = 32;
mapY = 32;
cenX = CANVAS_PLR_WIDTH/2 - playerWidth/2;
cenY = CANVAS_PLR_HEIGHT/2 - playerHeight/2;
moveSpeed = 2;
var tempFlag = false;
var tileWidth = 32;
var tileHeight = 32;
var playerMoving = false;
var movingLeft = false;
var movingRight = false;
var movingUp = false;
var movingDown = false;
var girl1MovingLeft = false;
var girl1MovingRight = false;
var girl1MovingUp = false;
var girl1MovingDown = false;
var wallHitRight = false;
var wallHitLeft = false;
var wallHitDown = false;
var wallHitUp = false;
counterRight = 1;
counterLeft = 1;
counterUp = 1;	
counterDown = 1;
var doorX = 0;
activeDoors = true;
var facing;
var canvasGameBoxFade = 300;
var canvasPlrFade = 1;
var curSong = "music/PalletTown.ogg"

// MAIN NPC HANDLING

function npcLoad() {
	if (curMap == palletTown) {
		npcPool.push(girl1);
	}
	if (curMap == myHouse) {
		
	}
}
npcLoad();

// reset each NPCs X and Y value for when the map changes
function npcReset() {
	for (var i=0;i<npcPool.length;i++) {
		item = npcPool[i];
		item.X = item.Xinit + mapX;
		item.Y = item.Yinit + mapY;	
	}
}
npcReset();


function npcDraw() {
	canvasNPC.clearRect(0, 0, CANVAS_PLR_WIDTH, CANVAS_PLR_HEIGHT); // Clears the canvas every frame
	for (var i=0;i<npcPool.length;i++) {
		item = npcPool[i];
		canvasNPC.drawImage(item,item.SX, item.SY, item.SWidth, item.SHeight, item.X, item.Y, item.width, item.height);
	}
}


/* ---------- MENU ---------- */
// GAME MENU
gameMenu = new Image();
gameMenu.src = "sprites/menu/main.gif";
gameMenuWidth = 160;
gameMenuHeight = 224;
gameMenuX = CANVAS_WIDTH - gameMenuWidth;
gameMenuY = 20;
gameMenuOpen = false;

jq(document).keyup(function(e) {
	var code = e.which;
	if(code == 13 && gameMenuOpen == false) {
		canvasMenu.drawImage(gameMenu, gameMenuX, gameMenuY);
		gameMenuOpen = true;
	} else if (code == 13 && gameMenuOpen == true) {
		canvasMenu.clearRect(0, 0, CANVAS_PLR_WIDTH, CANVAS_PLR_HEIGHT);
		gameMenuOpen = false;
	}
});


/* ---------- TEXT BOX / SIGNS ---------- */
textBox = new Image();
textBox.src = "sprites/menu/textbox.gif";
textBoxWidth = 416;
textBoxHeight = 125;
textBoxX = CANVAS_HEIGHT - textBoxWidth;
textBoxY = CANVAS_HEIGHT - textBoxHeight;
textBoxPaddingX = 25;
textBoxPaddingY = 40;
textBoxLineHeight = 24;

signID = new Array();
signOpen = false;
var theID;

function displayTextBox() {
	canvasMenu.drawImage(textBox, textBoxX, textBoxY);
	canvasMenu.font = "14pt Arial";
	textBoxLines = theID.txt.split('\n');
	for (var i = 0; i<textBoxLines.length; i++) {
		canvasMenu.fillText(textBoxLines[i], textBoxX + textBoxPaddingX, textBoxY + textBoxPaddingY + (i * textBoxLineHeight));
	}
	signOpen = true;
}

/* ---------- SIGNS ---------- */
var signsX = new Array();
var signsY = new Array();
function updateSigns() {
	for (var i=0;i<curMap.length;i++) {
		for(var j=0;j<curMap[i].length;j++) {
			var item = curMap[i][j];
			if(item.sign == true) {
				tileIdX = j*32 + mapX;
				tileIdY = i*32 + mapY;
				signsX.push(tileIdX);
				signsY.push(tileIdY);
				signID.push(item);
			}
		}
	}
	for (var i=0;i<npcPool.length;i++) {
			item = npcPool[i];
			tileIdX = item.X;
			tileIdY = item.Y;
			signsX.push(tileIdX);
			signsY.push(tileIdY);
			signID.push(item);
	}
}
updateSigns();

function signOpenNoMove() {
	if(signOpen == true && playerMoving == true) {
		tempFlag = true;
		freezemovement();
	}
}



jq(document).keyup(function(e) {
var code = e.which;
if(code == 90 && signOpen == false) {
	for(var i = 0; i < signsY.length; i++) {
		for(var j = 0; j < signsX.length; j++) {
			theID = signID[i];
			if(cenY == signsY[i] && cenX == signsX[i] - playerWidth && facing == "right") {
				displayTextBox();
			} else if (cenY == signsY[i] && cenX == signsX[i] + playerWidth && facing == "left") {
				displayTextBox();
			} else if (cenY == signsY[i] + playerHeight && cenX == signsX[i] && facing == "up") {
				displayTextBox();
			} else if (cenY == signsY[i] - playerHeight && cenX == signsX[i] && facing == "down") {
				displayTextBox();
			}
		}
					
	}
} else if(code == 90 && signOpen == true) {
				canvasMenu.clearRect(0, 0, CANVAS_PLR_WIDTH, CANVAS_PLR_HEIGHT);
				signOpen = false;
			}
});


/* ---------- DRAWING THE WALLS ---------- */
var wallsX = new Array();
var wallsY = new Array();

function drawWalls() {
	for (var i=0;i<curMap.length;i++) {
		for(var j=0;j<curMap[i].length;j++) {
			var item = curMap[i][j];
			if(item.barrier == true) {
				tileIdX = j*32 + mapX;
				tileIdY = i*32 + mapY;
				wallsX.push(tileIdX);
				wallsY.push(tileIdY);
			}
		}
	}
	
	// Make NPCs walls
	npcWallsX = new Array();
	npcWallsY = new Array();
	for (var i=0;i<npcPool.length;i++) {
		item = npcPool[i];
		npcWallsX.push(item.X);
		npcWallsY.push(item.Y);
	}
}
drawWalls();



/* ---------- MAP CHANGES ON CONDITION ---------- */

// Functions used for every time the map is changed
function changeMapEveryTime() {
	activeDoors = false;
	jq("#game-box").fadeOut(canvasGameBoxFade);
	jq("#canvas_plr").fadeOut(canvasPlrFade);
	jq("#canvas_npc").fadeOut(canvasPlrFade);
}

function changeMapEveryTimeout(curMapI, mapXI, mapYI, doorID) {
	// The order that these things are in is critical, do not change unless absolutely necessary!
	npcPool = new Array();
	curMap = curMapI;
	npcLoad();
	mapX = mapXI;
	mapY = mapYI;
	npcReset();
	updateSigns();
	cenX = CANVAS_PLR_WIDTH/2 - playerWidth/2;
	cenY = CANVAS_PLR_HEIGHT/2 - playerHeight/2;
	doorID.X = -1;
	doorID.Y = -1;
	wallsX = [];
	wallsY = [];
	drawWalls();
	jq("#game-box").fadeIn(canvasGameBoxFade);
	jq("#canvas_plr").fadeIn(canvasPlrFade);
	jq("#canvas_npc").fadeIn(canvasPlrFade);
}

function changeMap() {
	// dor01
	for (var i=0;i<curMap.length;i++) {
		for(var j=0;j<curMap[i].length;j++) {
			var item = curMap[i][j];
			if(item == dor01) {
				dor01.X = j*32 + mapX;
				dor01.Y = i*32 + mapY;
			}
		}
	}
		if(dor01.X == CANVAS_PLR_WIDTH/2 - playerWidth/2 && dor01.Y == CANVAS_PLR_HEIGHT/2 - playerHeight/2 && activeDoors == true) {
			changeMapEveryTime();
			window.setTimeout(function (){
				wallHitUp = false;
				changeMapEveryTimeout(myHouse, 96, -64, dor01);
			}, canvasGameBoxFade);
		}
		
	// dor02
	for (var i=0;i<curMap.length;i++) {
		for(var j=0;j<curMap[i].length;j++) {
			var item = curMap[i][j];
			if(item == dor02) {
				dor02.X= j*32 + mapX;
				dor02.Y = i*32 + mapY;
			}
		}
	}
		if(dor02.X == CANVAS_PLR_WIDTH/2 - playerWidth/2 && dor02.Y == CANVAS_PLR_HEIGHT/2 - playerHeight/2 && activeDoors == true) {
			changeMapEveryTime();
			window.setTimeout(function() {
				wallHitUp = false;
				changeMapEveryTimeout(garyHouse, 96, -64, dor02);
				/*
				curMap = garyHouse;
				mapX = 96;
				mapY = -64;
				cenX = CANVAS_PLR_WIDTH/2 - playerWidth/2;
				cenY = CANVAS_PLR_HEIGHT/2 - playerHeight/2;
				wallsX = [];
				wallsY = [];
				drawWalls();
				dor02X = -1;
				dor02Y = -1;
				jq("#game-box").fadeIn(canvasGameBoxFade);
				jq("#canvas_plr").fadeIn(canvasPlrFade);
				*/
			}, canvasGameBoxFade);
		}
		
	// dor03
	for (var i=0;i<curMap.length;i++) {
		for(var j=0;j<curMap[i].length;j++) {
			var item = curMap[i][j];
			if(item == dor03) {
				dor03.X= j*32 + mapX;
				dor03.Y = i*32 + mapY;
			}
		}
	}
		if(dor03.X == CANVAS_PLR_WIDTH/2 - playerWidth/2 && dor03.Y == CANVAS_PLR_HEIGHT/2 - playerHeight/2 && activeDoors == true) {
			audioFadeOutPalletTown();
			changeMapEveryTime();
			window.setTimeout(function (){
				wallHitUp = false;
				changeMapEveryTimeout(oakLab, 32, -160, dor03);
				/*
				curMap = oakLab;
				mapX = 32;
				mapY = -160;
				cenX = CANVAS_PLR_WIDTH/2 - playerWidth/2;
				cenY = CANVAS_PLR_HEIGHT/2 - playerHeight/2;
				wallsX = [];
				wallsY = [];
				drawWalls();
				dor03X = -1;
				dor03Y = -1;
				jq("#game-box").fadeIn(canvasGameBoxFade);
				jq("#canvas_plr").fadeIn(canvasPlrFade);
				*/
			}, canvasGameBoxFade);
		}	
		
	// dor0e
	for (var i=0;i<curMap.length;i++) {
		for(var j=0;j<curMap[i].length;j++) {
			var item = curMap[i][j];
			if(item == dor0e) {
				dor0e.X= j*32 + mapX;
				dor0e.Y = i*32 + mapY;
			}
		}
	}
		if(dor0e.X == CANVAS_PLR_WIDTH/2 - playerWidth/2 && dor0e.Y == CANVAS_PLR_HEIGHT/2 - playerHeight/2 - 2 && activeDoors == true) {
			changeMapEveryTime();
			wallHitDown = true;
			window.setTimeout(function (){
				wallHitDown = false;
				changeMapEveryTimeout(palletTown, 32, 32, dor0e);
				/*
				cenX = CANVAS_PLR_WIDTH/2 - playerWidth/2;
				cenY = CANVAS_PLR_HEIGHT/2 - playerHeight/2;
				npcPool = new Array();
				curMap = palletTown;
				npcLoad();
				mapX = 32;
				mapY = 32;
				wallsX = [];
				wallsY = [];
				drawWalls();
				dor0eX = -1;
				dor0eY = -1;
				jq("#game-box").fadeIn(canvasGameBoxFade);
				jq("#canvas_plr").fadeIn(canvasPlrFade);
				jq("#canvas_npc").fadeIn(canvasPlrFade);
				*/
			}, canvasGameBoxFade);
		}
		
	// dor1e
	for (var i=0;i<curMap.length;i++) {
		for(var j=0;j<curMap[i].length;j++) {
			var item = curMap[i][j];
			if(item == dor1e) {
				dor1e.X= j*32 + mapX;
				dor1e.Y = i*32 + mapY;
			}
		}
	}
		if(dor1e.X == CANVAS_PLR_WIDTH/2 - playerWidth/2 && dor1e.Y == CANVAS_PLR_HEIGHT/2 - playerHeight/2 - 2 && activeDoors == true) {
			changeMapEveryTime();
			wallHitDown = true;
			window.setTimeout(function (){
				wallHitDown = false;
				changeMapEveryTimeout(palletTown, 32, 32, dor1e);
				/*
				cenX = CANVAS_PLR_WIDTH/2 - playerWidth/2;
				cenY = CANVAS_PLR_HEIGHT/2 - playerHeight/2;
				curMap = palletTown;
				mapX = 32;
				mapY = 32;
				wallsX = [];
				wallsY = [];
				drawWalls();
				dor1eX = -1;
				dor1eY = -1;
				jq("#game-box").fadeIn(canvasGameBoxFade);
				jq("#canvas_plr").fadeIn(canvasPlrFade);
				*/
			}, canvasGameBoxFade);
		}
		
	// dor2e
	for (var i=0;i<curMap.length;i++) {
		for(var j=0;j<curMap[i].length;j++) {
			var item = curMap[i][j];
			if(item == dor2e) {
				dor2e.X= j*32 + mapX;
				dor2e.Y = i*32 + mapY;
			}
		}
	}
		if(dor2e.X == CANVAS_PLR_WIDTH/2 - playerWidth/2 && dor2e.Y == CANVAS_PLR_HEIGHT/2 - playerHeight/2 - 2 && activeDoors == true) {
			changeMapEveryTime();
			wallHitDown = true;
			window.setTimeout(function (){
				wallHitDown = false;
				changeMapEveryTimeout(palletTown, -224, 32, dor2e);
				/*
				cenX = CANVAS_PLR_WIDTH/2 - playerWidth/2;
				cenY = CANVAS_PLR_HEIGHT/2 - playerHeight/2;
				curMap = palletTown;
				mapX = -224;
				mapY = 32;
				wallsX = [];
				wallsY = [];
				drawWalls();
				dor2eX = -1;
				dor2eY = -1;
				jq("#game-box").fadeIn(canvasGameBoxFade);
				jq("#canvas_plr").fadeIn(canvasPlrFade);
				*/
			}, canvasGameBoxFade);
		}
		
	// dor3e
	for (var i=0;i<curMap.length;i++) {
		for(var j=0;j<curMap[i].length;j++) {
			var item = curMap[i][j];
			if(item == dor3e) {
				dor3e.X= j*32 + mapX;
				dor3e.Y = i*32 + mapY;
			}
		}
	}
		if(dor3e.X == CANVAS_PLR_WIDTH/2 - playerWidth/2 && dor3e.Y == CANVAS_PLR_HEIGHT/2 - playerHeight/2 - 2 && activeDoors == true) {
			changeMapEveryTime();
			wallHitDown = true;
			window.setTimeout(function (){
				wallHitDown = false;
				changeMapEveryTimeout(palletTown, -224, 32, dor3e);
				/*
				cenX = CANVAS_PLR_WIDTH/2 - playerWidth/2;
				cenY = CANVAS_PLR_HEIGHT/2 - playerHeight/2;
				curMap = palletTown;
				mapX = -224;
				mapY = 32;
				wallsX = [];
				wallsY = [];
				drawWalls();
				dor3eX = -1;
				dor3eY = -1;
				jq("#canvas_plr").fadeIn(canvasPlrFade);
				jq("#game-box").fadeIn(canvasGameBoxFade);
				*/
			}, canvasGameBoxFade);
		}
		
	// dor4e
	for (var i=0;i<curMap.length;i++) {
		for(var j=0;j<curMap[i].length;j++) {
			var item = curMap[i][j];
			if(item == dor4e) {
				dor4e.X= j*32 + mapX;
				dor4e.Y = i*32 + mapY;
			}
		}
	}
		if(dor4e.X == CANVAS_PLR_WIDTH/2 - playerWidth/2 && dor4e.Y == CANVAS_PLR_HEIGHT/2 - playerHeight/2 - 2 && activeDoors == true) {
			audioFadeOutOak();
			changeMapEveryTime();
			wallHitDown = true;
			window.setTimeout(function (){
				wallHitDown = false;
				changeMapEveryTimeout(palletTown, -192, -160, dor4e);
				/*
				cenX = CANVAS_PLR_WIDTH/2 - playerWidth/2;
				cenY = CANVAS_PLR_HEIGHT/2 - playerHeight/2;
				curMap = palletTown;
				mapX = -192;
				mapY = -160;
				wallsX = [];
				wallsY = [];
				drawWalls();
				dor4eX = -1;
				dor4eY = -1;
				jq("#canvas_plr").fadeIn(canvasPlrFade);
				jq("#game-box").fadeIn(canvasGameBoxFade);
				*/
			}, canvasGameBoxFade);
		}
		
	// dor5e
	for (var i=0;i<curMap.length;i++) {
		for(var j=0;j<curMap[i].length;j++) {
			var item = curMap[i][j];
			if(item == dor5e) {
				dor5e.X= j*32 + mapX;
				dor5e.Y = i*32 + mapY;
			}
		}
	}
		if(dor5e.X == CANVAS_PLR_WIDTH/2 - playerWidth/2 && dor5e.Y == CANVAS_PLR_HEIGHT/2 - playerHeight/2 - 2 && activeDoors == true) {
			audioFadeOutOak();
			changeMapEveryTime();
			wallHitDown = true;
			window.setTimeout(function (){
				wallHitDown = false;
				changeMapEveryTimeout(palletTown, -192, -160, dor5e);
				/*
				cenX = CANVAS_PLR_WIDTH/2 - playerWidth/2;
				cenY = CANVAS_PLR_HEIGHT/2 - playerHeight/2;
				curMap = palletTown;
				mapX = -192;
				mapY = -160;
				wallsX = [];
				wallsY = [];
				drawWalls();
				dor5eX = -1;
				dor5eY = -1;
				jq("#canvas_plr").fadeIn(canvasPlrFade);
				jq("#game-box").fadeIn(canvasGameBoxFade);
				*/
			}, canvasGameBoxFade);
		}
		
	
		
	// sta01
	for (var i=0;i<curMap.length;i++) {
		for(var j=0;j<curMap[i].length;j++) {
			var item = curMap[i][j];
			if(item == sta01) {
				sta01.X = j*32 + mapX;
				sta01.Y = i*32 + mapY;
			}
		}
	}
		if(sta01.X == CANVAS_PLR_WIDTH/2 - playerWidth/2 && sta01.Y == CANVAS_PLR_HEIGHT/2 - playerHeight/2 && activeDoors == true) {
			changeMapEveryTime();
			window.setTimeout(function (){
				changeMapEveryTimeout(myRoom, -64, 128, sta01);
				/*
				cenX = CANVAS_PLR_WIDTH/2 - playerWidth/2;
				cenY = CANVAS_PLR_HEIGHT/2 - playerHeight/2;
				curMap = myRoom;
				mapX = -64;
				mapY = 128;
				wallsX = [];
				wallsY = [];
				drawWalls();
				sta01X = -1;
				sta01Y = -1;
				jq("#canvas_plr").fadeIn(canvasPlrFade);
				jq("#game-box").fadeIn(canvasGameBoxFade);
				*/
			}, canvasGameBoxFade);
		}
		
	// sta02
	for (var i=0;i<curMap.length;i++) {
		for(var j=0;j<curMap[i].length;j++) {
			var item = curMap[i][j];
			if(item == sta02) {
				sta02.X = j*32 + mapX;
				sta02.Y = i*32 + mapY;
			}
		}
	}
		if(sta02.X == CANVAS_PLR_WIDTH/2 - playerWidth/2 && sta02.Y == CANVAS_PLR_HEIGHT/2 - playerHeight/2 && activeDoors == true) {
			changeMapEveryTime();
			window.setTimeout(function (){
				changeMapEveryTimeout(myHouse, -64, 128, sta02);
				/*
				cenX = CANVAS_PLR_WIDTH/2 - playerWidth/2;
				cenY = CANVAS_PLR_HEIGHT/2 - playerHeight/2;
				curMap = myHouse;
				mapX = -64;
				mapY = 128;
				wallsX = [];
				wallsY = [];
				drawWalls();
				sta02X = -1;
				sta02Y = -1;
				jq("#canvas_plr").fadeIn(canvasPlrFade);
				jq("#game-box").fadeIn(canvasGameBoxFade);
				*/
			}, canvasGameBoxFade);
		}
}

function drawNPC() {
	canvasNPC.clearRect(0, 0, CANVAS_NPC_WIDTH, CANVAS_NPC_HEIGHT); // Clears the canvas every frame
	canvasNPC.drawImage(player,playerSX, playerSY, playerSWidth, playerSHeight, playerX,playerY, playerWidth, playerHeight);
}



// Control player animations
function drawPlayer() {
	canvasPlr.clearRect(0, 0, CANVAS_PLR_WIDTH, CANVAS_PLR_HEIGHT); // Clears the canvas every frame
	canvasPlr.drawImage(player,playerSX, playerSY, playerSWidth, playerSHeight, playerX,playerY, playerWidth, playerHeight);
}

function playerMove() {
	if (movingRight == true || wallHitRight == true) {
		canvasPlr.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Clears the canvas every frame
		player.src = "sprites/ash/ash-right.gif";
		counterRight++;
		if (counterRight >= 2) {
			counterRight = 0;
		}
		playerSX = 28 * counterRight ;
		canvasPlr.drawImage(player,playerSX, playerSY, playerSWidth, playerSHeight, playerX,playerY, playerWidth, playerHeight);
	}
	if (!keydown.right) {
		playerSX = 0;
		counterRight = 0;
	}
	
	if (movingLeft == true || wallHitLeft == true) {
		canvasPlr.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Clears the canvas every frame
		player.src = "sprites/ash/ash-left.gif";
		counterLeft++;
		if (counterLeft >= 2) {
			counterLeft = 0;
		}
		playerSX = 28 * counterLeft ;
		canvasPlr.drawImage(player,playerSX, playerSY, playerSWidth, playerSHeight, playerX,playerY, playerWidth, playerHeight);
	}
	if (!keydown.left) {
		playerSX = 0;
		counterLeft = 0;
	}
	
	if (movingUp == true || wallHitUp == true) {
		canvasPlr.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Clears the canvas every frame
		player.src = "sprites/ash/ash-up.gif";
		counterUp++;
		if (counterUp >= 2) {
			counterUp = 0;
		}
		playerSX = 28 * counterUp ;
		canvasPlr.drawImage(player,playerSX, playerSY, playerSWidth, playerSHeight, playerX,playerY, playerWidth, playerHeight);
	}
	if (!keydown.up) {
		playerSX = 0;
		counterUp = 0;
	}
	
	if (movingDown == true || wallHitDown == true) {
		canvasPlr.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Clears the canvas every frame
		player.src = "sprites/ash/ash-down.gif";
		counterDown++;
		if (counterDown >= 2) {
			counterDown = 0;
		}
		playerSX = 28 * counterDown ;
		canvasPlr.drawImage(player,playerSX, playerSY, playerSWidth, playerSHeight, playerX,playerY, playerWidth, playerHeight);
	}
	if (!keydown.down && !keydown.up) {
		playerSX = 0;
		counterDown = 0;
	} 
	
}

function updatePlayer() {
if (keydown.down && !keydown.up) {
	for(var i = 0; i < wallsY.length; i++) {
		if(cenY == wallsY[i] - tileHeight  && cenX > wallsX[i] - tileWidth && cenX < wallsX[i] + tileWidth) {
			wallHitDown = true
			break;
		} else {
			continue;
		}
	}
		movingDown = true;
		playerMoving = true;	
}
	
if (keydown.up && !keydown.down) {
	for(var i = 0; i < wallsY.length; i++) {
		if(cenY == wallsY[i] + tileHeight  && cenX > wallsX[i] - tileWidth && cenX < wallsX[i] + tileWidth) {
			wallHitUp = true
			break;
		} else {
			continue;
		}
	}
		movingUp = true;
		playerMoving = true;	
}
	
if (keydown.left && !keydown.right && !keydown.down && !keydown.up) {
	for(var i = 0; i < wallsX.length; i++) {
		if(cenX == wallsX[i] + tileWidth && cenY > wallsY[i] - tileHeight && cenY < wallsY[i] + tileHeight) {
			wallHitLeft = true;
			break;
		} else {
			continue
		}
	}
		movingLeft = true;
		playerMoving = true;	
}
if (keydown.right && !keydown.left && !keydown.down && !keydown.up) {
	for(var i = 0; i < wallsX.length; i++) {
		if(cenX == wallsX[i] - tileWidth && cenY > wallsY[i] - tileHeight && cenY < wallsY[i] + tileHeight) {
			wallHitRight = true;
			break;
		} else {
			continue;
			
		}
	}
			movingRight = true;
			playerMoving = true;	
	}
}


function movePlayer() {
if(movingUp == true) {
	if(wallHitUp == false) {
		activeDoors = true;
	}
	if(mapX % tileWidth == 0) {
		for (var i=0;i<npcPool.length;i++) {
			item = npcPool[i];
			item.Y = item.Y + moveSpeed;
		}
		movingLeft = false;
		movingRight = false;
		movingDown = false;
		wallHitLeft = false;
		wallHitRight = false;
		mapY = mapY + moveSpeed;
		cenY = cenY - moveSpeed;
		facing = "up";
	}
	if(mapY % tileHeight == 0) {
		playerMoving = false;
		movingUp = false;	
	}
	if(wallHitUp == true && !keydown.down) {
		for (var i=0;i<npcPool.length;i++) {
			item = npcPool[i];
			item.Y = item.Y - moveSpeed;
		}
		mapY = mapY - moveSpeed;
		cenY = cenY + moveSpeed;
		playerMoving = false;
		movingDown = false;
		movingUp = false;
	}
}
	
if(movingDown == true) {
	if(wallHitDown == false) {
		activeDoors = true;
	}
	if(mapX % tileWidth == 0) {
		for (var i=0;i<npcPool.length;i++) {
			item = npcPool[i];
			item.Y = item.Y - moveSpeed;
		}
		movingRight = false;
		movingLeft = false;
		movingUp = false;
		wallHitLeft = false;
		wallHitRight = false;
		mapY = mapY - moveSpeed;
		cenY = cenY + moveSpeed;
		facing = "down";
	}
	if(mapY % tileWidth == 0) {
		playerMoving = false;
		movingDown = false;	
	}
	if(wallHitDown == true && !keydown.up) {
		for (var i=0;i<npcPool.length;i++) {
			item = npcPool[i];
			item.Y = item.Y + moveSpeed;
		}
		mapY = mapY + moveSpeed;
		cenY = cenY - moveSpeed;
		playerMoving = false;
		movingDown = false;	
		movingUp = false;
	}
}

if(movingLeft == true) {
	if(wallHitLeft == false) {
		activeDoors = true;
		for (var i=0;i<npcPool.length;i++) {
			item = npcPool[i];
			item.X = item.X + moveSpeed;
		}
	}
	movingUp = false;
	movingDown = false;
	movingRight = false;
	wallHitDown = false;
	wallHitUp = false;
	mapX = mapX + moveSpeed;
	cenX = cenX - moveSpeed;
	facing = "left";
	if(mapX % tileWidth == 0) {
		playerMoving = false;
		movingLeft = false;	
	}
	if(wallHitLeft == true && !keydown.right && !keydown.up && !keydown.down) {
		mapX = mapX - moveSpeed;
		cenX = cenX + moveSpeed;
		playerMoving = false;
		movingLeft = false;	
		movingRight = false;
	}
}

if(movingRight == true) {
	if(wallHitRight == false) {
		activeDoors = true;
		for (var i=0;i<npcPool.length;i++) {
			item = npcPool[i];
			item.X = item.X - moveSpeed;
		}
	}
	movingUp = false;
	movingDown = false;
	movingLeft = false;
	wallHitDown = false;
	wallHitUp = false;
	mapX = mapX - moveSpeed;
	cenX = cenX + moveSpeed;
	facing = "right";
	if(mapX % tileWidth == 0) {
		playerMoving = false;
		movingRight = false;
	}
	if(wallHitRight == true && !keydown.left && !keydown.up && !keydown.down) {
		mapX = mapX + moveSpeed;
		cenX = cenX - moveSpeed;
		playerMoving = false;
		movingRight = false;
		movingLeft = false;
	}
}
	if(!keydown.up) {
		wallHitUp = false;	
	}
	if(!keydown.down) {
		wallHitDown = false;	
	}	
	if(!keydown.right) {
		wallHitRight = false;	
	}
	if(!keydown.left) {
		wallHitLeft = false;	
	}

}

function freezemovement() {
	if(keydown.right) {
		mapX = mapX + moveSpeed;
		cenX = cenX - moveSpeed;
		facing = 'undefined';
		playerMoving = false;
		movingRight = false;
		for (var i=0;i<npcPool.length;i++) {
			item = npcPool[i];
			item.X = item.X + moveSpeed;
		}
	}
	if(keydown.left) {
		mapX = mapX - moveSpeed;
		cenX = cenX + moveSpeed;
		facing = 'undefined';
		playerMoving = false;
		movingLeft = false;
		for (var i=0;i<npcPool.length;i++) {
			item = npcPool[i];
			item.X = item.X - moveSpeed;
		}
	}
	if(keydown.up) {
		mapY = mapY - moveSpeed;
		cenY = cenY + moveSpeed;
		facing = 'undefined';
		playerMoving = false;
		movingUp = false;
		for (var i=0;i<npcPool.length;i++) {
			item = npcPool[i];
			item.Y = item.Y - moveSpeed;
		}
	}
	if(keydown.down) {
			movingDown = false;
			mapY = mapY + moveSpeed;
			cenY = cenY - moveSpeed;
			facing = 'undefined';
			playerMoving = false;
			for (var i=0;i<npcPool.length;i++) {
				item = npcPool[i];
				item.Y = item.Y + moveSpeed;
			}
		}
	
}

/* ---------- NPC MOVE ---------- */

	setInterval(function() {
		var number = 4 //Math.floor(Math.random() * 4) + 1;
		if(number == 1) {
			girl1.moving = true;
			girl1MovingLeft = true;	
		}
		if(number == 2) {
			girl1.moving = true;
			girl1MovingRight = true;	
		}
		if(number == 3) {
			girl1.moving = true;
			girl1MovingUp = true;	
		}
		if(number == 4) {
			girl1.moving = true;
			girl1MovingDown = true;
		}
		if(number == 5) {
			
		}
	}, 5000);
	

function npcWallHit() {
	for(var i = 0; i < wallsY.length; i++) {
		if(girl1.Y == wallsY[i] - tileHeight  && girl1.X > wallsX[i] - tileWidth && girl1.X < wallsX[i] + tileWidth) {
			girl1.wallHitDown = true;
			girl1.moving = false;
			girl1MovingDown = false;
		} else {
			girl1.wallHitDown = false;
		}
	}
	
	
}

function girl1Move() {
	if(girl1.moving == true) {
		if(girl1MovingLeft==true) {
			girl1MovingRight = false;
			girl1MovingUp = false;
			girl1MovingDown = false;
			girl1.X = girl1.X - moveSpeed;
			if(girl1.X % tileWidth == 0) {
				girl1.moving = false;
				girl1MovingLeft = false;
			}
		}
		if(girl1MovingRight==true) {
			girl1MovingLeft = false;
			girl1MovingUp = false;
			girl1MovingDown = false;
			girl1.X = girl1.X + moveSpeed;
			if(girl1.X % tileWidth == 0) {
				girl1.moving = false;
				girl1MovingRight = false;
			}
		}
		if(girl1MovingUp==true && girl1.wallHitUp == false) {
			girl1.wallHitUp = true;
			girl1MovingLeft = false;
			girl1MovingRight = false;
			girl1MovingDown = false;
			girl1.Y = girl1.Y - moveSpeed;
			if(girl1.Y % tileWidth == 0) {
				girl1.moving = false;
				girl1MovingUp = false;
			}
		}
		if(girl1MovingDown==true && girl1.wallHitDown == false) {
				girl1MovingLeft = false;
				girl1MovingRight = false;
				girl1MovingUp = false;
				girl1.Y = girl1.Y + moveSpeed;
				if(girl1.Y % tileWidth == 0) {
					girl1.moving = false;
					girl1MovingDown = false;
					npcWallHit();
				}
		}
	}
}


function draw() {
	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Clears the canvas every frame
	canvasInf.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Clears the canvas every frame
	curMap = curMap;
	for (var i=0;i<curMap.length;i++) {
		for(var j=0;j<curMap[i].length;j++) {
			if(curMap[i][j]) {
				tileImg = curMap[i][j];
				try { // FF Fix using a try catch err so the change of maps loads correctly
				canvas.drawImage(tileImg, j*32 + mapX, i*32 + mapY);}catch(err){}
			}
		}
	}
	
	canvasInf.font="12px Arial red";
	canvasInf.fillText("cenX = " + cenX,10,20);
	canvasInf.fillText("cenY = " + cenY,10,40);
	canvasInf.fillText("mapX = " + mapX,10,60);
	canvasInf.fillText("mapY = " + mapY,10,80);

	canvasInf.fillText("wallHitRight = " + wallHitRight,10,120);
	canvasInf.fillText("wallHitLeft = " + wallHitLeft,10,140);
	canvasInf.fillText("wallHitDown = " + wallHitDown,10,160);
	canvasInf.fillText("wallHitUp = " + wallHitUp,10,180);
	
	canvasInf.fillText("movingRight = " + movingRight,10,220);
	canvasInf.fillText("movingLeft = " + movingLeft,10,240);
	canvasInf.fillText("movingDown = " + movingDown,10,260);
	canvasInf.fillText("movingUp = " + movingUp,10,280);
	
	canvasInf.fillText("counterRight = " + counterRight,10,320);
	canvasInf.fillText("counterLeft = " + counterLeft,10,340);
	canvasInf.fillText("counterDown = " + counterDown,10,360);
	canvasInf.fillText("counterUp = " + counterUp,10,380);
	
	canvasInf.fillText("wallsX = " + wallsX.length,150,20);
	canvasInf.fillText("wallsY = " + wallsY.length,150,40);
	canvasInf.fillText("sta01X = " + sta01.X,150,60);
	canvasInf.fillText("sta01Y = " + sta01.Y,150,80);
	
	canvasInf.fillText("activeDoors = " + activeDoors,150,100);
	canvasInf.fillText("gameMenuOpen = " + gameMenuOpen,150,120);
	canvasInf.fillText("signOpen = " + signOpen,150,140);
	canvasInf.fillText("facing = " + facing,150,160);
	canvasInf.fillText("girl1.X = " + girl1.X,150,180);
	canvasInf.fillText("girl1.Y = " + girl1.Y,150,200);
	canvasInf.fillText("playerMoving = " + playerMoving,150,220);
	canvasInf.fillText("tempFlag = " + tempFlag,150,240);
	canvasInf.fillText("girl1.moving = " + girl1.moving,150,260);
	canvasInf.fillText("girl1MovingLeft = " + girl1MovingLeft,150,280);
	canvasInf.fillText("girl1MovingRight = " + girl1MovingRight,150,300);
	canvasInf.fillText("girl1MovingUp = " + girl1MovingUp,150,320);
	canvasInf.fillText("girl1MovingDown = " + girl1MovingDown,150,340);
	canvasInf.fillText("girl1.wallHitDown = " + girl1.wallHitDown,150,360);
	

}

