advent.day21 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;
		var parts = input.split("\n");

		var regex = /(.*) => (.*)/

		var rules = {};
		parts.forEach(line => {
			var m = line.match(regex);

			var a0 = m[1].split("/");
			var sub = Array.fillMulti([a0.length, a0[0].length], 0);
			for (var x = 0; x < a0.length; x++) {
				for (var y = 0; y < a0.length; y++) {
					sub[x][y] = a0[x][y];
				}
			}
			var key = JSON.stringify(sub);

			a0 = m[2].split("/");
			sub = Array.fillMulti([a0.length, a0[0].length], 0);
			for (var x = 0; x < a0.length; x++) {
				for (var y = 0; y < a0.length; y++) {
					sub[x][y] = a0[x][y];
				}
			}
			rules[key] = sub;
		})

		var grid = ".#./..#/###";
		var a0 = grid.split("/");
		var sub = Array.fillMulti([a0.length, a0[0].length], 0);
		for (var x = 0; x < a0.length; x++) {
			for (var y = 0; y < a0.length; y++) {
				sub[x][y] = a0[x][y];
			}
		}
		grid = sub;
		
		for (var i = 0; i < 18; i++) {
			if (grid.length % 2 == 0) {
				var subs = this.split(grid, 2);
			} else {
				var subs = this.split(grid, 3);
			}
			var after = Array.fillMulti([subs.length, subs[0].length], 0);
			for (var x = 0; x < subs.length; x++) {
				for (var y = 0; y < subs[0].length; y++) {
					var s0 = subs[x][y];
					var all = this.allVersions(s0);
					_.some(all, s => {
						var j = JSON.stringify(s);
						if (rules[j]) {
							after[x][y] = _.cloneDeep(rules[j]);
							return true;
						}
					})
				}
			}
			grid = this.combine(after);

			if (i == 4) {
				var solution = 0;
				for (var x = 0; x < grid.length; x++) {
					for (var y = 0; y < grid[0].length; y++) {
						if (grid[x][y] == "#") {
							solution++;
						}
					}
				}
				this.answer(1, solution);
			}
		}

		var solution = 0;
		for (var x = 0; x < grid.length; x++) {
			for (var y = 0; y < grid[0].length; y++) {
				if (grid[x][y] == "#") {
					solution++;
				}
			}
		}
		this.answer(2, solution);
	},

	split : function (p, div) {
		var size = p.length / div;
		var subs = Array.fillMulti([size, size], 0);
		for (var x = 0; x < size; x++) {
			for (var y = 0; y < size; y++) {
				subs[x][y] = Array.fillMulti([div, div]);
				for (var y0 = 0; y0 < div; y0++) {
					for (var x0 = 0; x0 < div; x0++) {
						subs[x][y][x0][y0] = p[x * div + x0][y * div + y0];
					}
				}
			}
		}

		return subs;
	},

	combine : function (subs) {
		var size = subs.length;
		var div = subs[0][0].length;
		var result = Array.fillMulti([size * div, size * div])
		for (var x = 0; x < size; x++) {
			for (var y = 0; y < size; y++) {
				for (var y0 = 0; y0 < div; y0++) {
					for (var x0 = 0; x0 < div; x0++) {
						result[x * div + x0][y * div + y0] = subs[x][y][x0][y0];
					}
				}
			}
		}
		return result;
	},

	allVersions : function(p) {
		var all = [];
		all.push(p);
		p = this.rotate(p);
		all.push(p);
		p = this.flip(p);
		all.push(p);
		p = this.rotate(p);
		all.push(p);
		p = this.flip(p);
		all.push(p);
		p = this.rotate(p);
		all.push(p);
		p = this.flip(p);
		all.push(p);
		p = this.rotate(p);
		all.push(p);

		return all;
	},

	rotate : function (a) {
		var result = Array.fillMulti([a.length, a[0].length], 0);
		for (var x = 0; x < a.length; x++) {
			for (var y = 0; y < a[0].length; y++) {
				result[x][y] = a[y][x];
			}
		}
		return result;
	},

	flip : function (a) {
		var result = Array.fillMulti([a.length, a[0].length], 0);
		for (var x = 0; x < a.length; x++) {
			for (var y = 0; y < a[0].length; y++) {
				result[x][y] = a[(a.length - 1) - x][y];
			}
		}
		return result;
	},
});
