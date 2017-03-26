#!/usr/bin/env node

'use strict';

/*
 * ZTemplate {
 *   get autoescape
 *   get cache
 *   get ecoding
 *   get locals
 *   get root
 *   get timeZoneOffset
 *
 *   constructor(name, value, options)
 *
 *   c -> compile(source, options)
 *   cf -> compileFile(pathName, options)
 *   clear()
 *   compile(source, options)
 *   compileFile(pathName, options)
 *   inspect()
 *   r -> render(source, options)
 *   render(source, options)
 *   renderFile(pathName, locals)
 *   rf -> renderFile(pathName, options)
 *   setExtension(name, object)
 *   setFilter(name, method)
 *   setTag(name, parse, compile, ends, blockLevel)
 * }
 *
 */

const path = require('path');
const swig = require('swig');
const zt = require('ztype');

const datetimeFilter = require('./filters/datetime');

const LOCALS = {
	now: function functionName() {
		const now = Date.now();
		return now;
	}
};

class ZTemplate {
	get autoescape(){
		return this._autoescape;
	}

	get cache(){
		return this._cache;
	}

	get ecoding(){
		return this._ecoding;
	}

	get locals(){
		return this._locals;
	}

	get root(){
		return this._root;
	}

	get timeZoneOffset(){
		return this._timeZoneOffset;
	}

	constructor(options) {
		this._autoescape = zt.lp(options, ['autoescape', 'ae'], true);
		this._cache = zt.lp(options, ['cache', 'c'], false); // 'memory'
		this._ecoding = zt.lp(options, ['encoding', 'e'], 'utf8');
		this._locals = zt.lp(options, ['locals', 'l'], {});
		this._root = zt.lp(options, ['rootPath', 'root', 'path', 'p'], 'tmp');
		this._timeZoneOffset = zt.lp(options, ['timeZone', 'tz'], 0);
		this._swig = new swig.Swig({
			autoescape: this._autoescape,
			/*
			cache: {
				get: function (key) {},
				set: function (key, val) {}
			},
			cache: 'memory',
      */
			cache: this._cache,
			locals: Object.assign({}, LOCALS, this._locals),
			loader: swig.loaders.fs(this._root, {
				encoding: this._ecoding
			}),
			offset: this._timeZoneOffset
		});

		this.setFilter('datetime', datetimeFilter);
		//swig.setDefaults({});
		//swig.setDefaultTZOffset(this._timeZoneOffset);
	}

	c(source, options) {
		return this.compile(source, options);
	}

	cf(pathName, options) {
		return this.compileFile(pathName, options);
	}

	clear() {
		return this._swig.invalidateCache();
	}

	compile(source, options) {
		return this._swig.compile(source, options);
	}

	compileFile(pathName, options) {
		const THIS = this;
		const filePath = path.resolve(this._root, pathName);
		return new Promise(function (resolve, reject) {
			THIS._swig.compileFile(filePath, options, function (error, template) {
				error ? reject(error) : resolve(template);
			});
		});
	}

	inspect() {
		return {
			autoescape: this._autoescape,
			cache: this._cache,
			ecoding: this._ecoding,
			locals: this._locals,
			root: this._root,
			timeZoneOffset: this._timeZoneOffset
		}
	}

	r(source, options) {
		return this.render(source, options);
	}

	render(source, options) {
		return this._swig.render(source, options);
	}

	renderFile(pathName, locals) {
		const THIS = this;
		const filePath = path.resolve(this._root, pathName);
		return new Promise(function (resolve, reject) {
			THIS._swig.renderFile(filePath, locals, function (error, out) {
				error ? reject(error) : resolve(out);
			});
		});
	}

	rf(pathName, options) {
		return this.renderFile(pathName, options);
	}

	setExtension(name, object) {
		return this._swig.setExtension(name, object);
	}

	setFilter(name, method) {
		return this._swig.setFilter(name, method);
	}

	setTag(name, parse, compile, ends, blockLevel) {
		return this._swig.setTag(name, parse, compile, ends, blockLevel);
	}
}

module.exports = ZTemplate;
