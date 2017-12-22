advent.day22 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var parts = input.split("\n");

		// parts = parts.map(x => parseInt(x));
		var offset = 1000;

		// Part 1

		var solution = 0;
		var grid = Array.fillMulti([2000, 2000], ".");

		parts.forEach((line, y) => {
			for (var x = 0; x < line.length; x++) {
				grid[x + offset][(parts.length - 1 - y) + offset] = line[x];
			}
		})

		var pos = _v(offset + 12, offset + 12);
		var dir = "w";

		for (var i = 0; i < 10000; i++) {
			if (grid[pos.x][pos.y] == "#") {
				dir = _v.wasdCW(dir);
			} else if (grid[pos.x][pos.y] == ".") {
				dir = _v.wasdCCW(dir);
			}
			if (grid[pos.x][pos.y] == ".") {
				solution++;
				grid[pos.x][pos.y] = "#";
			} else if (grid[pos.x][pos.y] == "#") {
				grid[pos.x][pos.y] = ".";
			}
			pos.wasdEquals(dir);
		}

		this.answer(1, solution);


		// Part 2

		var solution = 0;
		var grid = Array.fillMulti([2000, 2000], ".");

		parts.forEach((line, y) => {
			for (var x = 0; x < line.length; x++) {
				grid[x + offset][(parts.length - 1 - y) + offset] = line[x];
			}
		})

		var pos = _v(offset + 12, offset + 12);
		var dir = "w";

		for (var i = 0; i < 10000000; i++) {
			if (grid[pos.x][pos.y] == "#") {
				dir = _v.wasdCW(dir);
			} else if (grid[pos.x][pos.y] == ".") {
				dir = _v.wasdCCW(dir);
			} else if (grid[pos.x][pos.y] == "f") {
				dir = _v.wasdCW(dir);
				dir = _v.wasdCW(dir);
			}
			if (grid[pos.x][pos.y] == ".") {
				grid[pos.x][pos.y] = "w";
			} else if (grid[pos.x][pos.y] == "w") {
				solution++;
				grid[pos.x][pos.y] = "#";
			} else if (grid[pos.x][pos.y] == "#") {
				grid[pos.x][pos.y] = "f";
			} else if (grid[pos.x][pos.y] == "f") {
				grid[pos.x][pos.y] = ".";
			}
			pos.wasdEquals(dir);
		}

		this.answer(2, solution);
	},
});
