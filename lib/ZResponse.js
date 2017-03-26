#!/usr/bin/env node

'use strict';

/*
 * ZResponse {
 *   get/set code -> statusCode
 *
 *   get cookies
 *   get done
 *   get headres
 *   get response
 *   get template
 *   get/set statusCode
 *
 *   constructor(response, options)
 *
 *   c -> cookie(name, value, options)
 *   cf -> compileFile(pathName, options)
 *   h -> header(name, value, options)
 *   rf -> renderFile(pathName, locals)
 *   e -> end(out, encoding)
 *
 *   cookie(ZCookie)
 *   cookie(name, value, options)
 *   cookieSearch(options)
 *   compile(source, options)
 *   compileFile(pathName, options)
 *   end(out, encoding)
 *   header(ZHeader)
 *   header(name, value, options)
 *   headerSearch(options)
 *   inspect()
 *   render(source, options)
 *   renderFile(pathName, locals)
 *   uncache()
 *   uncookie(options)
 *   unheader(options)
 * }
 *
 */

const http = require('http');
const zt = require('ztype');

const ZCookies = require('./cookies/ZCookies');
const ZHeaders = require('./headers/ZHeaders');
const ZTemplate = require('./templates/ZTemplate');

const HEADERS = {
	'Content-Type':	'text/html; charset=utf-8',
	'Server':	'Z'
}

class ZResponse {
	get code() {
		return this.statusCode;
	}

	set code(_) {
		this.statusCode = _;
	}


	get cookies() {
		return this._cookies;
	}

	get done() {
		return this._response.finished;
	}

	get headers() {
		return this._headers;
	}

	get response() {
		return this._response;
	}

	get template() {
		return this._template;
	}

	get statusCode() {
		return this._statusCode;
	}

	set statusCode(_) {
		if (_ > 0 && _ < 600) {
			this._statusCode = _;
		}
	}


	constructor(response, options) {
		if (response instanceof http.ServerResponse) {
			this._response = response;
			this._cookies = new ZCookies(options);
			this._headers = new ZHeaders(options);
			this._template = new ZTemplate(options);
			this._statusCode = 0;
		}
		else {
			throw new Error('wrong response');
		}
	}


	c(name, value, options) {
		return this.cookie.apply(this, arguments);
	}

	cf(pathName, options) {
		return this.compileFile.apply(this, arguments);
	}

	e(out, encoding) {
		return this.end.apply(this, arguments);
	}

	h(name, value, options) {
		return this.header.apply(this, arguments);
	}

	rf(pathName, locals) {
		return this.renderFile.apply(this, arguments);
	}


	cookie(name, value, options) {
		if (this.response.headersSent === true) {
			throw new Error('ZResponse.cookie no more headers can be send')
		}
		return this.cookies.add.apply(this._cookies, arguments);
	}

	cookieSearch(options) {
		return this.cookies.search(options);
	}

	compile(source, options) {
		return this.template.compile(source, options);
	}

	compileFile(pathName, options) {
		return this.template.compileFile(pathName, options);
	}

	end(out, encoding) {
		if (this.done) {
			throw new Error('ZResponse.end no more data can be send');
		}
		const THIS = this;
		return new Promise(function (resolve, reject) {
			if (!THIS.response.headersSent) {
				const code = THIS.code > 0 ? THIS.code : 200;
				const cookies = THIS.cookies.inspect();
				const headers = THIS.headers.inspect();
				const _ = Object.assign({}, HEADERS, headers, cookies);
				THIS.response.writeHead(code, _);
			}
			THIS.response.end(out, zt.ab(encoding, {
				s: zt.self,
				else: 'utf8'
			}), function () {
				resolve();
			});
		});
	}

	header(name, value, options) {
		if (this._response.headersSent === true) {
			throw new Error('ZResponse.header no more headers can be send')
		}
		return this.headers.add.apply(this._headers, arguments);
	}

	headerSearch(options) {
		return this.headers.search(options);
	}

	inspect() {
		return {
			cookies: this.cookies.inspect(),
			headers: this.headers.inspect(),
			//response: this.response,
			template: this.template.inspect()
		}
	}

	render(source, options) {
		return this.template.render(source, options);
	}

	renderFile(pathName, locals) {
		return this.template.renderFile(pathName, locals);
	}

	uncache() {
		return this.template.clear();
	}

	uncookie(options) {
		return this.cookies.remove(options);
	}

	unheader(options) {
		return this.headers.remove(options);
	}
}

module.exports = ZResponse;
