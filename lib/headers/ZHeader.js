#!/usr/bin/env node

'use strict';

/*
 * ZHeader {
 *   n -> get/set name
 *   o -> get/set options
 *   v -> get/set value
 *
 *   get/set name
 *   get/set options
 *   get/set value
 *
 *   constructor(name, value, options)
 *
 *   inspect()
 *   toString()
 * }
 *
 */

const uf = require('util').format;
const zt = require('ztype');

class ZHeader {

	get n() {
		return this.name;
	}

	get o() {
		return this.options;
	}

	get v() {
		return this.value;
	}


	set n(_) {
		this.name = _;
	}

	set o(_) {
		this.options = _;
	}

	set v(_) {
		this.value = _;
	}


	get name() {
		return this._name;
	}

	get options() {
		return this._options;
	}

	get value() {
		return this._value;
	}


	set name(_) {
		const re = /[^\s]+/;
		if (_ != String(_) || !re.test(_)) {
			throw new Error('ZHeader name wrong');
		}
		this._name = _;
	}

	set options(_) {
		if (!(_ instanceof Object)) {
			throw new Error('ZHeader options wrong');
		}
		this._options = this._options instanceof Object ? this._options : {};
		for (const __ in _) {
			if (_[__] && _[__] == String(_[__])) {
				this._options[__] = _[__];
			}
			else {
				delete this._options[__];
			}
		}
	}

	set value(_) {
		const re = /[^\s]*/;
		if (_ != String(_) || !re.test(_)) {
			throw new Error('ZHeader value wrong');
		}
		this._value = _;
	}

	constructor(name, value, options) {
		this.name = name;
		this.options = options;
		this.value = value;
	}

	inspect() {
		const _ = this.valueOf();
		return {
			[_.name]: _.value
		};
		/*
		return {
			name: this._name,
			options: this._options,
			value: this._value
		};
		*/
	}

	toString() {
		const encode = encodeURI; // zt.self | encodeURI;
		const _ = this.valueOf();
		return uf('%s:%s', encode(_.name), encode(_.value));
	}

	valueOf() {
		const name = this.name;
		let value = [this.value];
		if (this._options instanceof Object) {
			for (const o in this.options) {
				value.push(String(this.options[o]));
			}
		}
		return {
			name: name,
			value: value.join(';')
		};
	}
}

module.exports = ZHeader;
