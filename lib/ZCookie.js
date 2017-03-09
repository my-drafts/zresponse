#!/usr/bin/env node

'use strict';

const uf = require('util').format;
const ui = require('util').inspect;
const zt = require('ztype');

const re = [
  /[^\s]+/,
  /[^\s]*/,
  /[\w\d\.]+/i,
  /[\/\w\d\-\_\.]+/i
];

const cookieSerialize = function (key, value, opt) {
  var cookie = [],
    expires = 0,
    host = undefined,
    path = '/';
  if (typeOf(opt, 'object')) {
    expires = typeOf(opt.expires, 'number') ? opt.expires : typeOf(opt.e, 'number') ? opt.e : expires;
    var expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + expires);
    expires = expiresDate.toUTCString();
    host = typeOf(opt.host, 'string') ? opt.host : typeOf(opt.h, 'string') ? opt.h : host;
    path = typeOf(opt.path, 'string') ? opt.path : typeOf(opt.p, 'string') ? opt.p : path;
  }
  cookie.push(pf('%s=%s;', key, value));
  cookie.push(pf('expires=%s;', expires));
  if (host) cookie.push(pf('domain=%s;', host));
  if (path) cookie.push(pf('path=%s;', path));
  return cookie.join('');
};

class ZCookie {
  get name() {

  }

  constructor(name, value, options) {
    const O = zt.ab(options, {
      o: zt.self,
      else: {}
    });
    // name
    if (!re[0].test(name)) {
      throw new Error('Cookie name wrong');
    }
    this._name = name;
    // value
    if (!re[1].test(value)) {
      throw new Error('Cookie value wrong');
    }
    this._value = encodeURI(value);
    // host
    this._host = false;
    if (zt.as(O.host).s && re[2].test(O.host)) {
      this._host = O.host;
    }
    else if (zt.as(O.h).s && re[2].test(O.h)) {
      this._host = O.h;
    }
    // path
    this._path = false;
    if (zt.as(O.path).s && re[3].test(O.path)) {
      this._path = O.path;
    }
    else if (zt.as(O.p).s && re[3].test(O.p)) {
      this._path = O.p;
    }
    // expires
    this._expires = false;
    if (zt.zs(O.expires).n) {
      this._expires = (new Date()).getDate() + Number(O.expires);
    }
    else if (zt.zs(O.expires).s) {
      this._expires = Date.parse(O.expires) || false;
    }
    else if (zt.zs(O.e).n) {
      this._expires = (new Date()).getDate() + Number(O.e);
    }
    else if (zt.zs(O.e).s) {
      this._expires = Date.parse(O.e) || false;
    }
  }

  inspect() {
    const cookie = {
      name: this._name,
      value: this._value
    };
    const expires = this._expires ? {
      expires: this._expires
    } : {};
    const host = this._host ? {
      host: this._host
    } : {};
    const path = this._path ? {
      path: this._path
    } : {};
    return Object.assign(cookie, expires, host, path);
  }

  toString() {
    const cookie = [uf('%s=%s', this._name, this._value)];
    const expires = this._expires ? [uf('expires=%s', this._expires)] : [];
    const host = this._host ? [uf('domain=%s', this._host)] : [];
    const path = this._path ? [uf('path=%s', this._path)] : [];
    return [].concat(cookie, expires, host, path).join(', ');
  }
};

module.exports = ZCookie;
