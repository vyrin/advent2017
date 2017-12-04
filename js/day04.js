advent.day04 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var parts = input.split("\n");

		var total = 0;
		parts.forEach(part => {
			var keys = {};
			var sub = part.split(" ");
			if (_.all(sub, s => {
				if (keys[s]) {
					return false;
				}
				keys[s] = true;
				return true;
			})) {
				total++;
			}
		})

		this.answer(1, total);

		var total = 0;
		parts.forEach(part => {
			var keys = {};
			var sub = part.split(" ");
			if (_.all(sub, s => {
				var arr = s.split("");
				arr.sort();
				s = arr.join("");
				if (keys[s]) {
					return false;
				}
				keys[s] = true;
				return true;
			})) {
				total++;
			}
		})

		this.answer(2, total);
	},
});
