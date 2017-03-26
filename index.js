#!/usr/bin/env node

'use strict';

const ZResponse = require('./lib/ZResponse');
const ZCookie = require('./lib/cookies/ZCookie');
const ZCookies = require('./lib/cookies/ZCookies');
const ZHeader = require('./lib/headers/ZHeader');
const ZHeaders = require('./lib/headers/ZHeaders');
const ZTemplate = require('./lib/templates/ZTemplate');

module.exports.ZResponse = ZResponse;
module.exports.ZCookie = ZCookie;
module.exports.ZCookies = ZCookies;
module.exports.ZHeader = ZHeader;
module.exports.ZHeaders = ZHeaders;
module.exports.ZTemplate = ZTemplate;
