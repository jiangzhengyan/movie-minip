module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; var desp = Object.getOwnPropertyDescriptor(m.exports, k); if(desp && desp.configurable) Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1581584712938, function(require, module, exports) {


module.exports = require('./package.json').mirrors;

}, function(modId) {var map = {"./package.json":1581584712939}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584712939, function(require, module, exports) {
module.exports = {
  "_from": "binary-mirror-config@^1.19.0",
  "_id": "binary-mirror-config@1.21.0",
  "_inBundle": false,
  "_integrity": "sha1-HTjsjhLJbLBKAFEgF2y7/OgacDI=",
  "_location": "/binary-mirror-config",
  "_phantomChildren": {},
  "_requested": {
    "type": "range",
    "registry": true,
    "raw": "binary-mirror-config@^1.19.0",
    "name": "binary-mirror-config",
    "escapedName": "binary-mirror-config",
    "rawSpec": "^1.19.0",
    "saveSpec": null,
    "fetchSpec": "^1.19.0"
  },
  "_requiredBy": [
    "/npminstall"
  ],
  "_resolved": "https://registry.npm.taobao.org/binary-mirror-config/download/binary-mirror-config-1.21.0.tgz",
  "_shasum": "1d38ec8e12c96cb04a005120176cbbfce81a7032",
  "_spec": "binary-mirror-config@^1.19.0",
  "_where": "D:\\workspace_WeChatProjects\\movie\\miniprogram\\node_modules\\npminstall",
  "author": {
    "name": "fengmk2",
    "email": "m@fengmk2.com",
    "url": "http://fengmk2.com"
  },
  "bugs": {
    "url": "https://github.com/cnpm/binary-mirror-config/issues"
  },
  "bundleDependencies": false,
  "ci": {
    "version": "4, 6, 8, 10"
  },
  "dependencies": {},
  "deprecated": false,
  "description": "Binary mirror config for prebuild and node-pre-gyp",
  "devDependencies": {
    "egg-ci": "1",
    "eslint": "3",
    "eslint-config-egg": "3",
    "istanbul": "*",
    "mocha": "*"
  },
  "files": [
    "index.js"
  ],
  "homepage": "https://github.com/cnpm/binary-mirror-config",
  "keywords": [
    "binary-mirror-config",
    "prebuild",
    "node-pre-gyp"
  ],
  "license": "MIT",
  "main": "index.js",
  "mirrors": {
    "china": {
      "ENVS": {
        "NODEJS_ORG_MIRROR": "https://cdn.npm.taobao.org/dist/node",
        "NVM_NODEJS_ORG_MIRROR": "https://cdn.npm.taobao.org/dist/node",
        "NVM_IOJS_ORG_MIRROR": "https://cdn.npm.taobao.org/dist/iojs",
        "PHANTOMJS_CDNURL": "https://cdn.npm.taobao.org/dist/phantomjs",
        "CHROMEDRIVER_CDNURL": "https://cdn.npm.taobao.org/dist/chromedriver",
        "OPERADRIVER_CDNURL": "https://cdn.npm.taobao.org/dist/operadriver",
        "ELECTRON_MIRROR": "https://cdn.npm.taobao.org/dist/electron/",
        "SASS_BINARY_SITE": "https://cdn.npm.taobao.org/dist/node-sass",
        "SWC_BINARY_SITE": "https://cdn.npm.taobao.org/dist/node-swc",
        "FLOW_BINARY_MIRROR": "https://github.com/facebook/flow/releases/download/v",
        "NWJS_URLBASE": "https://cdn.npm.taobao.org/dist/nwjs/v",
        "PUPPETEER_DOWNLOAD_HOST": "https://cdn.npm.taobao.org/dist",
        "SENTRYCLI_CDNURL": "https://cdn.npm.taobao.org/dist/sentry-cli",
        "npm_config_sharp_binary_host": "https://cdn.npm.taobao.org/dist/sharp"
      },
      "sharp": {
        "replaceHostFiles": [
          "install/libvips.js"
        ],
        "replaceHostMap": {
          "https://github.com/lovell/sharp-libvips/releases/download/": "https://cdn.npm.taobao.org/dist/sharp-libvips/"
        }
      },
      "cypress": {
        "host": "https://cdn.npm.taobao.org/dist/cypress",
        "newPlatforms": {
          "mac": "darwin-x64",
          "win": "win32-ia32",
          "linux64": "linux-x64",
          "darwin": "darwin-x64",
          "win32": "win32-ia32",
          "linux": "linux-x64",
          "darwin-x64": "darwin-x64",
          "linux-x64": "linux-x64",
          "win32-ia32": "win32-ia32",
          "win32-x64": "win32-x64"
        }
      },
      "utf-8-validate": {
        "host": "https://cdn.npm.taobao.org/dist/utf-8-validate/v{version}"
      },
      "leveldown": {
        "host": "https://cdn.npm.taobao.org/dist/leveldown/v{version}"
      },
      "leveldown-hyper": {
        "host": "https://cdn.npm.taobao.org/dist/leveldown-hyper/v{version}"
      },
      "zeromq": {
        "host": "https://cdn.npm.taobao.org/dist/zeromq/v{version}"
      },
      "mknod": {
        "host": "https://cdn.npm.taobao.org/dist/mknod/v{version}"
      },
      "couchbase": {
        "host": "https://cdn.npm.taobao.org/dist/couchbase/v{version}"
      },
      "sodium-prebuilt": {
        "host": "https://cdn.npm.taobao.org/dist/sodium-prebuilt/v{version}"
      },
      "utp-native": {
        "host": "https://cdn.npm.taobao.org/dist/utp-native/v{version}"
      },
      "node-tk5": {
        "host": "https://cdn.npm.taobao.org/dist/node-tk5/v{version}"
      },
      "fuse-bindings": {
        "host": "https://cdn.npm.taobao.org/dist/fuse-bindings/v{version}"
      },
      "zmq-prebuilt": {
        "host": "https://cdn.npm.taobao.org/dist/zmq-prebuilt/v{version}"
      },
      "gl": {
        "host": "https://cdn.npm.taobao.org/dist/gl/v{version}"
      },
      "hackrf": {
        "host": "https://cdn.npm.taobao.org/dist/hackrf/v{version}"
      },
      "rabin": {
        "host": "https://cdn.npm.taobao.org/dist/rabin/v{version}"
      },
      "v8-debug": {
        "host": "https://cdn.npm.taobao.org/dist/node-inspector"
      },
      "v8-profiler": {
        "host": "https://cdn.npm.taobao.org/dist/node-inspector"
      },
      "sqlite3": {
        "host": "https://cdn.npm.taobao.org/dist"
      },
      "grpc": {
        "host": "https://cdn.npm.taobao.org/dist",
        "remote_path": "{name}/v{version}"
      },
      "fsevents": {
        "host": "https://cdn.npm.taobao.org/dist/fsevents"
      },
      "nodegit": {
        "host": "https://cdn.npm.taobao.org/dist/nodegit/v{version}"
      },
      "canvas-prebuilt": {
        "host": "https://cdn.npm.taobao.org/dist/canvas-prebuilt"
      },
      "canvas": {
        "host": "https://cdn.npm.taobao.org/dist/node-canvas-prebuilt"
      },
      "flow-bin": {
        "replaceHost": "https://github.com/facebook/flow/releases/download/v",
        "host": "https://cdn.npm.taobao.org/dist/flow/v"
      },
      "jpegtran-bin": {
        "replaceHost": [
          "https://raw.githubusercontent.com/imagemin/jpegtran-bin",
          "https://raw.github.com/imagemin/jpegtran-bin"
        ],
        "host": "https://npm.taobao.org/mirrors/jpegtran-bin"
      },
      "cwebp-bin": {
        "replaceHost": [
          "https://raw.githubusercontent.com/imagemin/cwebp-bin",
          "https://raw.github.com/imagemin/cwebp-bin"
        ],
        "host": "https://npm.taobao.org/mirrors/cwebp-bin"
      },
      "zopflipng-bin": {
        "replaceHost": [
          "https://raw.githubusercontent.com/imagemin/zopflipng-bin",
          "https://raw.github.com/imagemin/zopflipng-bin"
        ],
        "host": "https://npm.taobao.org/mirrors/zopflipng-bin"
      },
      "optipng-bin": {
        "replaceHost": [
          "https://raw.githubusercontent.com/imagemin/optipng-bin",
          "https://raw.github.com/imagemin/optipng-bin"
        ],
        "host": "https://npm.taobao.org/mirrors/optipng-bin"
      },
      "mozjpeg": {
        "replaceHost": [
          "https://raw.githubusercontent.com/imagemin/mozjpeg-bin",
          "https://raw.github.com/imagemin/mozjpeg-bin"
        ],
        "host": "https://npm.taobao.org/mirrors/mozjpeg-bin"
      },
      "gifsicle": {
        "replaceHost": [
          "https://raw.githubusercontent.com/imagemin/gifsicle-bin",
          "https://raw.github.com/imagemin/gifsicle-bin"
        ],
        "host": "https://npm.taobao.org/mirrors/gifsicle-bin"
      },
      "pngquant-bin": {
        "replaceHost": [
          "https://raw.githubusercontent.com/imagemin/pngquant-bin",
          "https://raw.github.com/imagemin/pngquant-bin"
        ],
        "host": "https://npm.taobao.org/mirrors/pngquant-bin",
        "replaceHostMap": {
          "https://raw.githubusercontent.com/imagemin/pngquant-bin": "https://npm.taobao.org/mirrors/pngquant-bin",
          "https://raw.github.com/imagemin/pngquant-bin": "https://npm.taobao.org/mirrors/pngquant-bin"
        }
      },
      "pngcrush-bin": {
        "replaceHost": [
          "https://raw.githubusercontent.com/imagemin/pngcrush-bin",
          "https://raw.github.com/imagemin/pngcrush-bin"
        ],
        "host": "https://npm.taobao.org/mirrors/pngcrush-bin"
      },
      "jpeg-recompress-bin": {
        "replaceHost": [
          "https://raw.githubusercontent.com/imagemin/jpeg-recompress-bin",
          "https://raw.github.com/imagemin/jpeg-recompress-bin"
        ],
        "host": "https://npm.taobao.org/mirrors/jpeg-recompress-bin"
      },
      "advpng-bin": {
        "replaceHost": [
          "https://raw.githubusercontent.com/imagemin/advpng-bin",
          "https://raw.github.com/imagemin/advpng-bin"
        ],
        "host": "https://npm.taobao.org/mirrors/advpng-bin"
      },
      "pngout-bin": {
        "replaceHost": [
          "https://raw.githubusercontent.com/imagemin/pngout-bin",
          "https://raw.github.com/imagemin/pngout-bin"
        ],
        "host": "https://npm.taobao.org/mirrors/pngout-bin"
      },
      "jpegoptim-bin": {
        "replaceHost": [
          "https://raw.githubusercontent.com/imagemin/jpegoptim-bin",
          "https://raw.github.com/imagemin/jpegoptim-bin"
        ],
        "host": "https://npm.taobao.org/mirrors/jpegoptim-bin"
      },
      "vscode": {
        "replaceHostRegExpMap": {
          "https://raw\\.githubusercontent\\.com/": "https://raw.github.cnpmjs.org/"
        }
      }
    }
  },
  "name": "binary-mirror-config",
  "repository": {
    "type": "git",
    "url": "git://github.com/cnpm/binary-mirror-config.git",
    "web": "https://github.com/cnpm/binary-mirror-config"
  },
  "scripts": {
    "ci": "npm run lint && npm run test-cov",
    "lint": "eslint index.js",
    "test": "npm run lint && mocha -t 5000 test/*.test.js",
    "test-cov": "istanbul cover _mocha -- -t 5000 test/*.test.js"
  },
  "version": "1.21.0"
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1581584712938);
})()
//# sourceMappingURL=index.js.map