advent.day11 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;
		var parts = input.split(",");

		// parts = parts.map(x => parseInt(x));

		var pos = _v(0, 0);

		var dirs = {
			"s": _v(-1, -1),
			"n": _v(1, 1),
			"ne": _v(1, 0),
			"nw": _v(0, 1),
			"se": _v(0, -1),
			"sw": _v(-1, 0),
		}

		var max = 0;
		var dist = 0;
		parts.forEach(step => {
			var dir = dirs[step];
			pos.addEquals(dir);
			dist = _.max([pos.x, pos.y]);
			if (dist > max) {
				max = dist;
			}
		})

		this.answer(1, dist);
		this.answer(2, max);
	},
});
