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
		this.host = _domain;
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

	set host(_host) {
		if (_host === false);
		else if (_host === String(_host) && /[\.\w\d]+/i.test(_host));
		else throw new Error('Cookie host wrong');
		this._host = _host;
	}

	set name(_name) {
		if (_name === String(_name) && /[^\s]+/.test(_name));
		else throw new Error('Cookie name wrong');
		this._name = encodeURI(_name);
	}

	set path() {
		if (_path === false);
		else if (_path === String(_path) && /[\/\w\d\-\_\.]+/i.test(_path));
		else throw new Error('Cookie path wrong');
		this._path = _path;
	}

	set value(_value) {
		if (_value === String(_value) && /[^\s]*/.test(_value));
		else throw new Error('Cookie value wrong');
		this._value = encodeURI(_value);
	}

	constructor(name, value, options) {
		const O = zt.ab(options, {
			o: zt.self,
			else: {}
		});
		this.expires = ('expires' in O) ? O.expires : ('e' in O) ? O.e : false;
    if ('domain' in O || 'd' in O) {
      this.domain = ('domain' in O) ? O.domain : ('d' in O) ? O.d : false;
    }
    else if ('host' in O || 'h' in O) {
      this.domain =  ('host' in O) ? O.host : ('h' in O) ? O.h : false;
    }
		this.httpOnly = ('httpOnly' in O) ? O.httpOnly : false;
    this.maxAge = ('maxAge' in O) ? O.maxAge : ('m' in O) ? O.m : false;
    this.name = name;
		this.path = zt.as(O.path).s ? O.path : zt.as(O.p).s ? O.p : false;
		this.sameSite = ('sameSite' in O) ? O.sameSite : false;
		this.secure = ('secure' in O) ? O.secure : false;
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
