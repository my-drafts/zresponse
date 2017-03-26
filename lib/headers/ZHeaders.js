#!/usr/bin/env node

'use strict';

/*
 * ZHeaders {
 *   constructor()
 *
 *   add(ZHeader)
 *   add(name, value [, options ])
 *   inspect()
 *   remove(options)
 *   search(options)
 *   toString()
 * }
 *
 */

const zt = require('ztype');

const ZHeader = require('./ZHeader');

class ZHeaders {
	constructor() {
		this._headers = [];
	}

	add(name, value, options) {
		if (arguments.length > 2) {
			const header = new ZHeader(name, value, options);
			this._headers.push(header);
			return header;
		}
		else if (arguments.length > 1) {
			const header = new ZHeader(name, value, {});
			this._headers.push(header);
			return header;
		}
		else if (arguments.length > 0 && name instanceof ZHeader) {
			this._headers.push(name);
			return name;
		}
		else throw new Error('ZHeaders.add error');
	}

	inspect() {
		const headers = this._headers.map(function (header) {
			return header.inspect();
		});
		return headers.length > 0 ? Object.assign.apply({}, headers) : {};
	}

	remove(options) {
		const indexes = this.search(options);
		this._headers = this._headers.filter(function (header, index) {
			return indexes.indexOf(index) >= 0 ? false : true;
		});
		return true;
	}

	search(options) {
		if (Number(options) >= 0) {
			options = Number(options);
			return options in this._headers ? [options] : [];
		}
		else if (options instanceof Object) {
			const n = zt.lp(options, ['name', 'n', 'key', 'k'], false);
			const v = zt.lp(options, ['value', 'v'], false);
			const map = function (header, index) {
				if (n === false && v === false);
				else if (n instanceof RegExp) {
					if (!n.test(header.name)) {
						return false;
					}
				}
				else if (n == String(n)) {
					if (String(n).toLowerCase() !== header.name.toLowerCase()) {
						return false;
					}
				}
				else if (v instanceof RegExp) {
					if (!v.test(header.value)) {
						return false;
					}
				}
				else if (v == String(v)) {
					if (String(v) !== header.value) {
						return false;
					}
				}
				return index;
			};
			return this._headers.map(map).filter(function (index) {
				return index !== false;
			});
		}
		return [];
	}

	toString() {
		return this._headers.map(function (header) {
			return String(header);
		}).join('\n');
	}

	valueOf() {
		return this._headers.map(function (header) {
			return header.valueOf();
		});
	}
}

module.exports = ZHeaders;
