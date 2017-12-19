advent.day19 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;
		var lines = input.split("\n");

		var pos = _v(0, 0);

		var grid = Array.fillMulti([lines[0].length, lines.length], " ");
		lines.forEach((line, y) => {
			for (var x = 0; x < line.length; x++) {
				grid[x][y] = line[x];
				if (y == 0 && line[x] == "|") {
					pos = _v(x, 0);
				}
			}
		})

		var dir = "w";
		var solution = "";
		var count = 0;
		while (true) {
			var c = grid[pos.x][pos.y];
			// console.log(c, pos);
			if (c === undefined) {
				break;
			}
			if (c == "|" || c == "-") {
				pos.wasdEquals(dir);
			} else if (c == "+") {
				var cw = _v.wasdCW(dir);
				var n = pos.wasd(cw);
				if (grid[n.x] && grid[n.x][n.y] != " ") {
					dir = cw;
				} else {
					dir = _v.wasdCCW(dir);
				}
				pos.wasdEquals(dir);
			} else if (c == " ") {
				break;
			} else {
				solution += c;
				pos.wasdEquals(dir);
			}
			count++;
		}

		this.answer(1, solution);
		this.answer(2, count);
	},
});
