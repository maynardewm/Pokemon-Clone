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
	drawWalls();
	draw();
	updatePlayer();
	movePlayer();
	signOpenNoMove();
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

function between(x, y) {
  return x >= y - 16 && x <= y + 16;
}

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
var curSong = "music/PalletTown.ogg";
var npcNumber = ["up", "down", "left", "right"];
var numMoved = 0;
var numPlayerMoved = 0;

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
	wallsX = [];
	wallsY = [];
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
	for (var i=0;i<npcPool.length;i++) {
		item = npcPool[i];
		wallsX.push(item.X);
		wallsY.push(item.Y);
	}
	
	// Make your character a wall
	wallsX.push(cenX);
	wallsY.push(cenY);
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
if (keydown.down && playerMoving == false && !keydown.up) {
	for(var i = 0; i < wallsY.length; i++) {
		if(wallsY[i] == cenY + tileHeight  && wallsX[i] == cenX) {
			wallHitDown = true
			break;
		} else {
			continue;
		}
	}
		movingDown = true;
		playerMoving = true;	
}
	
if (keydown.up && playerMoving == false && !keydown.down) {
	for(var i = 0; i < wallsY.length; i++) {
		if(wallsY[i] == cenY - tileHeight  && wallsX[i] == cenX) {
			wallHitUp = true
			break;
		} else {
			continue;
		}
	}
		movingUp = true;
		playerMoving = true;	
}
	
if (keydown.left && playerMoving == false && !keydown.right && !keydown.down && !keydown.up) {
	for(var i = 0; i < wallsX.length; i++) {
		if(wallsX[i]  == cenX - tileWidth && wallsY[i] == cenY) {
			wallHitLeft = true;
			break;
		} else {
			continue
		}
	}
		movingLeft = true;
		playerMoving = true;	
}
if (keydown.right && playerMoving == false && !keydown.left && !keydown.down && !keydown.up) {
	for(var i = 0; i < wallsX.length; i++) {
		if(wallsX[i]  == cenX + tileWidth && wallsY[i] == cenY) {
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
if(movingUp == true && wallHitUp == false) {
	if(wallHitUp == false) {
		activeDoors = true;
	}
		movingLeft = false;
		movingRight = false;
		movingDown = false;
		wallHitLeft = false;
		wallHitRight = false;
		
		mapY = mapY + moveSpeed;
		numPlayerMoved = numPlayerMoved + moveSpeed;
		facing = "up";
		
		girl1.Y = girl1.Y + moveSpeed;

	if(numPlayerMoved == tileHeight) {
		playerMoving = false;
		movingUp = false;
		numPlayerMoved = 0;	
	}
}
	
if(movingDown == true && wallHitDown == false) {
	if(wallHitDown == false) {
		activeDoors = true;
	}
		movingRight = false;
		movingLeft = false;
		movingUp = false;
		wallHitLeft = false;
		wallHitRight = false;
		mapY = mapY - moveSpeed;
		numPlayerMoved = numPlayerMoved + moveSpeed;
		facing = "down";
		
		girl1.Y = girl1.Y - moveSpeed;
		
	if(numPlayerMoved == tileHeight) {
		playerMoving = false;
		movingDown = false;	
		numPlayerMoved = 0;	
	}
}

if(movingLeft == true && wallHitLeft == false) {
	if(wallHitLeft == false) {
		activeDoors = true;
	}
	movingUp = false;
	movingDown = false;
	movingRight = false;
	wallHitDown = false;
	wallHitUp = false;
	
	mapX = mapX + moveSpeed;
	numPlayerMoved = numPlayerMoved + moveSpeed;
	facing = "left";
	
	girl1.X = girl1.X + moveSpeed;
	
	if(numPlayerMoved == tileWidth) {
		playerMoving = false;
		movingLeft = false;
		numPlayerMoved = 0;		
	}
}

if(movingRight == true && wallHitRight == false) {
	if(wallHitRight == false) {
		activeDoors = true;
	}
	movingUp = false;
	movingDown = false;
	movingLeft = false;
	wallHitDown = false;
	wallHitUp = false;
	mapX = mapX - moveSpeed;
	numPlayerMoved = numPlayerMoved + moveSpeed;
	facing = "right";
	
	girl1.X = girl1.X - moveSpeed;
	
	if(numPlayerMoved == tileWidth) {
		playerMoving = false;
		movingRight = false;
		numPlayerMoved = 0;		
	}
}


// If you hit a wall stop moving
if(wallHitRight == true) {
	movingRight = false;
	playerMoving = false;	
}
if(wallHitLeft == true) {
	movingLeft = false;	
	playerMoving = false;
}
if(wallHitUp == true) {
	movingUp = false;
	playerMoving = false;
}
if(wallHitDown == true) {
	movingDown = false;	
	playerMoving = false;
}
/* ---------- */

// Helps stop the animations if you are against a wall and stop moving
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
			facing = 'undefined';
			playerMoving = false;
			for (var i=0;i<npcPool.length;i++) {
				item = npcPool[i];
				item.Y = item.Y + moveSpeed;
			}
		}
	
}

/* ---------- NPC MOVE ---------- */
function checkWalls() {
	// Figure out which direction the NPC can't travel
	npcNumber = ["up", "down", "left", "right"];
	console.log(girl1.Y)
	for(var i = 0; i < wallsY.length; i++) {
		if( between(girl1.Y, wallsY[i] - tileHeight) && between(girl1.X , wallsX[i])) {
			console.log("Can't move Down")
			var index = npcNumber.indexOf("down");
			npcNumber.splice(index, 1);
			girl1MovingDown = false;
		}
		if (between(girl1.Y, wallsY[i] + tileHeight) && between(girl1.X , wallsX[i]))  {
			console.log("Can't move Up")
			var index = npcNumber.indexOf("up");
			npcNumber.splice(index, 1);
			girl1MovingUp = false;
		}
		if (between(girl1.X, wallsX[i] - tileHeight) && between(girl1.Y , wallsY[i])) {
			console.log("Can't move right")
			var index = npcNumber.indexOf("right");
			npcNumber.splice(index, 1);
			girl1MovingRight = false;
		}
		
		if (between(girl1.X, wallsX[i] + tileHeight) && between(girl1.Y , wallsY[i])) {
			console.log("Can't move left")
			var index = npcNumber.indexOf("left");
			npcNumber.splice(index, 1);
			girl1MovingLeft = false;
		}
	}	
}

setInterval(function() {
	checkWalls();
	console.log(npcNumber)
	var item = npcNumber[Math.floor(Math.random()*npcNumber.length)];
	//console.log("value:" + item);
	if(item == "left") {
		girl1.moving = true;
		girl1MovingLeft = true;	
	}
	if(item == "right") {
		girl1.moving = true;
		girl1MovingRight = true;	
	}
	if(item == "up") {
		girl1.moving = true;
		girl1MovingUp = true;	
	}
	if(item == "down") {
		girl1.moving = true;
		girl1MovingDown = true;
	}
	if(item == 'five') {
		
	}
}, 1000);
	
function girl1Move() {
	if(girl1.moving == true) {
		if(girl1MovingLeft==true) {
			girl1MovingRight = false;
			girl1MovingUp = false;
			girl1MovingDown = false;
			girl1.X = girl1.X - moveSpeed;
			numMoved = numMoved + moveSpeed;
			if(numMoved == tileWidth) {
				girl1.moving = false;
				girl1MovingLeft = false;
				numMoved = 0;
			}
		}
		if(girl1MovingRight==true) {
			girl1MovingLeft = false;
			girl1MovingUp = false;
			girl1MovingDown = false;
			girl1.X = girl1.X + moveSpeed;
			numMoved = numMoved + moveSpeed;
			if(numMoved == tileWidth) {
				girl1.moving = false;
				girl1MovingRight = false;
				numMoved = 0;
			}
		}
		if(girl1MovingUp==true) {
			girl1.wallHitUp = true;
			girl1MovingLeft = false;
			girl1MovingRight = false;
			girl1MovingDown = false;
			girl1.Y = girl1.Y - moveSpeed;
			numMoved = numMoved + 2;
			if(numMoved == tileHeight) {
				girl1.moving = false;
				girl1MovingUp = false;
				numMoved = 0;
			}
		}
		if(girl1MovingDown==true) {
			girl1MovingLeft = false;
			girl1MovingRight = false;
			girl1MovingUp = false;
			girl1.Y = girl1.Y + moveSpeed;
			numMoved = numMoved + 2;
			if(numMoved == tileHeight) {
				girl1.moving = false;
				girl1MovingDown = false;
				numMoved = 0;
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
	debug();

}

