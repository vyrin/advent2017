advent.day13 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;
		var parts = input.split("\n");

		// Part 1

		var layers = [];
		var pos = [];
		var dirs = [];

		parts.forEach(part => {
			var p = part.split(": ").map(x => parseInt(x));
			var j = p[0];
			layers[j] = p[1];
			dirs[j] = 1;
			pos[j] = 0;
		})

		for (var i = 0; i < layers.length; i++) {
			if (pos[i] === 0) {
				solution += layers[i] * i;
			}
			for (var j = 0; j < layers.length; j++) {
				if (layers[j]) {
					pos[j] += dirs[j];
					if (pos[j] == 0) {
						dirs[j] = 1;
					} else if (pos[j] == layers[j] - 1) {
						dirs[j] = -1;
					}
				}
			}
		}

		this.answer(1, solution);

		// Part 2

		var layers = [];
		var pos = [];
		var dirs = [];

		parts.forEach(part => {
			var p = part.split(": ").map(x => parseInt(x));
			var j = p[0];
			layers[p[0]] = p[1];
			dirs[j] = 1;
			pos[j] = 0;
			for (var q = 0; q < j; q++) {
				pos[j] += dirs[j];
				if (pos[j] == 0) {
					dirs[j] = 1;
				} else if (pos[j] == layers[j] - 1) {
					dirs[j] = -1;
				}
			}
		})

		var count = 0;
		while (true) {
			var safe = true;
			for (var j = 0; j < layers.length; j++) {
				if (pos[j] === 0) {
					safe = false;
				}
			}
			if (safe) {
				break;
			}
			count++;

			for (var j = 0; j < layers.length; j++) {
				if (layers[j]) {
					pos[j] += dirs[j];
					if (pos[j] == 0) {
						dirs[j] = 1;
					} else if (pos[j] == layers[j] - 1) {
						dirs[j] = -1;
					}
				}
			}

		}

		this.answer(2, count);

	},
});
