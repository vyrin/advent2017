advent.day18 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;
		var parts = input.split("\n");

		var nodes = [
			{
				"p" : 0,
				"pc" : 0,
				"pid" : 0,
				"oid" : 0,
				"sound" : true,
			},
		];

		var rx = {
			0 : [],
		}

		var running = true;
		var count = 0;
		while(running) {
			running = false;
			_.forEach(nodes, node => {
				running = this.step(parts, node, rx) || running;
			})
		}

		this.answer(1, this.solution1);


		this.solution2 = 0;

		var nodes = [
			{
				"p" : 0,
				"pc" : 0,
				"pid" : 0,
				"oid" : 1,
			},
			{
				"p" : 1,
				"pc" : 0,
				"pid" : 1,
				"oid" : 0,
			}
		];

		var rx = {};
		nodes.forEach(node => {
			rx[node.pid] = [];
		})

		var running = true;
		var count = 0;
		while(running) {
			running = false;
			_.forEach(nodes, node => {
				running = this.step(parts, node, rx) || running;
			})
		}

		this.answer(2, this.solution2);
	},

	step : function(parts, regs, rx) {
		var ins = parts[regs.pc];
		if (!ins) {
			return false;
		}
		regs.pc++;
		var p = ins.split(" ");
		if (p[0] == "set") {
			regs[p[1]] = this.getValue(p[2], regs);
		} else if (p[0] == "add") {
			regs[p[1]] += this.getValue(p[2], regs);
		} else if (p[0] == "mul") {
			regs[p[1]] *= this.getValue(p[2], regs);
		} else if (p[0] == "mod") {
			regs[p[1]] %= this.getValue(p[2], regs);
		} else if (p[0] == "rcv") {
			if (regs.sound) {
				if (this.getValue(p[1], regs) > 0) {
					var val = rx[regs.pid].last();
					this.solution1 = val;
					return false;
				}
			} else {
				if (rx[regs.pid].length > 0) {
					var val = rx[regs.pid][0];
					rx[regs.pid].splice(0, 1);
					regs[p[1]] = val;
				} else {
					regs.pc--;
					return false;
				}
			}
		} else if (p[0] == "snd") {
			if (regs.pid == 1) {
				this.solution2++;
			}
			rx[regs.oid].push(this.getValue(p[1], regs));
		} else if (p[0] == "jgz") {
			if (this.getValue(p[1], regs) > 0) {
				regs.pc--;
				regs.pc += this.getValue(p[2], regs);
			}
		}

		return true;
	},

	getValue : function(v, regs) {
		if (parseInt(v) == v) {
			return parseInt(v);
		} else {
			return regs[v] || 0;
		}
	},

});
