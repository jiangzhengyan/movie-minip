module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; var desp = Object.getOwnPropertyDescriptor(m.exports, k); if(desp && desp.configurable) Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1581584713002, function(require, module, exports) {
/**!
 * enable - index.js
 *
 * Copyright(c) 2014 fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 *   dead_horse <dead_horse@qq.com> (http://github.com/dead-horse)
 *   hemanth.hm <hemanth.hm@gmail.com> (http://h3manth.com)
 */



/**
* Helper functions.
*/

function isFunction(attr) {
  return typeof attr === 'function';
}

function isNumber(attr) {
  return typeof attr === 'number';
}

/**
 * Module dependencies.
 */

// generator

try {
  eval('(function* () {})()');
  exports.generator = true;
} catch (_) {
  exports.generator = false;
}

// let

try {
  eval('let a = 1;');
  exports.let = true;
} catch (_) {
  exports.let = false;
}

// const
try {
  eval('(function () { const fubar = 42; return typeof fubar === "number"; }())');
  exports.const = true;
} catch (_) {
  exports.const = false;
}

// Object.{is,assign,getOwnPropertySymbols,setPrototypeOf}
exports.Object = {
  is: isFunction(Object.is),
  assign: isFunction(Object.assign),
  getOwnPropertySymbols: isFunction(Object.getOwnPropertySymbols),
  setPrototypeOf: isFunction(Object.setPrototypeOf)
};

// String methods.
exports.String = {
  raw: isFunction(String.raw),
  fromCodePoint: isFunction(String.fromCodePoint),
  prototype:{
    codePointAt: isFunction(String.prototype.codePointAt),
    normalize: isFunction(String.prototype.normalize),
    repeat: isFunction(String.prototype.repeat),
    startsWith: isFunction(String.prototype.startsWith),
    endsWith: isFunction(String.prototype.endsWith),
    contains: isFunction(String.prototype.contains)
  }
};

exports.Number = {
  isFinite: isFunction(Number.isFinite),
  isInteger: isFunction(Number.isInteger),	
  isSafeInteger: isFunction(Number.isSafeInteger),
  isNaN: isFunction(Number.isNaN),
  EPSILON: isNumber(Number.EPSILON),
  MIN_SAFE_INTEGER: isNumber(Number.MIN_SAFE_INTEGER),
  MAX_SAFE_INTEGER: isNumber(Number.MAX_SAFE_INTEGER)
};

exports.Math = {
  clz32: isFunction(Math.clz32),
  imul: isFunction(Math.imul),
  sign: isFunction(Math.sign),
  log10: isFunction(Math.log10),
  log2: isFunction(Math.log2),
  log1p: isFunction(Math.log1p),
  expm1: isFunction(Math.expm1),
  cosh: isFunction(Math.cosh),
  sinh: isFunction(Math.sinh),
  tanh: isFunction(Math.tanh),	
  acosh: isFunction(Math.acosh),	
  asinh: isFunction(Math.asinh),	
  atanh: isFunction(Math.atanh),
  hypot: isFunction(Math.hypot),	
  trunc: isFunction(Math.trunc),	
  fround: isFunction(Math.fround),	
  cbrt: isFunction(Math.cbrt)
}
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1581584713002);
})()
//# sourceMappingURL=index.js.map