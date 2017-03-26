#!/usr/bin/env node

'use strict';

/*
 * ZCookies {
 *   constructor()
 *
 *   add({ ZCookie | name, value [, options ] })
 *   remove(options)
 *   search(options)
 * }
 *
 */

const uf = require('util').format;
const zt = require('ztype');

const ZCookie = require('./ZCookie');

class ZCookies {
	constructor() {
		this._cookies = [];
	}

	inspect() {
		const cookies = this.valueOf();
		return cookies.value.length > 0 ? {
			[cookies.name]: cookies.value
		} : {};
	}

	toString() {
		const _ = this.valueOf();
		return uf('%s:%j', _.name, _.value);
	}

	valueOf() {
		const cookies = this._cookies.map(function (cookie) {
			return String(cookie);
		});
		return {
			name: 'Set-Cookie',
			value: cookies
		};
	}


	add(name, value, options) {
		if (arguments.length > 2) {
			const cookie = new ZCookie(name, value, options);
			this._cookies.push(cookie);
			return cookie;
		}
		else if (arguments.length > 1) {
			const cookie = new ZCookie(name, value, {});
			this._cookies.push(cookie);
			return cookie;
		}
		else if (arguments.length > 0 && name instanceof ZCookie) {
			this._cookies.push(name);
			return name;
		}
		else throw new Error('ZCookies.add error');
	}

	remove(options) {
		const indexes = this.search(options);
		this._cookies = this._cookies.filter(function (cookie, index) {
			return indexes.indexOf(index) >= 0 ? false : true;
		});
		return true;
	}

	search(options) {
		if (Number(options) >= 0) {
			options = Number(options);
			return options in this._cookies ? [options] : [];
		}
		else if (options instanceof Object) {
			const n = zt.lp(options, ['name', 'n', 'key', 'k'], false);
			const v = zt.lp(options, ['value', 'v'], false);
			const map = function (cookie, index) {
				if (n === false && v === false);
				else if (n instanceof RegExp) {
					if (!n.test(cookie.name)) {
						return false;
					}
				}
				else if (n == String(n)) {
					if (String(n) !== cookie.name) {
						return false;
					}
				}
				else if (v instanceof RegExp) {
					if (!v.test(cookie.value)) {
						return false;
					}
				}
				else if (v == String(v)) {
					if (String(v) !== cookie.value) {
						return false;
					}
				}
				return index;
			};
			return this._cookies.map(map).filter(function (index) {
				return index !== false;
			});
		}
		return [];
	}
};

module.exports = ZCookies;
