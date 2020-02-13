module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; var desp = Object.getOwnPropertyDescriptor(m.exports, k); if(desp && desp.configurable) Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1581584712955, function(require, module, exports) {

/**
 * Expose `read`.
 */

module.exports = read;

/**
 * Read from a readable `stream`.
 *
 * @param {Stream} stream
 * @return {Function}
 */

function read(stream) {
  return typeof stream.read == 'function'
    ? read2(stream)
    : read1(stream);
}

/**
 * Read from a readable streams1 `stream`.
 *
 * @param {Stream} stream
 * @return {Function}
 */

function* read1(stream) {
  var err;
  var data;

  stream.on('data', ondata);
  stream.on('error', onerror);
  stream.resume();

  function ondata(_data) {
    stream.pause();
    data = _data;
  }

  function onerror(_err) {
    err = _err;
  }

  yield function (done) {
    if (err || data || !stream.readable) return done();

    stream.on('data', onevent);
    stream.on('end', onevent);
    stream.on('error', onevent);

    function onevent() {
      stream.removeListener('data', onevent);
      stream.removeListener('end', onevent);
      stream.removeListener('error', onevent);
      done();
    }
  };

  stream.removeListener('data', ondata);
  stream.removeListener('error', onerror);

  if (err) throw err;
  return data;
}

/**
 * Read from a readable streams2 `stream`.
 *
 * @param {Stream} stream
 * @return {Function}
 */

function read2(stream) {
  return function(done) {
    if (!stream.readable) {
      return done();
    }

    function onreadable() {
      cleanup();
      check();
    }

    function onend() {
      cleanup();
      done(null, null);
    }

    function onerror(err) {
      cleanup();
      done(err);
    }

    function listen() {
      stream.on('readable', onreadable);
      stream.on('end', onend);
      stream.on('error', onerror);
    }

    function cleanup() {
      stream.removeListener('readable', onreadable);
      stream.removeListener('end', onend);
      stream.removeListener('error', onerror);
    }

    function check() {
      var buf = stream.read();
      if (buf) {
        done(null, buf);
      } else {
        listen();
      }
    }

    check();
  };
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1581584712955);
})()
//# sourceMappingURL=index.js.map