/*!
 * sub-cache <https://github.com/doowb/sub-cache>
 *
 * Copyright (c) 2015 Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var TransformCache = require('transform-cache');

/**
 * Create a namespaced sub cache when given a transform-cache instance
 *
 * ```js
 * var Cache = require('transform-cache');
 * var SubCache = require('sub-cache');
 * var cache = new Cache();
 * var subA = new SubCache(cache, 'a');
 * var subB = new SubCache(cache, 'b');
 *
 * subA.set('foo', 'bar');
 * //=> cache.a.foo: 'bar'
 *
 * subB.set('foo', 'baz');
 * //=> cache.b.foo: 'baz'
 * ```
 *
 * @param {Object} `cache` Instance of a [transform-cache].
 * @param {String} `namespace` Namespace to use
 */

function SubCache (cache, namespace) {
  if (!(this instanceof SubCache)) return new SubCache(cache, namespace);
  if (!cache) throw new Error('cache is required');
  if (!cache instanceof TransformCache) throw new Error('cache is expected to be an instance of TransformCache');
  if (!namespace) throw new Error('namespace is required');
  if (typeof namespace !== 'string') throw new Error('namespace is expected to be a string but got ' + (typeof namespace));

  var normalizeKey = cache.normalizeKey;
  var transform = cache.transform;

  var sub = new TransformCache(cache.cache, {
    normalizeKey: function (key) {
      return [namespace, normalizeKey(key)].join('.')
    },
    transform: transform
  });
  return sub;
};

module.exports = SubCache;
