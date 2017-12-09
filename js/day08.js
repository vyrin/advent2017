advent.day08 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;
		var parts = input.split("\n");

		var regs = {};

		var max = 0;
		parts.forEach(line => {
			var regex = /(.*) (.*) (.*) if (\w*) (.*)/;
			var m = line.match(regex);
			var a = m[1];
			var dir = m[2];
			var val = parseInt(m[3]);
			var b = m[4];
			var cmp = m[5];
			var cmpVal = m[6];
			var cnd = eval((regs[b] || 0) + cmp);
			if (cnd) {
				regs[a] = regs[a] || 0;
				if (dir == "inc") {
					regs[a] += val;
				} else {
					regs[a] -= val;
				}
				if (regs[a] > max) {
					max = regs[a];
				}
			}
		})

		this.answer(1, _.max(regs));
		this.answer(2, max);
	},
});
