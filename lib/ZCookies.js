#!/usr/bin/env node

'use strict';

const ZCookie = require('./ZCookie');

class ZCookies {
	constructor() {
		this._cookies = [];
	}

	add() {
		if (arguments.length > 1) {
      const name = arguments[0];
      const value = arguments[1];
      const option = arguments[2];
      const cookie = new ZCookie(name, value, option);
      return cookie;
		}
		else if (arguments.length > 0) {
			const cookie = arguments[0];
			if (cookie instanceof ZCookie) {
				this._cookies.push(cookie);
        return cookie;
			}
			else throw new Error('Cookies.add 1 argument must be ZCookie');
		}
		else throw new Error('Cookies.add 0 argument given');
	}

	index(cookie) {
		if (cookie instanceof ZCookie) {
			return this._cookies.findIndex(function (item, index) {
				return item === cookie;
			});
		}
    else return -1;
	}

  remove() {

  }
};

module.exports = ZCookies;
