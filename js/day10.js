advent.day10 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var pc = 0;
		var skip = 0;
		var list = [];
		for (var i = 0; i < 256; i++) {
			list.push(i);
		}

		var solution = 0;
		var parts = input.split(",");
		parts = parts.map(x => parseInt(x));

		parts.forEach(l => {
			var n = [];
			for (var i = 0; i < l; i++) {
				n.push(list[(pc + i) % 256]);
			}
			for (var i = l - 1; i >= 0; i--) {
				list[(pc + i) % 256] = n[l - i - 1];
			}
			pc += (l + skip);
			skip++;
		})

		this.answer(1, list[0] * list[1]);


		// Part 2

		var pc = 0;
		var skip = 0;
		var list = [];
		for (var i = 0; i < 256; i++) {
			list.push(i);
		}

		var q = [];
		for (var i = 0; i < len; i++) {
			q.push(input.charCodeAt(i));
		}

		q = q.concat([17, 31, 73, 47, 23]);

		parts = q;

		_.times(64, () => {
			parts.forEach(l => {
				var n = [];
				for (var i = 0; i < l; i++) {
					n.push(list[(pc + i) % 256]);
				}
				for (var i = l - 1; i >= 0; i--) {
					list[(pc + i) % 256] = n[l - i - 1];
				}
				pc += (l + skip);
				skip++;
			})
		})

		var dense = [];
		for (var i = 0; i < 256; i += 16) {
			var foo = 0;
			for (var j = i; j < i + 16; j++) {
				foo = foo ^ list[j];
			}
			dense.push(foo);
		}

		var solution = [];
		dense.forEach(f => {
			var h = f.toString(16);
			if (h.length == 1) {
				h = "0" + h;
			}
			solution.push(h);
		})

		this.answer(2, solution.join(""));
	},
});
