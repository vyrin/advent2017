advent.day05 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;

		for (var step = 1; step <= 2; step++) {
			var parts = input.split("\n");
			parts = _.map(parts, x => parseInt(x));

			var pc = 0;
			var count = 0;
			while (true) {
				var i = parts[pc];
				if (i === undefined) {
					break;
				}
				if (step == 2 && i >= 3) {
					parts[pc]--;
				} else {
					parts[pc]++;
				}
				pc += i;
				count++;
			}
			this.answer(step, count);
		}

	},
});
