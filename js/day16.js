advent.day16 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;
		var parts = input.split(",");

		// parts = parts.map(x => parseInt(x));

		var spots = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		];

		var start = spots.join("");
		var first = null;

		// Repeat 1,000,000,000 % 60 (or 40 times)
		for (var i = 0; i < 40; i++) {
			parts.forEach(move => {
				if (move[0] == "s") {
					for (var i = 0; i < parseInt(move.slice(1)); i++) {
						var p = spots.pop();
						spots.splice(0, 0, p);
					}
				} else if (move[0] == "x") {
					var parts = move.slice(1).split("/");
					var a = parseInt(parts[0]);
					var b = parseInt(parts[1]);
					var p = spots[a];
					spots[a] = spots[b];
					spots[b] = p;
				} else if (move[0] == "p") {
					var parts = move.slice(1).split("/");
					var a = parts[0];
					var b = parts[1];
					var x = spots.indexOf(a);
					var y = spots.indexOf(b);
					var p = spots[x];
					spots[x] = spots[y];
					spots[y] = p;
				}
			})

			solution = spots.join("");
			if (!first) {
				first = solution;
			}
			if (solution == start) {
				// Used this to figure out how many cycles before it repeats. 60.
				console.log("GOT IT", i);
				break;
			}
		}
		
		solution = spots.join("");

		this.answer(1, first);
		this.answer(2, solution);
	},
});
