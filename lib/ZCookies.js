#!/usr/bin/env node

'use strict';

class ZCookies {
	constructor() {
		this._cookies = [];
	}

	add(){
		if(arguments.length === 1){
			const cookie = arguments[0];
			if(cookie instanceof ZCookie){
			}
		}
	}
};

module.exports = ZCookies;
