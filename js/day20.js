advent.day20 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;
		var parts = input.split("\n");

		// parts = parts.map(x => parseInt(x));
		var particles = [];

		var regex = /p=<(.*),(.*),(.*)>, v=<(.*),(.*),(.*)>, a=<(.*),(.*),(.*)>/
		parts.forEach(p => {
			var match = p.match(regex);

			var n = {
				p: [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])],
				v: [parseInt(match[4]), parseInt(match[5]), parseInt(match[6])],
				a: [parseInt(match[7]), parseInt(match[8]), parseInt(match[9])],
			}

			particles.push(n);
		})

		for (var i = 0; i < 1000; i++) {
			var collide = {};
			particles.forEach((p, q) => {
				p.v = this.addV3(p.a, p.v);
				p.p = this.addV3(p.p, p.v);
				if (p.dead) {
					return;
				}
				var key = JSON.stringify(p.p);
				if (collide[key]) {
					collide[key].push(q);
				} else {
					collide[key] = [q];
				}
			})
			_.forEach(collide, (value, key) => {
				if (value.length > 1) {
					value.forEach(q => {
						particles[q].dead = true;
						solution++;
					})
				}
			})
		}

		var closest;
		var min = 100000000000;

		particles.forEach((p, i) => {
			var d = this.dist(p.p);
			if (d < min) {
				min = d;
				closest = i;
			}
		})

		this.answer(1, closest);
		this.answer(2, parts.length - solution);

	},

	addV3 : function (v1, v2) {
		return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
	},

	dist : function (v) {
		return Math.abs(v[0]) + Math.abs(v[1]) + Math.abs(v[2]);
	}
});
