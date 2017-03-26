#!/usr/bin/env node

'use strict';

const assert = require('assert');
const http = require('http');

const ZResponse = require('../').ZResponse;
const ZCookie = require('../').ZCookie;
const ZCookies = require('../').ZCookies;
const ZHeader = require('../').ZHeader;
const ZHeaders = require('../').ZHeaders;
const ZTemplate = require('../').ZTemplate;

(function () {
	/*
	const c = new ZCookie('x', '67Ґаліна', {d: 'i.ua', m: 0, e: '2017-04-13 11:02:03 GMT', p: '/', sameSite: true, secure: true});
	console.log(c);
	console.log(String(c));
	*/

  const response = new ZResponse({}, {
    autoescape: true,
    cache: false,
    encoding: 'utf8',
    locals: {},
    rootPath: 'test/storage',
    timeZone: 3
  });

	const cookie = new ZCookie('x1', '67Ґаліна', {
		d: 'i.ua',
		m: 0,
		e: '2017-04-13 11:02:03 GMT',
		p: '/',
		sameSite: true,
		secure: true
	});
	response.cookie(cookie);
	cookie.d = false;
	//cookie.e = false;
	//cookie.m = false;
	cookie.p = false;
	cookie.sameSite = undefined;
	cookie.secure = false;
	cookie.value = '1';
	response.cookie('x2', '2');
	response.cookie('x3', '3');
	response.uncookie({
		n: 'x2'
	});

	const header = new ZHeader('Content-Type', 'image/jpg', {
		a: 'xxx',
		b: 'zzz'
	});
	header.options = {
		a: 'yyy'
	};
	response.header(header);
	response.header('x1', '1');
	response.header('x2', '2');
	response.unheader({
		n: 'content-type'
	})

  console.log(response);

	response.rf('index.html', {
		now1: 'xxx'
	}).then(function (out) {
	  console.log(out);
	}).catch(function (error) {
	  console.log(error);
	});

})();
