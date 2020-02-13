module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; var desp = Object.getOwnPropertyDescriptor(m.exports, k); if(desp && desp.configurable) Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1581584713109, function(require, module, exports) {
module.exports = require('./lib/giturl');
}, function(modId) {var map = {"./lib/giturl":1581584713110}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713110, function(require, module, exports) {
/**!
 * giturl - lib/giturl.js
 *
 * Copyright(c) 2014
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */



/**
 * Module dependencies.
 */

// host[:/]n1/n2
var RE = /^([^:\/]+)[:\/](.+)$/i;

var HTTPS_HOSTS = {
  'github.com': 1,
  'gitcafe.com': 1,
  'gist.github.com': 1,
};

exports.parse = function parse(sourceURL) {
  if (!sourceURL || typeof sourceURL !== 'string') {
    return '';
  }

  var url = sourceURL;
  if (url.indexOf('@') >= 0) {
    url = url.replace(/^[^@]+@/, '');    // `git@`` || `https://jpillora@` => ""
  }
  url = url.replace(/^[\w+]+:\/\//, '')    // `git://` || `git+https://` => ""
    .replace(/\.git$/, '');             // .git => ""
  var item = RE.exec(url);
  if (!item) {
    return sourceURL;
  }

  var host = item[1];
  var protocol = HTTPS_HOSTS[host] ? 'https' : 'http';

  // p1/p2/.../pn[.xxx]
  var isContainGit = /\.git$/.test(sourceURL);
  var url = isContainGit ? item[2] : item[2].split('/', 2).join('/');
  return protocol + '://' + host + '/' + url;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1581584713109);
})()
//# sourceMappingURL=index.js.map