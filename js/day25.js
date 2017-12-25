advent.day25 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;
		var parts = input.split("\n");

		// parts = parts.map(x => parseInt(x));

		var steps = 12134527;
		var state = "A";

		var s = input.split("\n\n");

		var regex = /In state (.*):\n  If the current value is (.*)\n    - Write the value (.*)\.\n    - Move one slot to the (.*)\.\n    - Continue with state (.*)\.\n  If the current value is (.*)\n    - Write the value (.*)\.\n    - Move one slot to the (.*)\.\n    - Continue with state (.*)\./

		var fsm = {};

		s.forEach(part => {
			var m = part.match(regex);

			var state = {};
			state[parseInt(m[2])] = {
				out: parseInt(m[3]),
				move: m[4],
				next: m[5],
			}
			state[parseInt(m[6])] = {
				out: parseInt(m[7]),
				move: m[8],
				next: m[9],
			}
			fsm[m[1]] = state;
		})

		var tape = {};
		var pos = 0;
		var curState = "A";

		for (var i = 0; i < steps; i++) {
			var current = this.get(tape, pos);
			var state = fsm[curState][current];
			this.set(tape, pos, state.out);
			if (state.move == "right") {
				pos++;
			} else {
				pos--;
			}
			curState = state.next;
		}

		_.forEach(tape, val => {
			if (val == 1) {
				solution++;
			}
		})

		this.answer(1, solution);
	},

	get : function(tape, pos) {
		return tape[pos] || 0;
	},

	set : function (tape, pos, val) {
		tape[pos] = val;
	}
});
