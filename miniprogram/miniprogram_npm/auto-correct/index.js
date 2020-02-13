module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; var desp = Object.getOwnPropertyDescriptor(m.exports, k); if(desp && desp.configurable) Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1581584712929, function(require, module, exports) {
/*!
 * auto-correct - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */



/**
 * Module dependencies.
 */

/**
 * auto correct
 *  install
 *  nstall
 *  nistall
 *  istall
 *  isntall
 *  intall
 *  intsall
 *  insall
 *  insatll
 *  instll
 *  instlal
 *  instal
 *  install
 *
 * =>
 *
 *  install
 *
 * @param {[type]} input [description]
 * @param {[type]} word [description]
 * @return {[type]} [description]
 */
module.exports = function (input, word) {
  return !!genMap(word)[input];
};

function genMap(word) {
  var map = {};
  map[word] = true;

  word = word.split('');

  for (var i = 0; i < word.length; i++) {
    var tmp = word.slice();
    tmp.splice(i, 1);
    map[tmp.join('')] = true;

    if (i === word.length) {
      break;
    }
    tmp = word.slice();
    tmp[i] = word[i + 1];
    tmp[i + 1] = word[i];
    map[tmp.join('')] = true;
  }
  return map;
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1581584712929);
})()
//# sourceMappingURL=index.js.map