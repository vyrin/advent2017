advent.day15 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;
		var parts = input.split("\n");

		// parts = parts.map(x => parseInt(x));

		var gens = {
			a: 516,
			b: 190
		};

		var factors = {
			a: 16807,
			b: 48271
		}

		var div = 2147483647;

		for (var i = 0; i < 40000000; i++) {
			gens.a = gens.a * factors.a % div;
			gens.b = gens.b * factors.b % div;

			if (gens.a % 65536 == gens.b % 65536) {
				solution++;
			}
		}

		this.answer(1, solution);

		var gens = {
			a: 516,
			b: 190
		};
		solution = 0;

		for (var i = 0; i < 5000000; i++) {
			while (true) {
				gens.a = gens.a * factors.a % div;
				if (gens.a % 4 == 0) {
					break;
				}
			}
			while (true) {
				gens.b = gens.b * factors.b % div;
				if (gens.b % 8 == 0) {
					break;
				}
			}

			if (gens.a % 65536 == gens.b % 65536) {
				solution++;
			}
		}

		

		this.answer(1, solution);
	},
});
