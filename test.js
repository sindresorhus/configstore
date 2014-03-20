/*global describe, it, beforeEach */
'use strict';
var assert = require('assert');
var fs = require('fs');
var Configstore = require('./configstore');

describe('configstore', function () {
	var configstorePath = new Configstore('configstore-test').path;

	beforeEach(function () {
		fs.unlinkSync(configstorePath);
		this.conf = new Configstore('configstore-test');
	});

	it('.set() and .get()', function () {
		this.conf.set('foo', 'bar');
		assert.equal(this.conf.get('foo'), 'bar');
	});

	it('.del()', function () {
		this.conf.set('foo', 'bar');
		this.conf.del('foo');
		assert.notEqual(this.conf.get('foo'), 'bar');
	});

	it('.all', function () {
		this.conf.set('foo', 'bar');
		assert.equal(this.conf.all.foo, 'bar');
	});

	it('.size', function () {
		this.conf.set('foo', 'bar');
		assert.equal(this.conf.size, 1);
	});

	it('.path', function () {
		this.conf.set('foo', 'bar');
		assert(fs.existsSync(this.conf.path));
	});

	it('should work for json file', function () {
		var conf = new Configstore('configstore-test', 'json',  { foo: 'bar' });
		assert.equal(conf.get('foo'), 'bar');
	});

	it('should work for yaml file', function () {
		var conf = new Configstore('configstore-test', 'yaml',  { foo: 'bar' });
		assert.equal(conf.get('foo'), 'bar');
	});

	it('make sure `.all` is always an object', function () {
		fs.unlinkSync(configstorePath);
		assert.doesNotThrow(function () {this.conf.get('foo')}.bind(this));
	});
});
