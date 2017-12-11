advent.day11 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;
		var parts = input.split(",");

		// parts = parts.map(x => parseInt(x));

		var map = Array.fillMulti([200, 200], 0);
		var pos = _v(0, 0);

		var even = {
			"s": _v(0, -1),
			"n": _v(0, 1),
			"ne": _v(-1, 0.5),
			"nw": _v(1, 0.5),
			"se": _v(-1, -0.5),
			"sw": _v(1, -0.5),
		}

		var foo = {};

		var max = 0;

		parts.forEach(step => {
			var dir = even[step];
			pos.addEquals(dir);
			var dist = (Math.abs(pos.x) + Math.abs(pos.y - (pos.x / 2)))
			if (dist > max) {
				max = dist;
			}
		})

		var dist = (Math.abs(pos.x) + Math.abs(pos.y - (pos.x / 2)))

		this.answer(1, dist);
		this.answer(2, max);
	},
});
