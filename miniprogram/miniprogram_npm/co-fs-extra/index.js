module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; var desp = Object.getOwnPropertyDescriptor(m.exports, k); if(desp && desp.configurable) Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1581584712952, function(require, module, exports) {

/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var stream = require('co-from-stream');
var methods = require('./methods');
var fs = require('fs-extra');


for (var key in fs) {
  exports[key] = fs[key];
}

// .exists is still messed

exports.exists = function (path) {
  return function (done) {
    fs.stat(path, function(err, res){
      done(null, !err);
    });
  };
};

// .createReadStream

exports.createReadStream = function () {
  return stream(fs.createReadStream.apply(null, arguments));
};

thunkify(module.exports, methods);

}, function(modId) {var map = {"./methods":1581584712953}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584712953, function(require, module, exports) {
/**
 * Methods to wrap.
 */

/*
// to regenerate this list (in case fs-extra adds more functions)
var methods = []
var fs = require('fs-extra');
for (var key in fs) {
  if (typeof fs[key] === 'function'
  && key.substr(-6) !== 'Stream'
  && key.substr(0, 5) !== 'grace'
  && !~key.indexOf('watch')
  && key[0] !== '_'
  && key !== 'exists'
  && key !== 'Stats'
  && key.substr(-4) !== 'Sync') {
    var txt = fs[key].toString()
    var l1 = txt.substr(0, txt.indexOf('\n'))
    if (~l1.indexOf('callback') || ~l1.indexOf('cb)'))
      methods.push(key)
    else console.log(key, fs[key].toString())
  }
}

console.log('module.exports = ' + JSON.stringify(methods.sort(), null, '  ').replace(/"/g, '\''))
*/

module.exports = [
  'access',
  'appendFile',
  'chmod',
  'chown',
  'close',
  'copy',
  'createFile',
  'createLink',
  'createSymlink',
  'emptyDir',
  'emptydir',
  'ensureDir',
  'ensureFile',
  'ensureLink',
  'ensureSymlink',
  'fchmod',
  'fchown',
  'fdatasync',
  'fstat',
  'fsync',
  'ftruncate',
  'futimes',
  'lchmod',
  'lchown',
  'link',
  'lstat',
  'lutimes',
  'mkdir',
  'mkdirp',
  'mkdirs',
  'move',
  'open',
  'outputFile',
  'outputJSON',
  'outputJson',
  'read',
  'readFile',
  'readJSON',
  'readJson',
  'readdir',
  'readlink',
  'realpath',
  'remove',
  'rename',
  'rmdir',
  'stat',
  'symlink',
  'truncate',
  'unlink',
  'utimes',
  'write',
  'writeFile',
  'writeJSON',
  'writeJson'
]

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1581584712952);
})()
//# sourceMappingURL=index.js.map