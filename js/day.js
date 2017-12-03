var advent = {};

advent.Day = laser.Class.extend({
	day : "00",
	input : "",

	init : function (params) {
	},

	start : function () {
		this.load();
	},

	load : function () {
		var self = this;
		var filename = "input/day" + this.day + ".txt";
		$.get(filename).done(function (data) {
			if (!data) {
				console.log("Missing data: " + filename);
			}
			self.input = data;
			self.solve();
		});
	},

	solve : function () {

	},

	answer : function (part, solution) {
		console.log("SOLUTION FOR PART " + part + ": " + solution);
	},

});

laser.Class.addCreateFunction(advent.Day);

advent.getDay = function (day) {
	var clazz = "day" + day;
	if (advent[clazz]) {
		var instance = new advent[clazz];
		instance.day = day;
		instance.init();
		return instance;
	} else {
		return undefined;
	}
}
