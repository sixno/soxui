(function(){
	function Base64() {
		// private property
		_b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var _b64chs = Array.prototype.slice.call(_b64ch);
		var _b64tab = (function (a) {
			var tab = {};
			a.forEach(function (c, i) { return tab[c] = i; });
			return tab;
		})(_b64chs);
		var _b64reg = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
		var _fromCC = String.fromCharCode.bind(String);

		// public method for encoding
		this.encode = function (input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			input = _utf8_encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output +
				_b64ch.charAt(enc1) + _b64ch.charAt(enc2) +
				_b64ch.charAt(enc3) + _b64ch.charAt(enc4);
			}
			return output;
		}

		this.btoa = function (bin) {
			var u32, c0, c1, c2, asc = '';
			var pad = bin.length % 3;
			for (var i = 0; i < bin.length;) {
				if ((c0 = bin.charCodeAt(i++)) > 255 ||
					(c1 = bin.charCodeAt(i++)) > 255 ||
					(c2 = bin.charCodeAt(i++)) > 255)
					throw new TypeError('invalid character found');
				u32 = (c0 << 16) | (c1 << 8) | c2;
				asc += _b64chs[u32 >> 18 & 63]
					+ _b64chs[u32 >> 12 & 63]
					+ _b64chs[u32 >> 6 & 63]
					+ _b64chs[u32 & 63];
			}
			return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
		};

		// public method for decoding
		this.decode = function (input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (i < input.length) {
				enc1 = _b64ch.indexOf(input.charAt(i++));
				enc2 = _b64ch.indexOf(input.charAt(i++));
				enc3 = _b64ch.indexOf(input.charAt(i++));
				enc4 = _b64ch.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
			}
			output = _utf8_decode(output);
			return output;
		}

		this.atob = function (asc) {
			// console.log('polyfilled');
			asc = asc.replace(/\s+/g, '');
			if (!_b64reg.test(asc))
				throw new TypeError('malformed base64.');
			asc += '=='.slice(2 - (asc.length & 3));
			var u24, bin = '', r1, r2;
			for (var i = 0; i < asc.length;) {
				u24 = _b64tab[asc.charAt(i++)] << 18
					| _b64tab[asc.charAt(i++)] << 12
					| (r1 = _b64tab[asc.charAt(i++)]) << 6
					| (r2 = _b64tab[asc.charAt(i++)]);
				bin += r1 === 64 ? _fromCC(u24 >> 16 & 255)
					: r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255)
						: _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
			}
			return bin;
		};

		// private method for UTF-8 encoding
		_utf8_encode = function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}

			}
			return utftext;
		}

		// private method for UTF-8 decoding
		_utf8_decode = function (utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while ( i < utftext.length ) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				} else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
	}

	window.base64 = new Base64();
})();