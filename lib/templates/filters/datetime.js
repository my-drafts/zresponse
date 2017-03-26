#!/usr/bin/env node

'use strict';

const dateFormat = require('dateformat');

module.exports = function (input, format) {
  const date = new Date(input);
  if (isNaN(date)) return date.toString();
  else if (format) return dateFormat(date, format);
  return date.toISOString();
};
