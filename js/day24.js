advent.day24 = advent.Day.extend({

	solve : function () {
		this.solution = 0;
		this.solution2 = 0;
		this.solution3 = 0;
		var input = this.input;
		var len = input.length;

		var solution = 0;
		var parts = input.split("\n");
		this.count = 0;

		var opt = parts;
		
		var start = this.getParts(opt, 0);
		start.forEach(s => {
			var k = s.split("/").map(x => parseInt(x));
			var remaining = _.cloneDeep(opt);
			_.pull(remaining, s);
			this.iter(0, s, remaining, k[0] + k[1], 0);
		})

		this.answer(1, this.solution);
		this.answer(2, this.solution3);
	},

	getParts : function (parts, val) {
		var opt = [];
		parts.forEach(p => {
			var q = p.split("/").map(x => parseInt(x));
			if (q[0] == val && opt.indexOf(p) == -1) {
				opt.push(p);
			} else if (q[1] == val && opt.indexOf(p) == -1) {
				opt.push(p);
			}
		})
		return opt;
	},

	iter : function (val, node, remaining, weight, depth) {
		if (this.count++ % 10000 == 0) {
			// console.log(this.count, depth, this.solution, remaining.length, this.solution2, this.solution3);
		}
		var node = node.split("/").map(x => parseInt(x));
		if (weight > this.solution) {
			this.solution = weight;
		}
		if (depth > this.solution2 || (depth == this.solution2 && weight > this.solution3)) {
			this.solution2 = depth;
			this.solution3 = weight;
		}
		if (node[0] == val) {
			var next = node[1];
		} else {
			var next = node[0];
		}
		var opts = this.getParts(remaining, next);
		opts.forEach(o => {
			var j = o.split("/").map(x => parseInt(x));
			var go = _.cloneDeep(remaining);
			_.pull(go, o);
			this.iter(next, o, go, weight + j[0] + j[1], depth + 1);
		})
	},
});
