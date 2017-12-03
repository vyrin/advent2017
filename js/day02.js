advent.day02 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var parts = input.split("\n");

		var checksum = 0;
		parts.forEach(line => {
			var ind = line.split("\t").map(x => parseInt(x));
			checksum += (_.max(ind) - _.min(ind));
		});

		this.answer(1, checksum);


		var checksum = 0;
		parts.forEach(line => {
			var ind = line.split("\t").map(x => parseInt(x));
			ind.some(i => {
				return ind.some(j => {
					var m = i / j;
					if (m == Math.round(m) && m != 1) {
						checksum += m;
						return true;
					}
				})
			})
		})

		this.answer(2, checksum);
	}
});
