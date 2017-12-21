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
			sub = Array.fillMulti([a0.length, a0[0].length], (x, y) => a0[x][y]);
			rules[key] = sub;
		})

		var grid = ".#./..#/###";
		var a0 = grid.split("/");
		sub = Array.fillMulti([a0.length, a0[0].length], (x, y) => a0[x][y]);
		grid = sub;
		
		for (var i = 0; i < 18; i++) {
			if (grid.length % 2 == 0) {
				var subs = this.split(grid, 2);
			} else {
				var subs = this.split(grid, 3);
			}
			subs.iter2D((sub, x, y) => {
				var all = this.allVersions(sub);
				_.some(all, s => {
					var j = JSON.stringify(s);
					if (rules[j]) {
						subs[x][y] = _.cloneDeep(rules[j]);
						return true;
					}
				})
			})
			grid = this.combine(subs);

			if (i == 4) {
				var solution = 0;
				grid.iter2D((val, x, y) => {
					if (val == "#") {
						solution++;
					}
				})
				this.answer(1, solution);
			}
		}

		var solution = 0;
		grid.iter2D((val, x, y) => {
			if (val == "#") {
				solution++;
			}
		})
		this.answer(2, solution);
	},

	split : function (p, div) {
		var size = p.length / div;
		var subs = Array.fillMulti([size, size], 0);
		subs.iter2D((val, x, y) => {
			subs[x][y] = Array.fillMulti([div, div], (x0, y0) => p[x * div + x0][y * div + y0]);
		})

		return subs;
	},

	combine : function (subs) {
		var size = subs.length;
		var div = subs[0][0].length;
		var result = Array.fillMulti([size * div, size * div]);
		subs.iter2D((val, x, y) => {
			subs[x][y].iter2D((v, x0, y0) => {
				result[x * div + x0][y * div + y0] = v;
			})
		})
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
		a.iter2D((val, x, y) => {
			result[y][x] = val;
		})
		return result;
	},

	flip : function (a) {
		var result = Array.fillMulti([a.length, a[0].length], 0);
		a.iter2D((val, x, y) => {
			result[(a.length - 1) - x][y] = val;
		})
		return result;
	},
});
