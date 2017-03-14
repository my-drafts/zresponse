#!/usr/bin/env node

'use strict';

const assert = require('assert');
const ZCookies = require('../lib/ZCookies');
const ZCookie = require('../lib/ZCookie');

(function () {
  const c = new ZCookie('x', '67Ґаліна', {d: 'i.ua', m: 0, e: '2017-04-13 11:02:03 GMT', p: '/', sameSite: true, secure: true});
  console.log(c);
  console.log(String(c));
})();
