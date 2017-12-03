advent.day01 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var delta = 1;
		var total = 0;
		for (var i = 0; i < len; i++) {
			var c = input[i];
			var j = (i + delta) % len;
			var d = input[j];
			if (c == d) {
				total += parseInt(c);
			}
		}

		this.answer(1, total);

		var delta = len / 2;
		var total = 0;
		for (var i = 0; i < len; i++) {
			var c = input[i];
			var j = (i + delta) % len;
			var d = input[j];
			if (c == d) {
				total += parseInt(c);
			}
		}

		this.answer(2, total);

	},
});
