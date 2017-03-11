#!/usr/bin/env node

'use strict';

const uf = require('util').format;
const zt = require('ztype');

class ZCookie {
	get d() {
		return this.host;
	}

	get e() {
		return this.expires;
	}

	get h() {
		return this.host;
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


  get age() {
		return this._age;
	}

	get domain() {
		return this.host;
	}

	get expires() {
		return this._expires;
	}

	get host() {
		return this._host;
	}

  get maxAge() {
		return this._age;
	}

	get name() {
		return this._name;
	}

	get path() {
		return this._path;
	}

	get value() {
		return this._value;
	}

	set age(_age) {

	}

	set domain(_domain) {
    const re = /[\.\w\d]+/i;
		if (_ !== false && (_ !== String(_) || !re.test(_))){
      throw new Error('Cookie domain wrong');
    }
		this._domain = _;
	}

	set expires(_expires) {
		if (_expires === false);
		else if (zt.zs(_expires).n && !isNaN(_expires)) {
			_expires = Number(_expires);
			_expires = (new Date()).getDate() + _expires;
			_expires = _expires.toUTCString();
		}
		else if (_expires === String(_expires)) {
			_expires = Date.parse(_expires);
			if (isNaN(_expires)) throw new Error('Cookie expires wrong format');
		}
		else throw new Error('Cookie expires wrong');
		this._expires = _expires;
	}

	set host(_) {
    this.domain = _;
	}

	set name(_) {
    const re = /[^\s]+/;
		if (_ !== String(_) || !re.test(_)){
      throw new Error('Cookie name wrong');
    }
		this._name = encodeURI(_);
	}

	set path(_) {
    const re = /[\/\w\d\-\_\.]+/i;
		if (_ !== false && (_ !== String(_) || !re.test(_))){
      throw new Error('Cookie path wrong');
    }
		this._path = _;
	}

  set sameSite(_) {
    const re = /^Strict|Lax$/i;
		if (_ !== !!_ && (_ !== String(_) || !re.test(_))){
      throw new Error('Cookie sameSite wrong');
    }
		this._secure = _===true ? 'Strict' : _===false ? 'Lax' : _;
	}

  set secure(_) {
		if (_ !== !!_){
      throw new Error('Cookie secure wrong');
    }
		this._secure = _;
	}

  set value(_) {
    const re = /[^\s]*/;
		if (_ !== String(_) || !re.test(_)){
      throw new Error('Cookie value wrong');
    }
		this._value = encodeURI(_);
	}

	constructor(name, value, options) {
    this.domain = zt.lp(options, ['domain', 'd', 'host', 'h'], false);
		this.expires = zt.lp(options, ['expires', 'e'], false);
		this.httpOnly = zt.lp(options, ['httpOnly'], false);
    this.maxAge = zt.lp(options, ['maxAge', 'm'], false);
    this.name = name;
		this.path = zt.lp(options, ['path', 'p'], false);
		this.sameSite = zt.lp(options, ['sameSite'], true);
		this.secure = zt.lp(options, ['secure'], false);
    this.value = value;
	}

	inspect() {
		const cookie = {
			name: this._name,
			value: this._value
		};
		let result = {};
		if (this._age !== false) {
			result = Object.assign(result, {
				maxAge: this._age
			});
		}
    if (this._expires !== false) {
      result = Object.assign(result, {
  			expires: this._expires
  		});
    }
    if (this._host !== false) {
      result = Object.assign(result, {
  			host: this._host
  		});
    }
    if (this._httpOnly !== false) {
      result = Object.assign(result, {
  			httpOnly: this._httpOnly
  		});
    }
    if (this._path !== false) {
      result = Object.assign(result, {
  			path: this._path
  		});
    }
		return result;
	}

	toString() {
/*
Set-Cookie:
<cookie-name>=<cookie-value>;
Domain=<domain-value>;
Expires=<date>;
HttpOnly;
Max-Age=<non-zero-digit>;
Path=<path-value>;
SameSite;
Secure;
*/
		const cookie = [uf('%s=%s', this._name, this._value)];
		const age = this.a === false ? [] : [uf('Max-Age=%s', this._age)];
		const expires = this.e === false ? [] : [uf('Expires=%s', this._expires)];
		const host = this.h === false ? [] : [uf('Domain=%s', this._host)];
		const httpOnly = this.httpOnly === false ? [] : ['HttpOnly'];
		const path = this.p === false ? [] : [uf('Path=%s', this._path)];
		const secure = this.secure === false ? [] : ['Secure'];
		const same = this.same === false ? [] : [uf('SameSite=%s', this._same)];
		let result = [].concat(cookie, age, expires, host, path);
		return uf('Set-Cookie: %s', result.join('; '));
	}
};

module.exports = ZCookie;
