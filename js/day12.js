advent.day12 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;
		var parts = input.split("\n");

		// parts = parts.map(x => parseInt(x));

		var k = {};

		var regex = /(.*) <-> (.*)/;
		parts.forEach(line => {
			var m = line.match(regex);
			var thing = {
				name: m[1],
				neighbors: m[2].split(", ")
			}
			k[m[1]] = thing;
		})

		this.visited = {};
		this.found = {};

		this.dive(k["0"], k, 0);
		solution = _.keys(this.visited).length;

		this.answer(1, solution);

		this.visited = {};
		this.found = {};

		_.keys(k).forEach((name, i) => {
			this.dive(k[name], k, i);
		})

		this.answer(2, _.keys(this.found).length);
	},

	dive : function (node, k, g) {
		if (this.visited[node.name]) {
			return;
		}
		this.found[g] = true;
		this.visited[node.name] = true;
		node.neighbors.forEach(n => {
			this.dive(k[n], k, g);
		})
	}
});
