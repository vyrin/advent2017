advent.day17 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;
		var parts = input.split("\n");

		var step = 344;

		var buffer = [0];
		var size = 2018;

		var pc = 0;
		for (var i = 1; i < size; i++) {
			for (var j = 0; j < step; j++) {
				pc++;
				if (pc >= buffer.length) {
					pc = 0;
				}
			}
			buffer.splice(pc + 1, 0, i);
			pc++;
			if (pc >= buffer.length) {
				pc = 0;
			}

		}

		this.answer(1, buffer[pc + 1]);


		var size = 50000000;
		var pc = 0;
		var foo = 1;
		for (var i = 1; i < size; i++) {
			pc = (pc + step) % foo;
			if (pc == 0) {
				solution = i;
			}
			foo++;
			pc++;
		}

		this.answer(2, solution);
	},
});
