advent.day06 = advent.Day.extend({
	solve : function () {
		var input = this.input;

		var solution = 0;
		var parts = input.split("\t");

		parts = _.map(parts, x => parseInt(x));

		var len = parts.length;

		var pc = 0;
		var keys = {};

		while (true) {
			solution++;
			var max = -10000;
			var index = 0;
			parts.forEach((part, i) => {
				if (part > max) {
					index = i;
					max = part;
				}
			})
			var q = parts[index];
			parts[index] = 0;
			for (var j = 1; j <= q; j++) {
				var m = (index + j) % len;
				parts[m]++;
			}

			var string = JSON.stringify(parts);
			if (keys[string]) {
				break;
			}
			keys[string] = solution;
		}

		this.answer(1, solution);
		this.answer(2, solution - keys[string]);
	},
});
