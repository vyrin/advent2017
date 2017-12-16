advent.day14 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;

		// parts = parts.map(x => parseInt(x));

		var grid = Array.fillMulti([128, 128], 0);
		var counted = Array.fillMulti([128, 128], 0);

		for (var i = 0; i < 128; i++) {
			var h = this.hash(input + "-" + i, true);
			for (var j = 0; j < h.length; j++) {
				grid[i][j] = parseInt(h[j]);
				if (grid[i][j]) {
					solution++;
				}
			}
		}

		this.answer(1, solution);

		var regions = 0;
		for (var x = 0; x < 128; x++) {
			for (var y = 0; y < 128; y++) {
				if (!counted[x][y] && grid[x][y]) {
					regions++;
					this.countRegion(x, y, counted, grid, regions);
				}
			}
		}

		this.answer(2, regions);
	},

	countRegion : function (x, y, counted, grid, count) {
		if (x < 0 || x >= 128 || y < 0 || y >= 128) {
			return;
		}
		if (!counted[x][y] && grid[x][y]) {
			counted[x][y] = 1;
			this.countRegion(x - 1, y, counted, grid, count);
			this.countRegion(x + 1, y, counted, grid, count);
			this.countRegion(x, y - 1, counted, grid, count);
			this.countRegion(x, y + 1, counted, grid, count);
		}
	},

	hash : function (input, binary) {
		// Part 2
		var len = input.length;

		var pc = 0;
		var skip = 0;
		var list = [];
		for (var i = 0; i < 256; i++) {
			list.push(i);
		}

		var q = [];
		for (var i = 0; i < len; i++) {
			q.push(input.charCodeAt(i));
		}

		q = q.concat([17, 31, 73, 47, 23]);

		parts = q;

		_.times(64, () => {
			parts.forEach(l => {
				var n = [];
				for (var i = 0; i < l; i++) {
					n.push(list[(pc + i) % 256]);
				}
				for (var i = l - 1; i >= 0; i--) {
					list[(pc + i) % 256] = n[l - i - 1];
				}
				pc += (l + skip);
				skip++;
			})
		})

		var dense = [];
		for (var i = 0; i < 256; i += 16) {
			var foo = 0;
			for (var j = i; j < i + 16; j++) {
				foo = foo ^ list[j];
			}
			dense.push(foo);
		}

		var solution = [];
		dense.forEach(f => {
			var h = f.toString(16);
			var len = h.length;
			for (var i = len; i < 2; i++) {
				h = "0" + h;
			}

			solution.push(h);
		})

		solution = solution.join("");

		if (binary) {
			var hex = {
				0: "0000",
				1: "0001",
				2: "0010",
				3: "0011",
				4: "0100",
				5: "0101",
				6: "0110",
				7: "0111",
				8: "1000",
				9: "1001",
				"a": "1010",
				"b": "1011",
				"c": "1100",
				"d": "1101",
				"e": "1110",
				"f": "1111",
			}

			var f = "";
			for (var q = 0; q < solution.length; q++) {
				f += hex[solution[q]];
			}

			solution = f;
		}

		return solution;

	}
});
