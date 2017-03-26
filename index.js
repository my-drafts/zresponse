#!/usr/bin/env node

'use strict';

/*
 * ZResponse {
 *   get cookies
 *   get done
 *   get headres
 *   get response
 *   get template
 *   get/set code -> statusCode
 *
 *   constructor(response, options)
 *
 *   c -> cookie({ ZCookie | name, value, options })
 *   uncookie(options)
 *
 *   e -> end(out, encoding)
 *
 *   h -> header({ ZHeader | name, value, options })
 *   unheader(options)
 *
 *   cf -> compileFile(pathName, options)
 *   rf -> renderFile(pathName, locals)
 *   uncache()
 * }
 *
 *
 * ZCookie {
 *   get/set d -> domain
 *   get/set e -> expires
 *   get/set httpOnly
 *   get/set m -> maxAge
 *   get/set n -> name
 *   get/set p -> path
 *   get/set sameSite
 *   get/set secure
 *   get/set v -> value
 *   set valueAsJson
 *
 *   constructor(name, value, options)
 * }
 *
 *
 * ZCookies {
 *   constructor()
 *
 *   add({ ZCookie | name, value [, options ] })
 *   remove(options)
 *   search(options)
 * }
 *
 *
 * ZHeader {
 *   get/set n -> name
 *   get/set o -> options
 *   get/set v -> value
 *
 *   constructor(name, value, options)
 * }
 *
 *
 * ZHeaders {
 *   constructor()
 *
 *   add({ ZHeader | name, value [, options ] })
 *   remove(options)
 *   search(options)
 * }
 *
 *
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
