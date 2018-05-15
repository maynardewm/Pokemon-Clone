function debug() {
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
	canvasInf.fillText("npcNumber.length = " + npcNumber.length,150,360);
	canvasInf.fillText("numMoved = " + numMoved,150,380);
	canvasInf.fillText("numPlayerMoved = " + numPlayerMoved,150,400);
}