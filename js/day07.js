advent.day07 = advent.Day.extend({
	solve : function () {
		var input = this.input;
		var len = input.length;

		var solution = 0;
		var parts = input.split("\n");

		var tree = null;
		var all = [];

		parts.forEach(line => {
			var regex = /(.*)\s\((.*)\)(\s->\s)?(.*)/;
			var m = line.match(regex);
			var thing = {
				name: m[1],
				weight: parseInt(m[2]),
			}
			if (m[3] !== undefined) {
				var children = m[4].split(", ");
				thing.children = {};
				children.forEach(child => {
					thing.children[child] = 1;
				})
			}
			// console.log(m, thing);
			all.push(thing);
		})

		var placedCount = 0;
		for (var i = 0; i < parts.length; i++) {
			var remaining = [];
			var startLength = all.length;
			while (all.length > 0) {
				var p = all.pop();
				if (!p.name) {
					console.log("Missing name: ", p);
				}
				// console.log(tree, p);
				if (!tree) {
					tree = p;
					placedCount++;
					continue;
				}
				if (tree.children) {
					var place = this.findInTree(p.name, tree.children);
				}
				if (place) {
					place[p.name] = p;
					placedCount++;
				} else {
					var other = this.findInTree(tree.name, p.children);
					if (other) {
						other[tree.name] = tree;
						tree = p;
						placedCount++;
					} else {
						var j = JSON.stringify(tree);
						if (j.indexOf(p.name) != -1) {
							console.log("SHOULD HAVE FOUND: ", p.name, j);
						}

						remaining.push(p);
					}
				}
			}
			if (remaining.length == startLength) {
				console.log("Failed to place");
				break;
			}
			if (remaining.length == 0) {
				break;
			} else {
				all = remaining;
			}
		}

		this.answer(1, tree.name);

		this.totalWeight(tree);
	},

	findInTree : function(thing, tree, depth) {
		depth = depth || 0;
		// console.log("findInTree", thing, tree);
		if (!tree || !_.isObject(tree)) {
			return false;
		}
		if (tree[thing] !== undefined) {
			// console.log("Found at depth: " + depth);
			return tree;
		} else {
			var found = false;
			_.some(tree, (value, key) => {
				if (value.children) {
					found = this.findInTree(thing, value.children, depth + 1);
					return found;
				}
			})
			return found;
		}
	},

	totalWeight : function(tree) {
		if (!tree.children || tree.children.length == 0) {
			return tree.weight;
		} else {
			var boxes = {};
			var weights = _.map(tree.children, (child, key) => {
				var weight = this.totalWeight(child);
				if (!boxes[weight]) {
					boxes[weight] = [child];
				} else {
					boxes[weight].push(child);
				}
				return weight;
			})
			// Check to see if the towers are not balanced
			if (!this.foundAnswer2 && _.min(weights) != _.max(weights)) {
				this.foundAnswer2 = true;
				var rightWeight = null;
				var wrongWeight = null;
				var wrongItem = null;
				_.forEach(boxes, (items, weight) => {
					if (items.length == 1) {
						wrongWeight = weight;
						wrongItem = items[0];
					} else {
						rightWeight = weight;
					}
				})
				this.answer(2, wrongItem.weight + (rightWeight - wrongWeight));
			}
			return tree.weight + _.sum(weights);
		}
	}
});
