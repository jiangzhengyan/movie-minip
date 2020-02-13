module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; var desp = Object.getOwnPropertyDescriptor(m.exports, k); if(desp && desp.configurable) Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1581584713205, function(require, module, exports) {
var assert = require('assert')
var fs
try {
  fs = require('graceful-fs')
} catch (e) {
  fs = require('fs')
}
var path = require('path')
var Readable = require('stream').Readable
var util = require('util')
var assign = require('./assign')

function Walker (dir, options) {
  assert.strictEqual(typeof dir, 'string', '`dir` parameter should be of type string. Got type: ' + typeof dir)
  var defaultStreamOptions = { objectMode: true }
  var defaultOpts = { queueMethod: 'shift', pathSorter: undefined, filter: undefined }
  options = assign(defaultOpts, options, defaultStreamOptions)

  Readable.call(this, options)
  this.root = path.resolve(dir)
  this.paths = [this.root]
  this.options = options
  this.fs = options.fs || fs // mock-fs
}
util.inherits(Walker, Readable)

Walker.prototype._read = function () {
  if (this.paths.length === 0) return this.push(null)
  var self = this
  var pathItem = this.paths[this.options.queueMethod]()

  self.fs.lstat(pathItem, function (err, stats) {
    var item = { path: pathItem, stats: stats }
    if (err) return self.emit('error', err, item)
    if (!stats.isDirectory()) return self.push(item)

    self.fs.readdir(pathItem, function (err, pathItems) {
      if (err) {
        self.push(item)
        return self.emit('error', err, item)
      }

      pathItems = pathItems.map(function (part) { return path.join(pathItem, part) })
      if (self.options.filter) pathItems = pathItems.filter(self.options.filter)
      if (self.options.pathSorter) pathItems.sort(self.options.pathSorter)
      pathItems.forEach(function (pi) { self.paths.push(pi) })

      self.push(item)
    })
  })
}

function walk (root, options) {
  return new Walker(root, options)
}

module.exports = walk

}, function(modId) {var map = {"./assign":1581584713206}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713206, function(require, module, exports) {
// simple mutable assign (extracted from fs-extra)
// I really like object-assign package, but I wanted a lean package with zero deps
function _assign () {
  var args = [].slice.call(arguments).filter(function (i) { return i })
  var dest = args.shift()
  args.forEach(function (src) {
    Object.keys(src).forEach(function (key) {
      dest[key] = src[key]
    })
  })

  return dest
}

// thank you baby Jesus for Node v4 and Object.assign
module.exports = Object.assign || _assign

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1581584713205);
})()
//# sourceMappingURL=index.js.map