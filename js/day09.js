advent.day09 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;

		var inGarbage = false;
		var score = 0;
		var garbage = 0;

		for (var i = 0; i < len; i++) {
			var c = input[i];
			if (c == "!") {
				i++;
			} else if (inGarbage) {
				if (c == ">") {
					inGarbage = false;
				} else {
					garbage++;
				}
			} else if (c == "<") {
				inGarbage = true;
			} else if (c == "{") {
				score++;
				solution += score;
			} else if (c == "}") {
				score--;
			}
		}

		this.answer(1, solution);
		this.answer(2, garbage);
	},
});
