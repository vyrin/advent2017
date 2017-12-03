advent.day03 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		input = parseInt(input);

		// Part 1

		var dir = "d";

		var f = Array.fillMulti([600, 600], 0);
		var offset = 300;

		var pos = _v(offset, offset);
		f[pos.x][pos.y] = 1;
		var val = 0;

		while (val < input - 1) {
			pos.wasdEquals(dir);
			val++;
			f[pos.x][pos.y] = val;
			var ccw = _v.wasdCCW(dir);
			var left = pos.wasd(ccw);
			if (f[left.x][left.y] == 0) {
				dir = _v.wasdCCW(dir);
			}
		}

		var dist = Math.abs(pos.x - offset) + Math.abs(pos.y - offset);

		this.answer(1, dist);


		// Part 2

		var dir = "d";

		var f = Array.fillMulti([20, 20], 0);
		var offset = 10;

		var pos = _v(offset, offset);
		f[pos.x][pos.y] = 1;
		var val = 0;

		while (val < input) {
			pos.wasdEquals(dir);
			val = 0;
			val += f[pos.x - 1][pos.y - 1];
			val += f[pos.x - 0][pos.y - 1];
			val += f[pos.x + 1][pos.y - 1];
			val += f[pos.x + 1][pos.y - 0];
			val += f[pos.x + 1][pos.y + 1];
			val += f[pos.x - 0][pos.y + 1];
			val += f[pos.x - 1][pos.y + 1];
			val += f[pos.x - 1][pos.y - 0];
			f[pos.x][pos.y] = val;
			var ccw = _v.wasdCCW(dir);
			var left = pos.wasd(ccw);
			if (f[left.x][left.y] == 0) {
				dir = _v.wasdCCW(dir);
			}
		}

		this.answer(2, val);
	}
});
