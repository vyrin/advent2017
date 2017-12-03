
function _v(x, y, params) {
	if (!(this instanceof _v)) {
		return new _v(x, y, params);
	}
	if (x instanceof _v) {
		_.forEach(_.keys(x), function (key) {
			this[key] = x[key];
		}, this);
		// this.x = x.x || 0;
		// this.y = x.y || 0;
	} else if (x instanceof Array && x.length == 2) {
		this.x = x[0];
		this.y = x[1];
	} else {
		this.x = x || 0;
		this.y = y || 0;
	}
	if (params !== undefined && _.isObject(params)) {
		_.forEach(params, function (value, key) {
			this[key] = value;
		}, this);
	}
}

Object.defineProperty(_v.prototype, "0", { get: function() { return this.x; } });
Object.defineProperty(_v.prototype, "1", { get: function() { return this.y; } });

_v.prototype.clone = function () {
	return new _v(this);
}

_v.prototype.mimic = function (other) {
	_.forEach(_.keys(other), function (key) {
		if (key != "x" && key != "y") {
			this[key] = other[key];
		}
	}, this);
}

_v.prototype.length = function() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
};

_v.prototype.dot = function(that) {
    return this.x*that.x + this.y*that.y;
};

_v.prototype.cross = function(that) {
    return this.x*that.y - this.y*that.x;
}

_v.prototype.unit = function() {
    return this.divide( this.length() );
};

_v.prototype.unitEquals = function() {
    this.divideEquals( this.length() );

    return this;
};

_v.prototype.unitScale = function(s) {
    return this.divide( this.length() ).scale(s);
};

_v.prototype.add = function(that, that2) {
	if (that instanceof _v) {
		return new _v(this.x + that.x, this.y + that.y);
	} else if (that2 === undefined) {
		return new _v(this.x + that, this.y + that);
	} else {
		return new _v(this.x + that, this.y + that2);
	}
};

_v.prototype.addEquals = function(that, that2) {
	if (that instanceof _v) {
		this.x += that.x;
		this.y += that.y;
	} else if (that2 === undefined) {
		this.x += that;
		this.y += that;
	} else {
		this.x += that;
		this.y += that2;
	}

    return this;
};

_v.prototype.subtract = function(that, that2) {
	if (that instanceof _v) {
	    return new _v(this.x - that.x, this.y - that.y);
	} else if (that2 === undefined) {
		return new _v(this.x - that, this.y - that);
	} else {
		return new _v(this.x - that, this.y - that2);
	}
};

_v.prototype.sub = _v.prototype.subtract;

_v.prototype.subtractEquals = function(that, that2) {
	if (that instanceof _v) {
	    this.x -= that.x;
	    this.y -= that.y;
	} else if (that2 === undefined) {
		this.x -= that;
		this.y -= that;
	} else {
		this.x -= that;
		this.y -= that2;
	}

    return this;
};

_v.prototype.multiply = function(that, that2) {
	if (that instanceof _v) {
		return new _v(this.x * that.x, this.y * that.y);
	} else if (that2 === undefined) {
		return new _v(this.x * that, this.y * that);
	} else {
		return new _v(this.x * that, this.y * that2);
	}
};

_v.prototype.scale = _v.prototype.multiply;

_v.prototype.multiplyEquals = function(that, that2) {
	if (that instanceof _v) {
		this.x *= that.x;
		this.y *= that.y;
	} else if (that2 === undefined) {
		this.x *= that;
		this.y *= that;
	} else {
		this.x *= that;
		this.y *= that2;
	}

    return this;
};

_v.prototype.scaleEquals = _v.prototype.multiplyEquals;

_v.prototype.divide = function(that, that2) {
	if (that instanceof _v) {
		return new _v(this.x / that.x, this.y / that.y);
	} else if (that2 === undefined) {
		return new _v(this.x / that, this.y / that);
	} else {
		return new _v(this.x / that, this.y / that2);
	}
};

_v.prototype.divideEquals = function(that, that2) {
	if (that instanceof _v) {
		this.x /= that.x;
		this.y /= that.y;
	} else if (that2 === undefined) {
		this.x /= that;
		this.y /= that;
	} else {
		this.x /= that;
		this.y /= that2;
	}

    return this;
};

_v.prototype.rotate = function(angle) {
	var currentAngle = this.angle();
	return new _v.fromAngle(angle + currentAngle).scale(this.length());
};

_v.prototype.rotateEquals = function(angle) {
	var i = this.rotate(angle);
	this.x = i.x;
	this.y = i.y;
    return this;
};

_v.prototype.perp = function() {
    return new _v(-this.y, this.x);
};

_v.prototype.perpendicular = function(that) {
    return this.subtract(this.project(that));
};

_v.prototype.project = function(that) {
    var percent = this.dot(that) / that.dot(that);

    return that.multiply(percent);
};

_v.prototype.angle = function() {
	return Math.atan2(this.y, this.x);
};

_v.prototype.clockwiseAngleBetween = function (v2) {
	var dot = this.x * v2.x + this.y * v2.y;
	var det = this.x * v2.y - this.y * v2.x;
	return Math.atan2(det, dot);
};

_v.prototype.midPoint = function (that) {
	return _v((this.x + that.x) / 2, (this.y + that.y) / 2);
};

_v.prototype.isEqual = function (that) {
	if (this.x == that.x && this.y == that.y) {
		return true;
	} else {
		return false;
	}
}

_v.prototype.isEqualFloatingPoint = function (that) {
	var epsilon = 0.0000001;
	if (Math.abs(this.x - that.x) < epsilon && Math.abs(this.y - that.y) < epsilon) {
		return true;
	} else {
		return false;
	}
}

_v.prototype.toString = function() {
    return this.x + "," + this.y;
};

_v.prototype.toJSON = function() {
	return [parseFloat(this.x.toFixed(4)), parseFloat(this.y.toFixed(4))];
};

_v.prototype.toFixed = function (places) {
	places = places || 0;
	this.x = parseFloat(this.x.toFixed(places));
	this.y = parseFloat(this.y.toFixed(places));
}

_v.prototype.toArray = function () {
	return [this.x, this.y];
}

_v.prototype.wasd = function(dir) {
	var move = _v.wasdDirs[dir];
	if (move) {
		return this.add(move);
	}
}

_v.prototype.wasdEquals = function(dir) {
	var move = _v.wasdDirs[dir];
	if (move) {
		return this.addEquals(move);
	}
}

_v.wasdDirs = {
	"w": _v(0, 1),
	"a": _v(-1, 0),
	"s": _v(0, -1),
	"d": _v(1, 0),
}

_v.wasdCW = function (dir) {
	return {
		w:"d",
		a:"w",
		s:"a",
		d:"s",
	}[dir];
}

_v.wasdCCW = function (dir) {
	return {
		w:"a",
		a:"s",
		s:"d",
		d:"w",
	}[dir];
}

// Static functions

_v.fromAngle = function(a) {
	return _v(Math.cos(a), Math.sin(a));
}

_v.intersectionPoint = function (s1, e1, s2, e2) {
	var epsilon = 0.0000001;
	var denominator, a, b, numerator1, numerator2, x, y;
	denominator = ((e2.y - s2.y) * (e1.x - s1.x)) - ((e2.x - s2.x) * (e1.y - s1.y));
	if (Math.abs(denominator) < epsilon) {
		// TODO:
		// Lines could be colinear... not sure what to do in that case
	    return false;
	}
	a = s1.y - s2.y;
	b = s1.x - s2.x;
	numerator1 = ((e2.x - s2.x) * a) - ((e2.y - s2.y) * b);
	numerator2 = ((e1.x - s1.x) * a) - ((e1.y - s1.y) * b);
	a = numerator1 / denominator;
	b = numerator2 / denominator;

	x = s1.x + (a * (e1.x - s1.x));
	y = s1.y + (a * (e1.y - s1.y));
	var result = _v(x, y);
	result.intersectionPercentA = a;
	result.intersectionPercentB = b;
	return result;
}

_v.randomOnUnitCircle = function () {
	var angle = Math.radians(laser.random(360, true));
	return _v.fromAngle(angle);
};

_v.randomInsideUnitCircle = function () {
	var angle = Math.radians(laser.random(360, true));
	return _v.fromAngle(angle).scale(laser.random());
};

_v.fromPoints = function(p1, p2) {
    return new _v(
        p2.x - p1.x,
        p2.y - p1.y
    );
};

_v.fromArray = function (arr) {
	return new _v(arr[0], arr[1]);
};

_v.fromObject = function (arr) {
	return new _v(arr.x, arr.y);
}

_v.convert = function (arr) {
	if (!arr) {
		return _v(0, 0);
	} else if (arr instanceof _v) {
		return arr;
	} else if (arr instanceof Array) {
		return _v.fromArray(arr);
	} else {
		return _v.fromObject(arr);
	}
}