function componentToHex(c) {
	var hex = parseInt(c).toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRGB(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l){
	var r, g, b;

	if(s == 0){
		r = g = b = l; // achromatic
	}else{
		var hue2rgb = function hue2rgb(p, q, t){
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if(t < 1/6) return p + (q - p) * 6 * t;
			if(t < 1/2) return q;
			if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}

		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1/3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1/3);
	}

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Overrides
// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

String.prototype.hashCode = function() {
	var str = this;
	var hash = 0;
	if (str.length == 0) return hash;
	for (i = 0; i < str.length; i++) {
		char = str.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

var laser = laser || {};

laser.randomSeed = Date.now();
laser.rootRandomSeed = Date.now();
laser.uidSeed = Date.now();

laser.seedRandom = function (value, ignoreRoot) {
	laser.randomSeed = JSON.stringify(value).hashCode();
	if (!ignoreRoot) {
		laser.randomSeed += laser.rootRandomSeed;
	}
}

laser.random = function (min, max, isFloat) {
	if (isFloat === undefined) {
		isFloat = false;
		if (_.isBoolean(max)) {
			isFloat = max;
			max = min;
			min = 1;
		} else if (max === undefined) {
			if (min === undefined) {
				max = 1;
				min = 0;
				isFloat = true;
			} else {
				isFloat = !Number.isInteger(min);
				max = min;
				min = 0;
			}
		}
	}

	var x = Math.sin(laser.randomSeed++) * 10000;
	x = x - Math.floor(x);
	x = x * (max - min) + min;
	if (!isFloat) {
		x = parseInt(x);
	}
	return x;
}

laser.sample = function (arr) {
	return arr[laser.random(arr.length)];
}

laser.uid = function () {
	var x = Math.sin(laser.uidSeed++) * 10000;
	x = x - Math.floor(x);
	x = x * 100000000;
	return md5("" + x);
}

laser.floatToFixed = function (num, places) {
	places = places || 0;
	return parseFloat(num.toFixed(places));
}

laser.numEquals = function (a, b) {
	return Math.abs(a - b) < 0.000001;
}

laser.cloneDeep = function (source) {
	if (_.isArray(source)) {
		var result = [];
		_.forEach(source, function (value) {
			result.push(laser.cloneDeep(value));
		}, this);
		return result;
	} else if (_.isObject(source)) {
		if (source.clone) {
			return source.clone()
		} else {
			var result = {};
			_.forEach(source, function (value, key) {
				result[key] = laser.cloneDeep(value);
			}, this);
			return result;
		}
	} else {
		return source;
	}
}

laser.dataURLToBlob = function(dataURL) {
	var BASE64_MARKER = ';base64,';
	if (dataURL.indexOf(BASE64_MARKER) == -1) {
	  var parts = dataURL.split(',');
	  var contentType = parts[0].split(':')[1];
	  var raw = decodeURIComponent(parts[1]);

	  return new Blob([raw], {type: contentType});
	}

	var parts = dataURL.split(BASE64_MARKER);
	var contentType = parts[0].split(':')[1];
	var raw = window.atob(parts[1]);
	var rawLength = raw.length;

	var uInt8Array = new Uint8Array(rawLength);

	for (var i = 0; i < rawLength; ++i) {
	  uInt8Array[i] = raw.charCodeAt(i);
	}

	return new Blob([uInt8Array], {type: contentType});
};

// Array stuff

Array.prototype.last = function () {
	if (this.length > 0) {
		return this[this.length - 1];
	} else {
		return undefined;
	}
}

Array.fillMulti = function(dims, value) {
	var result = [];
	var index = [];
	var len = dims.length;
	_.times(len, i => {
		index.push(0);
	});
	for (var q = 0; q < 10000000; q++) {
	// while (true) {
		var node = result;
		index.forEach((sub, i) => {
			if (i == len - 1) {
				node[sub] = value;
			} else {
				if (!node[sub]) {
					node[sub] = [];
				}
				node = node[sub];
			}
		})
		var looped = true;
		for (var i = index.length - 1; i >= 0; i--) {
			index[i]++;
			if (index[i] >= dims[i]) {
				index[i] %= dims[i];
			} else {
				looped = false;
				break;
			}
		}
		if (looped) {
			break;
		}
	}
	return result;
}

Array.prototype.toString2D = function(sep) {
	if (sep === undefined) {
		sep = ",";
	}
	var result = "";
	for (var y = 0; y < this[0].length; y++) {
		for (var x = 0; x < this.length; x++) {
			result += this[x][y];
			if (x < this.length - 1) {
				result += sep;
			}
		}
		if (y < this[0].length - 1) {
			result += "\n";
		}
	}
	return result;
}

// Debugging

var llog = console.log;