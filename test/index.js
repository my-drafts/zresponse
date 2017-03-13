#!/usr/bin/env node

'use strict';

const assert = require('assert');
const ZCookie = require('../lib/ZCookie');

(function () {
  const c = new ZCookie('x', '67', {d: '?', m: 0, e: '2017-04-13 11:02:03 GMT', httpOnly: true, p: '?', sameSite: 'strict', secure: true});
  console.log(c);
})();
