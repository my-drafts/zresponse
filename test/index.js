#!/usr/bin/env node

'use strict';

const http = require('http');
const process = require('process');
const uf = require('util').format;
const usage = require('usage');

const ZRequest = require('zrequest').ZRequest;
const ZResponse = require('../').ZResponse;
const config = require('./config.json');

const port = 8080;

http.createServer(function (request, response) {
		usage.lookup(process.pid, {
			keepHistory: false
		}, function (error, used) {
			console.log(error ? error : used);
		});

		let req = new ZRequest(request, config.request);
		let res = new ZResponse(response, config.response);
		req.load({})
			.then(function () {
				//console.log(String(req));
				//console.log('---');
				switch (req.method) {
					case 'get':
						switch (req.path) {
							case '/':
								return res.rf('front-page/index.html', {});
							case '/body/':
								return res.rf('body.html', {});
							case '/post-multipart-form-data/':
								return res.rf('post/multipart-form-data.html', {});
							case '/post-application-json/':
								return res.rf('post/application-json.html', {});
							case '/post-application-x-www-form-urlencoded/':
								return res.rf('post/application-x-www-form-urlencoded.html', {});
							case '/post-text-plain/':
								return res.rf('post/text-plain.html', {});
							case '/post/':
								return res.rf('post/index.html', {});
							case '/get/':
								return res.rf('get/index.html', {});
							case '/close/':
								setTimeout(function () {
									console.log(uf('Server stoped.'));
									process.exit(0);
								}, 1000);
								return Promise.resolve('close');
							default:
								return Promise.reject(404);
						}
						break;
					case 'post':
            res.header('content-Type', 'text/plain');
						switch (req.path) {
							case '/submit-simple/':
								return Promise.resolve(String(req));
							case '/submit-complex/':
								console.log(String(req));
								return req.final({})
									.then(function () {
										return Promise.resolve(String(req));
									})
									.catch(function (error) {
										return Promise.resolve(String(error) + '\n1\n' + String(error.stack));
									});
							case '/submit-json/':
								return req.final({})
									.then(function () {
										return Promise.resolve(String(req));
									})
									.catch(function (error) {
										return Promise.resolve(String(error) + '\n2\n' + String(error.stack));
									});
							default:
								return Promise.reject(404);
						}
						break;
					default:
						return Promise.reject(403);
				}
			})
			.then(function (html) {
				res.end(html);
			})
			.catch(function (error) {
				res.end(String(error) + '\n3\n' + String(error.stack));
			});
	})
	.on('error', function (error) {
		console.log(String(error) + '\n4\n' + String(error.stack));
		console.log('---');
	})
	.listen(port);

console.log(uf('Server started at %s port.', port));
