var palletTown = Array(
	[rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01], 
	[rck01, grs03, bln01, grs01, bln01, grs01, bln01, grs01, bln01, grs01, bln01, grs01, bln01, grs01, bln01, grs01, grs01, bln01, grs03, rck01], 
	[rck01, grs03, grs01, bln01, hou01, hou02, hou02, hou03, grs01, bln01, grs01, bln01, hou01, hou02, hou02, hou03, bln01, grs01, grs03, rck01], 
	[rck01, grs03, grs02, grs02, hou04, hou05, hou06, hou07, bln01, grs01, grs02, grs02, hou04, hou05, hou06, hou07, grs01, bln01, grs03, rck01], 
	[rck01, grs03, grs02, sgn01, hou08, dor01, hou10, hou11, grs01, bln01, grs02, sgn02, hou08, dor02, hou10, hou11, bln01, grs01, grs03, rck01], 
	[rck01, grs03, bln01, grs01, bln01, grs01, bln01, grs01, bln01, grs01, bln01, grs01, bln01, grs01, bln01, grs01, grs01, bln01, grs03, rck01], 
	[rck01, grs03, grs01, bln01, grs01, bln01, grs01, bln01, grs01, bln01, grs01, bln01, grs01, bln01, grs01, bln01, bln01, grs01, grs03, rck01], 
	[rck01, grs03, bln01, grs01, grs02, grs02, grs02, grs02, bln01, grs01, oak15, oak01, oak01, oak01, oak01, oak16, grs01, bln01, grs03, rck01], 
	[rck01, grs03, grs01, bln01, fen01, fen01, fen01, sgn03, grs01, bln01, oak13, oak02, oak02, oak02, oak02, oak14, bln01, grs01, grs03, rck01], 
	[rck01, grs03, bln01, grs01, grs03, grs03, grs03, grs03, bln01, grs01, oak03, oak04, oak05, oak06, oak07, oak08, grs01, bln01, grs03, rck01], 
	[rck01, grs03, grs01, bln01, grs03, grs03, grs03, grs03, grs01, bln01, oak09, oak10, dor03, oak10, oak10, oak12, bln01, grs01, grs03, rck01], 
	[rck01, grs03, bln01, grs01, bln01, grs01, bln01, grs01, bln01, grs01, grs02, grs02, grs02, grs02, grs02, grs02, grs02, grs02, grs03, rck01], 
	[rck01, grs03, grs01, bln01, grs01, bln01, grs01, bln01, grs01, bln01, fen01, fen01, fen01, sgn04, fen01, fen01, grs02, grs02, grs03, rck01], 
	[rck01, grs03, grs03, grs03, wtr01, wtr02, wtr03, wtr04, grs02, grs02, grs03, grs03, grs03, grs03, grs03, grs03, grs02, grs02, grs03, rck01], 
	[rck01, grs03, grs03, grs03, wtr05, wtr06, wtr06, wtr07, grs02, grs02, grs03, grs03, grs03, grs03, grs03, grs03, grs02, grs02, grs03, rck01], 
	[rck01, grs03, grs03, grs03, wtr05, wtr06, wtr06, wtr07, grs02, grs02, grs02, grs02, grs02, grs02, grs02, grs02, grs02, grs02, grs03, rck01], 
	[rck01, rck01, grs03, grs03, wtr05, wtr06, wtr06, wtr07, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01], 
	[rck01, rck01, rck01, rck01, wtr05, wtr06, wtr06, wtr07, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01, rck01]

);

var myHouse = Array(
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, boo01, boo01, wal01, wal02, wal01, wal02, wal01, wal02, empty],
	[empty, boo02, boo02, flr01, tve01, flr01, flr01, flr01, sta01, empty],
	[empty, flr01, flr01, flr01, flr01, flr01, flr01, flr01, flr01, empty],
	[empty, flr01, flr01, flr01, flr01, flr01, flr01, flr01, flr01, empty],
	[empty, flr01, flr01, cha01, tbl01, tbl02, cha01, flr01, flr01, empty],
	[empty, flr01, flr01, cha01, tbl03, tbl04, cha01, flr01, flr01, empty],
	[empty, flr01, flr01, flr01, flr01, flr01, flr01, flr01, flr01, empty],
	[empty, flr01, flr01, dor0e, dor1e, flr01, flr01, flr01, flr01, empty],
	[empty, empty, empty, 00000, 00000, empty, empty, empty, empty, empty]

);
	var myRoom = Array(
		[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
		[empty, cmp01, tbl05, tbl06, wal01, wal01, wal02, wal01, wal02, empty],
		[empty, cmp02, tbl07, tbl08, flr01, flr01, flr01, flr01, sta02, empty],
		[empty, flr01, flr01, flr01, flr01, flr01, flr01, flr01, flr01, empty],
		[empty, flr01, flr01, flr01, flr01, flr01, flr01, flr01, flr01, empty],
		[empty, flr01, flr01, flr01, tve01, flr01, flr01, flr01, flr01, empty],
		[empty, flr01, flr01, flr01, nes01, flr01, flr01, flr01, flr01, empty],
		[empty, bed01, flr01, flr01, flr01, flr01, flr01, flr01, pot01, empty],
		[empty, bed02, flr01, flr01, flr01, flr01, flr01, flr01, pot02, empty],
		[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty]
	
	);
	
var garyHouse = Array(
	[empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
	[empty, boo01, boo01, wal01, pic01, wal01, wal03, wal01, boo01, empty],
	[empty, boo02, boo02, flr01, flr01, flr01, flr01, flr01, boo02, empty],
	[empty, flr01, flr01, flr01, tbl13, flr01, flr01, flr01, flr01, empty],
	[empty, flr01, flr01, cha01, tbl09, tbl10, cha01, flr01, flr01, empty],
	[empty, flr01, flr01, cha01, tbl11, tbl12, cha01, flr01, flr01, empty],
	[empty, flr01, flr01, flr01, flr01, flr01, flr01, flr01, flr01, empty],
	[empty, flr01, flr01, flr01, flr01, flr01, flr01, flr01, flr01, empty],
	[empty, flr01, flr01, dor2e, dor3e, flr01, flr01, flr01, flr01, empty],
	[empty, empty, empty, 00000, 00000, empty, empty, empty, empty, empty]

);

var oakLab = Array(
	[empty, okw01, okw01, okw01, okw01, okw02, okw02, boo03, boo03, boo03, boo03, empty],
	[empty, okc01, okc02, okt01, okt02, okf01, okf01, boo02, boo02, boo02, boo02, empty],
	[empty, okc03, okc04, okt03, okt04, okf01, okf01, okt05, okt06, okt07, okf01, empty],
	[empty, okf01, okf01, okf01, okf01, okf01, okf01, okt08, okt09, okt10, okf01, empty],
	[empty, okf01, okf01, okf01, okf01, okf01, okf01, okt11, okt12, okt13, okf01, empty],
	[empty, okf01, okf01, okf01, okf01, okf01, okf01, okf01, okf01, okf01, okf01, empty],
	[empty, boo03, boo03, boo03, boo03, okf01, okf01, boo03, boo03, boo03, boo03, empty],
	[empty, boo02, boo02, boo02, boo02, okf01, okf01, boo02, boo02, boo02, boo02, empty],
	[empty, okf01, okf01, okf01, okf01, okf01, okf01, okf01, okf01, okf01, okf01, empty],
	[empty, okf01, okf01, okf01, okf01, okf01, okf01, okf01, okf01, okf01, okf01, empty],
	[empty, okf01, okf01, okf01, okf01, okf01, okf01, okf01, okf01, okf01, okf01, empty],
	[empty, okf01, okf01, okf01, okf01, dor4e, dor5e, okf01, okf01, okf01, okf01, empty],
	[empty, empty, empty, empty, empty, 00000, 00000, empty, empty, empty, empty, empty]

);