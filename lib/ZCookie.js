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

class ZCookie {
  get d() {
    return this.host;
  }

  get e() {
    return this.expires;
  }

  get h() {
    return this.host;
  }

  get n() {
    return this.name;
  }

  get p() {
    return this.path;
  }

  get v() {
    return this.value;
  }

  get domain() {
    return this.host;
  }

  get expires() {
    return this._expires;
  }

  get host() {
    return this._host;
  }

  get name() {
    return this._name;
  }

  get path() {
    return this._path;
  }

  get value() {
    return this._value;
  }

  set domain(_domain) {
    this.host = _domain;
  }

  set expires(_expires) {
    if (_expires === false);
    else if (zt.zs(_expires).n && !isNaN(_expires)) {
      _expires = Number(_expires);
      _expires = (new Date()).getDate() + _expires;
      _expires = _expires.toUTCString();
    }
    else if (zt.zs(_expires).s) {
      _expires = Date.parse(_expires);
      if (isNaN(_expires)) throw new Error('Cookie expires wrong format');
    }
    else throw new Error('Cookie expires wrong');
    this._expires = _expires;
  }

  set host(_host) {
    if (_host === false);
    else if (zt.as(_host).s && re[2].test(_host));
    else throw new Error('Cookie host wrong');
    this._host = _host;
  }

  set name(_name) {
    if (zt.as(_name).s && re[0].test(_name));
    else throw new Error('Cookie name wrong');
    this._name = encodeURI(_name);
  }

  set path() {
    if (_path === false);
    else if (zt.as(_path).s && re[3].test(_path));
    else throw new Error('Cookie path wrong');
    this._path = _path;
  }

  set value(_value) {
    if (zt.as(_value).s && re[1].test(_value));
    else throw new Error('Cookie value wrong');
    this._value = encodeURI(_value);
  }

  constructor(name, value, options) {
    const O = zt.ab(options, {
      o: zt.self,
      else: {}
    });
    this.name = name;
    this.value = value;
    this.host = zt.as(O.host).s ? O.host : zt.as(O.h).s ? O.h : false;
    this.path = zt.as(O.path).s ? O.path : zt.as(O.p).s ? O.p : false;
    this.expires = ('expires' in O) ? O.expires : ('e' in O) ? O.e : false;
  }

  inspect() {
    const cookie = {
      name: this._name,
      value: this._value
    };
    const expires = this._expires === false ? {} : {
      expires: this._expires
    };
    const host = this._host === false ? {} : {
      host: this._host
    };
    const path = this._path === false ? {} : {
      path: this._path
    };
    return Object.assign(cookie, expires, host, path);
  }

  toString() {
    const cookie = [uf('%s=%s', this._name, this._value)];
    const expires = this.e === false ? [] : [uf('expires=%s', this._expires)];
    const host = this.h === false ? [] : [uf('domain=%s', this._host)];
    const path = this.p === false ? [] : [uf('path=%s', this._path)];
    return [].concat(cookie, expires, host, path).join(';');
  }
};

module.exports = ZCookie;
