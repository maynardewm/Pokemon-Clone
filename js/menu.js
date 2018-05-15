/* ---------- MENU ---------- */
// GAME MENU
var gameMenu = new Image();
gameMenu.src = "sprites/menu/main.gif";
var gameMenuWidth = 160;
var gameMenuHeight = 224;
var gameMenuX = CANVAS_WIDTH - gameMenuWidth;
var gameMenuY = 20;
var gameMenuOpen = false;

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