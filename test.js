'use strict';

var assert = require('assert');
var Cache = require('transform-cache');
var SubCache = require('./');

describe('sub-cache', function () {
  it('should create a sub cache when given a transform cache', function () {
    var cache = new Cache();
    var subA = new SubCache(cache, 'a');
    var subB = new SubCache(cache, 'b');

    subA.set('foo', 'bar');
    subB.set('foo', 'baz');
    assert(cache.cache === subA.cache, 'cache should equal subA.cache');
    assert(cache.cache === subB.cache, 'cache should equal subB.cache');
    assert(subA.cache === subB.cache, 'subAcache should equal subB.cache');
  });

  it('should get the correct item from the sub cache', function () {
    var cache = new Cache();
    var subA = new SubCache(cache, 'a');
    var subB = new SubCache(cache, 'b');

    subA.set('foo', 'bar');
    subB.set('foo', 'baz');

    assert(subA.get('foo') === 'bar', 'subA.foo should equal bar');
    assert(subB.get('foo') === 'baz', 'subB.foo should equal baz');
    assert(cache.get('a.foo') === subA.get('foo'), 'cache.a.foo should equal subA.foo');
    assert(cache.get('b.foo') === subB.get('foo'), 'cache.a.foo should equal subB.foo');
  });
});
