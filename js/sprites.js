/* ---------- NPCs---------- */
var npcPool = new Array();

var girl1 = new Image();
girl1.src = "sprites/npc/girl1-down.gif";
girl1.width = 32;
girl1.height = 32;
girl1.SX = 0;
girl1.SY = 0;
girl1.SWidth = 32;
girl1.SHeight = 32;
girl1.Xinit = 224;
girl1.Yinit = 352;
girl1.X = 224;
girl1.Y = 352;
girl1.wallX = 224;
girl1.wallY = 352;
girl1.barrier = true;
girl1.sign = true;
girl1.txt = "hello";
girl1.moving = false;
girl1.wallHitDown = false;
girl1.wallHitUp = false;


/* ---------- WORLD ---------- */
var empty = new Image();
empty.barrier = true;

var rck01 = new Image();
rck01.src = "sprites/world/rck01.jpg";
rck01.barrier = true;

var grs01 = new Image();
grs01.src = "sprites/world/grs01.jpg";
grs01.barrier = false;

var grs02 = new Image();
grs02.src = "sprites/world/grs02.gif";
grs02.barrier = false;

var grs03 = new Image();
grs03.src = "sprites/world/grs03.gif";
grs03.barrier = false;

var bln01 = new Image();
bln01.src = "sprites/world/bln01.jpg";
bln01.barrier = false;

var fen01 = new Image();
fen01.src = "sprites/world/fen01.gif";
fen01.barrier = true;


/* ---------- SIGNS ---------- */
var sgn01 = new Image();
sgn01.src = "sprites/world/sgn01.gif";
sgn01.barrier = true;
sgn01.sign = true;
sgn01.txt = "My house."

var sgn02 = new Image();
sgn02.src = "sprites/world/sgn01.gif";
sgn02.barrier = true;
sgn02.sign = true;
sgn02.txt = "Gary's house."

var sgn03 = new Image();
sgn03.src = "sprites/world/sgn01.gif";
sgn03.barrier = true;
sgn03.sign = true;
sgn03.txt = "PALLET TOWN\nShades of your journey await!";

var sgn04 = new Image();
sgn04.src = "sprites/world/sgn01.gif";
sgn04.barrier = true;
sgn04.sign = true;
sgn04.txt = "OAK POKéMON RESEARCH LAB";

/* ----------WATER ---------- */
var wtr01 = new Image();
wtr01.src = "sprites/water/wtr01.gif";
wtr01.barrier = true;

var wtr02 = new Image();
wtr02.src = "sprites/water/wtr02.gif";
wtr02.barrier = true;

var wtr03 = new Image();
wtr03.src = "sprites/water/wtr03.gif";
wtr03.barrier = true;

var wtr04 = new Image();
wtr04.src = "sprites/water/wtr04.gif";
wtr04.barrier = true;

var wtr05 = new Image();
wtr05.src = "sprites/water/wtr05.gif";
wtr05.barrier = true;

var wtr06 = new Image();
wtr06.src = "sprites/water/wtr06.gif";
wtr06.barrier = true;

var wtr07 = new Image();
wtr07.src = "sprites/water/wtr07.gif";
wtr07.barrier = true;

/* ---------- DOORS ---------- */
var dor01 = new Image();
dor01.src = "sprites/house/dor01.gif";
dor01.barrier = false;
dor01.X = 0;
dor01.Y = 0;

var dor02 = new Image();
dor02.src = "sprites/house/dor01.gif";
dor02.barrier = false;
dor02.map = "empty";
dor02.X = 0;
dor02.Y = 0;

var dor03 = new Image();
dor03.src = "sprites/house/dor01.gif";
dor03.barrier = false;
dor03.map = "empty";
dor03.X = 0;
dor03.Y = 0;

var dor0e = new Image();
dor0e.src = "sprites/house/mat01.gif";
dor0e.barrier = false;
dor0e.X = 0;
dor0e.Y = 0;

var dor1e = new Image();
dor1e.src = "sprites/house/mat01.gif";
dor1e.barrier = false;
dor1e.X = 0;
dor1e.Y = 0;

var dor2e = new Image();
dor2e.src = "sprites/house/mat01.gif";
dor2e.barrier = false;
dor2e.X = 0;
dor2e.Y = 0;

var dor3e = new Image();
dor3e.src = "sprites/house/mat01.gif";
dor3e.barrier = false;
dor3e.X = 0;
dor3e.Y = 0;

var dor4e = new Image();
dor4e.src = "sprites/oak/mat02.gif";
dor4e.barrier = false;
dor4e.X = 0;
dor4e.Y = 0;

var dor5e = new Image();
dor5e.src = "sprites/oak/mat02.gif";
dor5e.barrier = false;
dor5e.X = 0;
dor5e.Y = 0;

var sta01 = new Image();
sta01.src = "sprites/house/sta01.gif";
sta01.barrier = false;
sta01.X = 0;
sta01.Y = 0;

var sta02 = new Image();
sta02.src = "sprites/house/sta02.gif";
sta02.barrier = false;
sta02.X = 0;
sta02.Y = 0;

/* ----------HOUSE ----------- */
var hou01 = new Image();
hou01.src = "sprites/house/hou01.gif";
hou01.barrier = true;

var hou02 = new Image();
hou02.src = "sprites/house/hou02.gif";
hou02.barrier = true;

var hou03 = new Image();
hou03.src = "sprites/house/hou03.gif";
hou03.barrier = true;

var hou04 = new Image();
hou04.src = "sprites/house/hou04.gif";
hou04.barrier = true;

var hou05 = new Image();
hou05.src = "sprites/house/hou05.gif";
hou05.barrier = true;

var hou06 = new Image();
hou06.src = "sprites/house/hou06.gif";
hou06.barrier = true;

var hou07 = new Image();
hou07.src = "sprites/house/hou07.gif";
hou07.barrier = true;

var hou08 = new Image();
hou08.src = "sprites/house/hou08.gif";
hou08.barrier = true;

var hou10 = new Image();
hou10.src = "sprites/house/hou10.gif";
hou10.barrier = true;

var hou11 = new Image();
hou11.src = "sprites/house/hou11.gif";
hou11.barrier = true;

var oak01 = new Image();
oak01.src = "sprites/house/oak01.gif";
oak01.barrier = true;

var oak02 = new Image();
oak02.src = "sprites/house/oak02.gif";
oak02.barrier = true;

var oak03 = new Image();
oak03.src = "sprites/house/oak03.gif";
oak03.barrier = true;

var oak04 = new Image();
oak04.src = "sprites/house/oak04.gif";
oak04.barrier = true;

var oak05 = new Image();
oak05.src = "sprites/house/oak05.gif";
oak05.barrier = true;

var oak06 = new Image();
oak06.src = "sprites/house/oak06.gif";
oak06.barrier = true;

var oak07 = new Image();
oak07.src = "sprites/house/oak07.gif";
oak07.barrier = true;

var oak08 = new Image();
oak08.src = "sprites/house/oak08.gif";
oak08.barrier = true;

var oak09 = new Image();
oak09.src = "sprites/house/oak09.gif";
oak09.barrier = true;

var oak10 = new Image();
oak10.src = "sprites/house/oak10.gif";
oak10.barrier = true;

var oak11 = new Image();
oak11.src = "sprites/house/oak11.gif";
oak11.barrier = true;

var oak12 = new Image();
oak12.src = "sprites/house/oak12.gif";
oak12.barrier = true;

var oak13 = new Image();
oak13.src = "sprites/house/oak13.gif";
oak13.barrier = true;

var oak14 = new Image();
oak14.src = "sprites/house/oak14.gif";
oak14.barrier = true;

var oak15 = new Image();
oak15.src = "sprites/house/oak15.gif";
oak15.barrier = true;

var oak16 = new Image();
oak16.src = "sprites/house/oak16.gif";
oak16.barrier = true;

/* ----------HOUSE INSIDE ---------- */
var flr01 = new Image();
flr01.src = "sprites/house/flr01.gif";
flr01.barrier = false;

var wal01 = new Image();
wal01.src = "sprites/house/wal01.gif";
wal01.barrier = true;

var wal02 = new Image();
wal02.src = "sprites/house/wal02.gif";
wal02.barrier = true;

var wal03 = new Image();
wal03.src = "sprites/house/wal02.gif";
wal03.barrier = true;

var pic01 = new Image();
pic01.src = "sprites/house/pic01.gif";
pic01.barrier = true;

var boo01 = new Image();
boo01.src = "sprites/house/boo01.gif";
boo01.barrier = true;

var boo02 = new Image();
boo02.src = "sprites/house/boo02.gif";
boo02.barrier = true;

var boo03 = new Image();
boo03.src = "sprites/oak/boo03.gif";
boo03.barrier = true;

var tve01 = new Image();
tve01.src = "sprites/house/tve01.gif";
tve01.barrier = true;

var mat01 = new Image();
mat01.src = "sprites/house/mat01.gif";
mat01.barrier = false;

var cha01 = new Image();
cha01.src = "sprites/house/cha01.gif";
cha01.barrier = false;

var tbl01 = new Image();
tbl01.src = "sprites/house/tbl01.gif";
tbl01.barrier = true;

var tbl02 = new Image();
tbl02.src = "sprites/house/tbl02.gif";
tbl02.barrier = true;

var tbl03 = new Image();
tbl03.src = "sprites/house/tbl03.gif";
tbl03.barrier = true;

var tbl04 = new Image();
tbl04.src = "sprites/house/tbl04.gif";
tbl04.barrier = true;

var tbl05 = new Image();
tbl05.src = "sprites/house/tbl05.gif";
tbl05.barrier = true;

var tbl06 = new Image();
tbl06.src = "sprites/house/tbl06.gif";
tbl06.barrier = true;


var tbl07 = new Image();
tbl07.src = "sprites/house/tbl07.gif";
tbl07.barrier = true;

var tbl08 = new Image();
tbl08.src = "sprites/house/tbl08.gif";
tbl08.barrier = true;

var tbl09 = new Image();
tbl09.src = "sprites/house/tbl09.gif";
tbl09.barrier = true;

var tbl10 = new Image();
tbl10.src = "sprites/house/tbl10.gif";
tbl10.barrier = true;

var tbl11 = new Image();
tbl11.src = "sprites/house/tbl11.gif";
tbl11.barrier = true;

var tbl12 = new Image();
tbl12.src = "sprites/house/tbl12.gif";
tbl12.barrier = true;

var tbl13 = new Image();
tbl13.src = "sprites/house/tbl13.gif";
tbl13.barrier = false;

var bed01 = new Image();
bed01.src = "sprites/house/bed01.gif";
bed01.barrier = true;

var bed02 = new Image();
bed02.src = "sprites/house/bed02.gif";
bed02.barrier = true;

var pot01 = new Image();
pot01.src = "sprites/house/pot01.gif";
pot01.barrier = true;

var pot02 = new Image();
pot02.src = "sprites/house/pot02.gif";
pot02.barrier = true;

var cmp01 = new Image();
cmp01.src = "sprites/house/cmp01.gif";
cmp01.barrier = true;

var cmp02 = new Image();
cmp02.src = "sprites/house/cmp02.gif";
cmp02.barrier = true;

var nes01 = new Image();
nes01.src = "sprites/house/nes01.gif";
nes01.barrier = true;

/* ----------OAK---------- */

var okf01 = new Image();
okf01.src = "sprites/oak/okf01.gif";
okf01.barrier = false;

var okc01 = new Image();
okc01.src = "sprites/oak/okc01.gif";
okc01.barrier = true;

var okc02 = new Image();
okc02.src = "sprites/oak/okc02.gif";
okc02.barrier = true;

var okc03 = new Image();
okc03.src = "sprites/oak/okc03.gif";
okc03.barrier = false;

var okc04 = new Image();
okc04.src = "sprites/oak/okc04.gif";
okc04.barrier = false;

var okw01 = new Image();
okw01.src = "sprites/oak/okw01.gif";
okw01.barrier = true;

var okw02 = new Image();
okw02.src = "sprites/oak/okw02.gif";
okw02.barrier = true;

var mat02 = new Image();
mat02.src = "sprites/oak/mat02.gif";
mat02.barrier = false;

var okt01 = new Image();
okt01.src = "sprites/oak/okt01.gif";
okt01.barrier = true;

var okt02 = new Image();
okt02.src = "sprites/oak/okt02.gif";
okt02.barrier = true;

var okt03 = new Image();
okt03.src = "sprites/oak/okt03.gif";
okt03.barrier = false;

var okt04 = new Image();
okt04.src = "sprites/oak/okt04.gif";
okt04.barrier = false;

var okt05 = new Image();
okt05.src = "sprites/oak/okt05.gif";
okt05.barrier = true;

var okt06 = new Image();
okt06.src = "sprites/oak/okt06.gif";
okt06.barrier = true;

var okt07 = new Image();
okt07.src = "sprites/oak/okt07.gif";
okt07.barrier = true;

var okt08 = new Image();
okt08.src = "sprites/oak/okt08.gif";
okt08.barrier = true;

var okt09 = new Image();
okt09.src = "sprites/oak/okt09.gif";
okt09.barrier = true;

var okt10 = new Image();
okt10.src = "sprites/oak/okt10.gif";
okt10.barrier = true;

var okt11 = new Image();
okt11.src = "sprites/oak/okt11.gif";
okt11.barrier = false;

var okt12 = new Image();
okt12.src = "sprites/oak/okt12.gif";
okt12.barrier = false;

var okt13 = new Image();
okt13.src = "sprites/oak/okt13.gif";
okt13.barrier = false;

var spritesLoaded = true;