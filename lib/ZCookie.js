#!/usr/bin/env node

'use strict';

/*
 * ZCookie {
 *   d -> get domain
 *   e -> get expires
 *   m -> get maxAge
 *   n -> get name
 *   p -> get path
 *   v -> get value
 *
 *   get domain
 *   get expires
 *   get httpOnly
 *   get maxAge
 *   get name
 *   get path
 *   get sameSite
 *   get secure
 *   get value
 *
 *   set domain
 *   set expires
 *   set httpOnly
 *   set maxAge
 *   set name
 *   set path
 *   set sameSite
 *   set secure
 *   set value
 *   set valueAsJson
 *
 *   constructor(name, value, options)
 *   inspect()
 *   toString()
 * }
 *
 */

const uf = require('util').format;
const zt = require('ztype');

class ZCookie {
	get d() {
		return this.host;
	}

	get e() {
		return this.expires;
	}

	get m() {
		return this.maxAge;
	}

	get n() {
		return this.name;
	}

	get p() {
		return this.path;
	}

	get v() {
		return this.value;
	}


	get domain() {
		return this._domain;
	}

	get expires() {
		return this._expires;
	}

	get httpOnly() {
		return this._httpOnly;
	}

	get maxAge() {
		return this._maxAge;
	}

	get name() {
		return this._name;
	}

	get path() {
		return this._path;
	}

	get sameSite() {
		return this._sameSite;
	}

	get secure() {
		return this._secure;
	}

	get value() {
		return this._value;
	}

	set domain(_) {
		const re = /[\.\w\d]+/i;
		if (_ === undefined) this._domain = false;
		else if (_ === false) this._domain = false;
		else if (_ == String(_)) this._domain = re.test(_) ? _ : false;
		else throw new Error('Cookie domain wrong');
	}

	set expires(_) {
		if (_ === undefined) this._expires = false;
		else if (_ === false) this._expires = false;
		else if (_ == Number(_)) {
			_ = Number(_);
			let __ = new Date();
			_ = __.getTime() + _;
			__.setTime(_);
			this._expires = __.toUTCString();
		}
		else if (_ == String(_)) {
			_ = new Date(_);
			_ = _ instanceof Date && !isNaN(_) ? _.toUTCString() : false;
			this._expires = _;
		}
		else throw new Error('Cookie expires wrong');
	}

	set httpOnly(_) {
		if (_ === undefined) this._httpOnly = false;
		else if (_ === !!_) this._httpOnly = _;
		else throw new Error('Cookie httpOnly wrong');
	}

	set maxAge(_) {
		if (_ === undefined) this._maxAge = false;
		else if (_ === false) this._maxAge = false;
		else if (_ == Number(_)) {
			_ = Number(_);
			_ = isNaN(_) ? false : _;
			this._maxAge = _;
		}
		else throw new Error('Cookie maxAge wrong');
	}

	set name(_) {
		const re = /[^\s]+/;
		if (_ != String(_) || !re.test(_)) {
			throw new Error('Cookie name wrong');
		}
		this._name = _;
	}

	set path(_) {
		const re = /[\/\w\d\-\_\.]+/i;
		if (_ === undefined) this._path = false;
		else if (_ === false) this._path = false;
		else if (_ == String(_)) this._path = re.test(_) ? _ : false;
		else throw new Error('Cookie path wrong');
	}

	set sameSite(_) {
		const re = /^Strict|Lax$/i;
		if (_ === undefined) this._sameSite = false;
		else if (_ === !!_) this._sameSite = _ ? 'Strict' : 'Lax';
		else if (_ == String(_)) this._sameSite = re.test(_) ? _ : false;
		else throw new Error('Cookie sameSite wrong');
	}

	set secure(_) {
		if (_ === undefined) this._secure = false;
		else if (_ === !!_) this._secure = _;
		else throw new Error('Cookie secure wrong');
	}

	set value(_) {
		const re = /[^\s]*/;
		if (_ != String(_) || !re.test(_)) {
			throw new Error('Cookie value wrong');
		}
		this._value = _;
	}

	set valueAsJson(_) {
		this._value = JSON.stringify(_);
	}

	constructor(name, value, options) {
		this.domain = zt.lp(options, ['domain', 'd', 'host', 'h'], false);
		this.expires = zt.lp(options, ['expires', 'e'], false);
		this.httpOnly = zt.lp(options, ['httpOnly'], false);
		this.maxAge = zt.lp(options, ['maxAge', 'm'], false);
		this.name = name;
		this.path = zt.lp(options, ['path', 'p'], false);
		this.sameSite = zt.lp(options, ['sameSite'], undefined);
		this.secure = zt.lp(options, ['secure'], false);
		if (!zt.lp(options, ['json'], false)) this.value = value;
		else this.valueAsJson = value;
	}

	inspect() {
		let result = {
			name: this._name,
			value: this._value
		};
		if (this._domain !== false) {
			result = Object.assign(result, {
				domain: this._domain
			});
		}
		if (this._expires !== false) {
			result = Object.assign(result, {
				expires: this._expires
			});
		}
		if (this._httpOnly !== false) {
			result = Object.assign(result, {
				httpOnly: this._httpOnly
			});
		}
		if (this._maxAge !== false) {
			result = Object.assign(result, {
				maxAge: this._maxAge
			});
		}
		if (this._path !== false) {
			result = Object.assign(result, {
				path: this._path
			});
		}
		if (this._sameSite !== false) {
			result = Object.assign(result, {
				sameSite: this._sameSite
			});
		}
		if (this._secure !== false) {
			result = Object.assign(result, {
				secure: this._secure
			});
		}
		return result;
	}

	toString() {
		const encode = zt.self;// encodeURI;
		let result = [uf('%s=%s', encode(this._name), encode(this._value))];
		if (this._domain) result.push(uf('Domain=%s', this._domain));
		if (this._expires) result.push(uf('Expires=%s', this._expires));
		if (this._httpOnly) result.push('HttpOnly');
		if (this._maxAge) result.push(uf('Max-Age=%s', this._maxAge));
		if (this._path) result.push(uf('Path=%s', this._path));
		if (this._sameSite) result.push(uf('SameSite=%s', this._sameSite));
		if (this._secure) result.push('Secure');
		return uf('Set-Cookie: %s', result.join('; '));
	}
};

module.exports = ZCookie;
