module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; var desp = Object.getOwnPropertyDescriptor(m.exports, k); if(desp && desp.configurable) Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1581584713030, function(require, module, exports) {
var assign = require('./util/assign')

var fse = {}
var gfs = require('graceful-fs')

// attach fs methods to fse
Object.keys(gfs).forEach(function (key) {
  fse[key] = gfs[key]
})

var fs = fse

assign(fs, require('./copy'))
assign(fs, require('./copy-sync'))
assign(fs, require('./mkdirs'))
assign(fs, require('./remove'))
assign(fs, require('./json'))
assign(fs, require('./move'))
assign(fs, require('./streams'))
assign(fs, require('./empty'))
assign(fs, require('./ensure'))
assign(fs, require('./output'))
assign(fs, require('./walk'))

module.exports = fs

// maintain backwards compatibility for awhile
var jsonfile = {}
Object.defineProperty(jsonfile, 'spaces', {
  get: function () {
    return fs.spaces // found in ./json
  },
  set: function (val) {
    fs.spaces = val
  }
})

module.exports.jsonfile = jsonfile // so users of fs-extra can modify jsonFile.spaces

}, function(modId) {var map = {"./util/assign":1581584713031,"./copy":1581584713032,"./copy-sync":1581584713039,"./mkdirs":1581584713036,"./remove":1581584713042,"./json":1581584713043,"./move":1581584713047,"./streams":1581584713048,"./empty":1581584713050,"./ensure":1581584713051,"./output":1581584713057,"./walk":1581584713058}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713031, function(require, module, exports) {
// simple mutable assign
function assign () {
  var args = [].slice.call(arguments).filter(function (i) { return i })
  var dest = args.shift()
  args.forEach(function (src) {
    Object.keys(src).forEach(function (key) {
      dest[key] = src[key]
    })
  })

  return dest
}

module.exports = assign

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713032, function(require, module, exports) {
module.exports = {
  copy: require('./copy')
}

}, function(modId) { var map = {"./copy":1581584713033}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713033, function(require, module, exports) {
var fs = require('graceful-fs')
var path = require('path')
var ncp = require('./ncp')
var mkdir = require('../mkdirs')

function copy (src, dest, options, callback) {
  if (typeof options === 'function' && !callback) {
    callback = options
    options = {}
  } else if (typeof options === 'function' || options instanceof RegExp) {
    options = {filter: options}
  }
  callback = callback || function () {}
  options = options || {}

  // don't allow src and dest to be the same
  var basePath = process.cwd()
  var currentPath = path.resolve(basePath, src)
  var targetPath = path.resolve(basePath, dest)
  if (currentPath === targetPath) return callback(new Error('Source and destination must not be the same.'))

  fs.lstat(src, function (err, stats) {
    if (err) return callback(err)

    var dir = null
    if (stats.isDirectory()) {
      var parts = dest.split(path.sep)
      parts.pop()
      dir = parts.join(path.sep)
    } else {
      dir = path.dirname(dest)
    }

    fs.exists(dir, function (dirExists) {
      if (dirExists) return ncp(src, dest, options, callback)
      mkdir.mkdirs(dir, function (err) {
        if (err) return callback(err)
        ncp(src, dest, options, callback)
      })
    })
  })
}

module.exports = copy

}, function(modId) { var map = {"./ncp":1581584713034,"../mkdirs":1581584713036}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713034, function(require, module, exports) {
// imported from ncp (this is temporary, will rewrite)

var fs = require('graceful-fs')
var path = require('path')
var utimes = require('../util/utimes')

function ncp (source, dest, options, callback) {
  if (!callback) {
    callback = options
    options = {}
  }

  var basePath = process.cwd()
  var currentPath = path.resolve(basePath, source)
  var targetPath = path.resolve(basePath, dest)

  var filter = options.filter
  var transform = options.transform
  var clobber = options.clobber !== false
  var dereference = options.dereference
  var preserveTimestamps = options.preserveTimestamps === true

  var errs = null

  var started = 0
  var finished = 0
  var running = 0
  // this is pretty useless now that we're using graceful-fs
  // consider removing
  var limit = options.limit || 512

  startCopy(currentPath)

  function startCopy (source) {
    started++
    if (filter) {
      if (filter instanceof RegExp) {
        if (!filter.test(source)) {
          return doneOne(true)
        }
      } else if (typeof filter === 'function') {
        if (!filter(source)) {
          return doneOne(true)
        }
      }
    }
    return getStats(source)
  }

  function getStats (source) {
    var stat = dereference ? fs.stat : fs.lstat
    if (running >= limit) {
      return setImmediate(function () {
        getStats(source)
      })
    }
    running++
    stat(source, function (err, stats) {
      if (err) return onError(err)

      // We need to get the mode from the stats object and preserve it.
      var item = {
        name: source,
        mode: stats.mode,
        mtime: stats.mtime, // modified time
        atime: stats.atime, // access time
        stats: stats // temporary
      }

      if (stats.isDirectory()) {
        return onDir(item)
      } else if (stats.isFile() || stats.isCharacterDevice() || stats.isBlockDevice()) {
        return onFile(item)
      } else if (stats.isSymbolicLink()) {
        // Symlinks don't really need to know about the mode.
        return onLink(source)
      }
    })
  }

  function onFile (file) {
    var target = file.name.replace(currentPath, targetPath)
    isWritable(target, function (writable) {
      if (writable) {
        copyFile(file, target)
      } else {
        if (clobber) {
          rmFile(target, function () {
            copyFile(file, target)
          })
        } else {
          doneOne()
        }
      }
    })
  }

  function copyFile (file, target) {
    var readStream = fs.createReadStream(file.name)
    var writeStream = fs.createWriteStream(target, { mode: file.mode })

    readStream.on('error', onError)
    writeStream.on('error', onError)

    if (transform) {
      transform(readStream, writeStream, file)
    } else {
      writeStream.on('open', function () {
        readStream.pipe(writeStream)
      })
    }

    writeStream.once('finish', function () {
      fs.chmod(target, file.mode, function (err) {
        if (err) return onError(err)
        if (preserveTimestamps) {
          utimes.utimesMillis(target, file.atime, file.mtime, function (err) {
            if (err) return onError(err)
            return doneOne()
          })
        } else {
          doneOne()
        }
      })
    })
  }

  function rmFile (file, done) {
    fs.unlink(file, function (err) {
      if (err) return onError(err)
      return done()
    })
  }

  function onDir (dir) {
    var target = dir.name.replace(currentPath, targetPath)
    isWritable(target, function (writable) {
      if (writable) {
        return mkDir(dir, target)
      }
      copyDir(dir.name)
    })
  }

  function mkDir (dir, target) {
    fs.mkdir(target, dir.mode, function (err) {
      if (err) return onError(err)
      // despite setting mode in fs.mkdir, doesn't seem to work
      // so we set it here.
      fs.chmod(target, dir.mode, function (err) {
        if (err) return onError(err)
        copyDir(dir.name)
      })
    })
  }

  function copyDir (dir) {
    fs.readdir(dir, function (err, items) {
      if (err) return onError(err)
      items.forEach(function (item) {
        startCopy(path.join(dir, item))
      })
      return doneOne()
    })
  }

  function onLink (link) {
    var target = link.replace(currentPath, targetPath)
    fs.readlink(link, function (err, resolvedPath) {
      if (err) return onError(err)
      checkLink(resolvedPath, target)
    })
  }

  function checkLink (resolvedPath, target) {
    if (dereference) {
      resolvedPath = path.resolve(basePath, resolvedPath)
    }
    isWritable(target, function (writable) {
      if (writable) {
        return makeLink(resolvedPath, target)
      }
      fs.readlink(target, function (err, targetDest) {
        if (err) return onError(err)

        if (dereference) {
          targetDest = path.resolve(basePath, targetDest)
        }
        if (targetDest === resolvedPath) {
          return doneOne()
        }
        return rmFile(target, function () {
          makeLink(resolvedPath, target)
        })
      })
    })
  }

  function makeLink (linkPath, target) {
    fs.symlink(linkPath, target, function (err) {
      if (err) return onError(err)
      return doneOne()
    })
  }

  function isWritable (path, done) {
    fs.lstat(path, function (err) {
      if (err) {
        if (err.code === 'ENOENT') return done(true)
        return done(false)
      }
      return done(false)
    })
  }

  function onError (err) {
    if (options.stopOnError) {
      return callback(err)
    } else if (!errs && options.errs) {
      errs = fs.createWriteStream(options.errs)
    } else if (!errs) {
      errs = []
    }
    if (typeof errs.write === 'undefined') {
      errs.push(err)
    } else {
      errs.write(err.stack + '\n\n')
    }
    return doneOne()
  }

  function doneOne (skipped) {
    if (!skipped) running--
    finished++
    if ((started === finished) && (running === 0)) {
      if (callback !== undefined) {
        return errs ? callback(errs) : callback(null)
      }
    }
  }
}

module.exports = ncp

}, function(modId) { var map = {"../util/utimes":1581584713035}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713035, function(require, module, exports) {
var fs = require('graceful-fs')
var path = require('path')
var os = require('os')

// HFS, ext{2,3}, FAT do not, Node.js v0.10 does not
function hasMillisResSync () {
  var tmpfile = path.join('millis-test-sync' + Date.now().toString() + Math.random().toString().slice(2))
  tmpfile = path.join(os.tmpdir(), tmpfile)

  // 550 millis past UNIX epoch
  var d = new Date(1435410243862)
  fs.writeFileSync(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141')
  var fd = fs.openSync(tmpfile, 'r+')
  fs.futimesSync(fd, d, d)
  fs.closeSync(fd)
  return fs.statSync(tmpfile).mtime > 1435410243000
}

function hasMillisRes (callback) {
  var tmpfile = path.join('millis-test' + Date.now().toString() + Math.random().toString().slice(2))
  tmpfile = path.join(os.tmpdir(), tmpfile)

  // 550 millis past UNIX epoch
  var d = new Date(1435410243862)
  fs.writeFile(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141', function (err) {
    if (err) return callback(err)
    fs.open(tmpfile, 'r+', function (err, fd) {
      if (err) return callback(err)
      fs.futimes(fd, d, d, function (err) {
        if (err) return callback(err)
        fs.close(fd, function (err) {
          if (err) return callback(err)
          fs.stat(tmpfile, function (err, stats) {
            if (err) return callback(err)
            callback(null, stats.mtime > 1435410243000)
          })
        })
      })
    })
  })
}

function timeRemoveMillis (timestamp) {
  if (typeof timestamp === 'number') {
    return Math.floor(timestamp / 1000) * 1000
  } else if (timestamp instanceof Date) {
    return new Date(Math.floor(timestamp.getTime() / 1000) * 1000)
  } else {
    throw new Error('fs-extra: timeRemoveMillis() unknown parameter type')
  }
}

function utimesMillis (path, atime, mtime, callback) {
  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
  fs.open(path, 'r+', function (err, fd) {
    if (err) return callback(err)
    fs.futimes(fd, atime, mtime, function (err) {
      if (err) return callback(err)
      fs.close(fd, callback)
    })
  })
}

module.exports = {
  hasMillisRes: hasMillisRes,
  hasMillisResSync: hasMillisResSync,
  timeRemoveMillis: timeRemoveMillis,
  utimesMillis: utimesMillis
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713036, function(require, module, exports) {
module.exports = {
  mkdirs: require('./mkdirs'),
  mkdirsSync: require('./mkdirs-sync'),
  // alias
  mkdirp: require('./mkdirs'),
  mkdirpSync: require('./mkdirs-sync'),
  ensureDir: require('./mkdirs'),
  ensureDirSync: require('./mkdirs-sync')
}

}, function(modId) { var map = {"./mkdirs":1581584713037,"./mkdirs-sync":1581584713038}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713037, function(require, module, exports) {
var fs = require('graceful-fs')
var path = require('path')

var o777 = parseInt('0777', 8)

function mkdirs (p, opts, callback, made) {
  if (typeof opts === 'function') {
    callback = opts
    opts = {}
  } else if (!opts || typeof opts !== 'object') {
    opts = { mode: opts }
  }

  var mode = opts.mode
  var xfs = opts.fs || fs

  if (mode === undefined) {
    mode = o777 & (~process.umask())
  }
  if (!made) made = null

  callback = callback || function () {}
  p = path.resolve(p)

  xfs.mkdir(p, mode, function (er) {
    if (!er) {
      made = made || p
      return callback(null, made)
    }
    switch (er.code) {
      case 'ENOENT':
        if (path.dirname(p) === p) return callback(er)
        mkdirs(path.dirname(p), opts, function (er, made) {
          if (er) callback(er, made)
          else mkdirs(p, opts, callback, made)
        })
        break

      // In the case of any other error, just see if there's a dir
      // there already.  If so, then hooray!  If not, then something
      // is borked.
      default:
        xfs.stat(p, function (er2, stat) {
          // if the stat fails, then that's super weird.
          // let the original error be the failure reason.
          if (er2 || !stat.isDirectory()) callback(er, made)
          else callback(null, made)
        })
        break
    }
  })
}

module.exports = mkdirs

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713038, function(require, module, exports) {
var fs = require('graceful-fs')
var path = require('path')

var o777 = parseInt('0777', 8)

function mkdirsSync (p, opts, made) {
  if (!opts || typeof opts !== 'object') {
    opts = { mode: opts }
  }

  var mode = opts.mode
  var xfs = opts.fs || fs

  if (mode === undefined) {
    mode = o777 & (~process.umask())
  }
  if (!made) made = null

  p = path.resolve(p)

  try {
    xfs.mkdirSync(p, mode)
    made = made || p
  } catch (err0) {
    switch (err0.code) {
      case 'ENOENT' :
        made = mkdirsSync(path.dirname(p), opts, made)
        mkdirsSync(p, opts, made)
        break

      // In the case of any other error, just see if there's a dir
      // there already.  If so, then hooray!  If not, then something
      // is borked.
      default:
        var stat
        try {
          stat = xfs.statSync(p)
        } catch (err1) {
          throw err0
        }
        if (!stat.isDirectory()) throw err0
        break
    }
  }

  return made
}

module.exports = mkdirsSync

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713039, function(require, module, exports) {
module.exports = {
  copySync: require('./copy-sync')
}

}, function(modId) { var map = {"./copy-sync":1581584713040}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713040, function(require, module, exports) {
var fs = require('graceful-fs')
var path = require('path')
var copyFileSync = require('./copy-file-sync')
var mkdir = require('../mkdirs')

function copySync (src, dest, options) {
  if (typeof options === 'function' || options instanceof RegExp) {
    options = {filter: options}
  }

  options = options || {}
  options.recursive = !!options.recursive

  // default to true for now
  options.clobber = 'clobber' in options ? !!options.clobber : true
  options.preserveTimestamps = 'preserveTimestamps' in options ? !!options.preserveTimestamps : false

  options.filter = options.filter || function () { return true }

  var stats = options.recursive ? fs.lstatSync(src) : fs.statSync(src)
  var destFolder = path.dirname(dest)
  var destFolderExists = fs.existsSync(destFolder)
  var performCopy = false

  if (stats.isFile()) {
    if (options.filter instanceof RegExp) performCopy = options.filter.test(src)
    else if (typeof options.filter === 'function') performCopy = options.filter(src)

    if (performCopy) {
      if (!destFolderExists) mkdir.mkdirsSync(destFolder)
      copyFileSync(src, dest, {clobber: options.clobber, preserveTimestamps: options.preserveTimestamps})
    }
  } else if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) mkdir.mkdirsSync(dest)
    var contents = fs.readdirSync(src)
    contents.forEach(function (content) {
      var opts = options
      opts.recursive = true
      copySync(path.join(src, content), path.join(dest, content), opts)
    })
  } else if (options.recursive && stats.isSymbolicLink()) {
    var srcPath = fs.readlinkSync(src)
    fs.symlinkSync(srcPath, dest)
  }
}

module.exports = copySync

}, function(modId) { var map = {"./copy-file-sync":1581584713041,"../mkdirs":1581584713036}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713041, function(require, module, exports) {
var fs = require('graceful-fs')

var BUF_LENGTH = 64 * 1024
var _buff = new Buffer(BUF_LENGTH)

function copyFileSync (srcFile, destFile, options) {
  var clobber = options.clobber
  var preserveTimestamps = options.preserveTimestamps

  if (fs.existsSync(destFile)) {
    if (clobber) {
      fs.chmodSync(destFile, parseInt('777', 8))
      fs.unlinkSync(destFile)
    } else {
      throw Error('EEXIST')
    }
  }

  var fdr = fs.openSync(srcFile, 'r')
  var stat = fs.fstatSync(fdr)
  var fdw = fs.openSync(destFile, 'w', stat.mode)
  var bytesRead = 1
  var pos = 0

  while (bytesRead > 0) {
    bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos)
    fs.writeSync(fdw, _buff, 0, bytesRead)
    pos += bytesRead
  }

  if (preserveTimestamps) {
    fs.futimesSync(fdw, stat.atime, stat.mtime)
  }

  fs.closeSync(fdr)
  fs.closeSync(fdw)
}

module.exports = copyFileSync

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713042, function(require, module, exports) {
var rimraf = require('rimraf')

function removeSync (dir) {
  return rimraf.sync(dir)
}

function remove (dir, callback) {
  return callback ? rimraf(dir, callback) : rimraf(dir, function () {})
}

module.exports = {
  remove: remove,
  removeSync: removeSync
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713043, function(require, module, exports) {
var jsonFile = require('./jsonfile')

jsonFile.outputJsonSync = require('./output-json-sync')
jsonFile.outputJson = require('./output-json')
// aliases
jsonFile.outputJSONSync = require('./output-json-sync')
jsonFile.outputJSON = require('./output-json')

module.exports = jsonFile

}, function(modId) { var map = {"./jsonfile":1581584713044,"./output-json-sync":1581584713045,"./output-json":1581584713046}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713044, function(require, module, exports) {
var jsonFile = require('jsonfile')

module.exports = {
  // jsonfile exports
  readJson: jsonFile.readFile,
  readJSON: jsonFile.readFile,
  readJsonSync: jsonFile.readFileSync,
  readJSONSync: jsonFile.readFileSync,
  writeJson: jsonFile.writeFile,
  writeJSON: jsonFile.writeFile,
  writeJsonSync: jsonFile.writeFileSync,
  writeJSONSync: jsonFile.writeFileSync,
  spaces: 2 // default in fs-extra
}

}, function(modId) { var map = {"jsonfile":1581584713044}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713045, function(require, module, exports) {
var fs = require('graceful-fs')
var path = require('path')
var jsonFile = require('./jsonfile')
var mkdir = require('../mkdirs')

function outputJsonSync (file, data, options) {
  var dir = path.dirname(file)

  if (!fs.existsSync(dir)) {
    mkdir.mkdirsSync(dir)
  }

  jsonFile.writeJsonSync(file, data, options)
}

module.exports = outputJsonSync

}, function(modId) { var map = {"./jsonfile":1581584713044,"../mkdirs":1581584713036}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713046, function(require, module, exports) {
var fs = require('graceful-fs')
var path = require('path')
var jsonFile = require('./jsonfile')
var mkdir = require('../mkdirs')

function outputJson (file, data, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  var dir = path.dirname(file)

  fs.exists(dir, function (itDoes) {
    if (itDoes) return jsonFile.writeJson(file, data, options, callback)

    mkdir.mkdirs(dir, function (err) {
      if (err) return callback(err)
      jsonFile.writeJson(file, data, options, callback)
    })
  })
}

module.exports = outputJson

}, function(modId) { var map = {"./jsonfile":1581584713044,"../mkdirs":1581584713036}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713047, function(require, module, exports) {
// most of this code was written by Andrew Kelley
// licensed under the BSD license: see
// https://github.com/andrewrk/node-mv/blob/master/package.json

// this needs a cleanup

var fs = require('graceful-fs')
var ncp = require('../copy/ncp')
var path = require('path')
var rimraf = require('rimraf')
var mkdirp = require('../mkdirs').mkdirs

function mv (source, dest, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  var shouldMkdirp = ('mkdirp' in options) ? options.mkdirp : true
  var clobber = ('clobber' in options) ? options.clobber : false

  var limit = options.limit || 16

  if (shouldMkdirp) {
    mkdirs()
  } else {
    doRename()
  }

  function mkdirs () {
    mkdirp(path.dirname(dest), function (err) {
      if (err) return callback(err)
      doRename()
    })
  }

  function doRename () {
    if (clobber) {
      fs.rename(source, dest, function (err) {
        if (!err) return callback()

        if (err.code === 'ENOTEMPTY' || err.code === 'EEXIST') {
          rimraf(dest, function (err) {
            if (err) return callback(err)
            options.clobber = false // just clobbered it, no need to do it again
            mv(source, dest, options, callback)
          })
          return
        }

        // weird Windows shit
        if (err.code === 'EPERM') {
          setTimeout(function () {
            rimraf(dest, function (err) {
              if (err) return callback(err)
              options.clobber = false
              mv(source, dest, options, callback)
            })
          }, 200)
          return
        }

        if (err.code !== 'EXDEV') return callback(err)
        moveAcrossDevice(source, dest, clobber, limit, callback)
      })
    } else {
      fs.link(source, dest, function (err) {
        if (err) {
          if (err.code === 'EXDEV' || err.code === 'EISDIR' || err.code === 'EPERM') {
            moveAcrossDevice(source, dest, clobber, limit, callback)
            return
          }
          callback(err)
          return
        }
        fs.unlink(source, callback)
      })
    }
  }
}

function moveAcrossDevice (source, dest, clobber, limit, callback) {
  fs.stat(source, function (err, stat) {
    if (err) {
      callback(err)
      return
    }

    if (stat.isDirectory()) {
      moveDirAcrossDevice(source, dest, clobber, limit, callback)
    } else {
      moveFileAcrossDevice(source, dest, clobber, limit, callback)
    }
  })
}

function moveFileAcrossDevice (source, dest, clobber, limit, callback) {
  var outFlags = clobber ? 'w' : 'wx'
  var ins = fs.createReadStream(source)
  var outs = fs.createWriteStream(dest, {flags: outFlags})

  ins.on('error', function (err) {
    ins.destroy()
    outs.destroy()
    outs.removeListener('close', onClose)

    // may want to create a directory but `out` line above
    // creates an empty file for us: See #108
    // don't care about error here
    fs.unlink(dest, function () {
      // note: `err` here is from the input stream errror
      if (err.code === 'EISDIR' || err.code === 'EPERM') {
        moveDirAcrossDevice(source, dest, clobber, limit, callback)
      } else {
        callback(err)
      }
    })
  })

  outs.on('error', function (err) {
    ins.destroy()
    outs.destroy()
    outs.removeListener('close', onClose)
    callback(err)
  })

  outs.once('close', onClose)
  ins.pipe(outs)

  function onClose () {
    fs.unlink(source, callback)
  }
}

function moveDirAcrossDevice (source, dest, clobber, limit, callback) {
  var options = {
    stopOnErr: true,
    clobber: false,
    limit: limit
  }

  function startNcp () {
    ncp(source, dest, options, function (errList) {
      if (errList) return callback(errList[0])
      rimraf(source, callback)
    })
  }

  if (clobber) {
    rimraf(dest, function (err) {
      if (err) return callback(err)
      startNcp()
    })
  } else {
    startNcp()
  }
}

module.exports = {
  move: mv
}

}, function(modId) { var map = {"../copy/ncp":1581584713034,"../mkdirs":1581584713036}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713048, function(require, module, exports) {
module.exports = {
  createOutputStream: require('./create-output-stream')
}

}, function(modId) { var map = {"./create-output-stream":1581584713049}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713049, function(require, module, exports) {
var path = require('path')
var fs = require('fs')
var mkdir = require('../mkdirs')
var WriteStream = fs.WriteStream

function createOutputStream (file, options) {
  var dirExists = false
  var dir = path.dirname(file)
  options = options || {}

  // if fd is set with an actual number, file is created, hence directory is too
  if (options.fd) {
    return fs.createWriteStream(file, options)
  } else {
    // this hacks the WriteStream constructor from calling open()
    options.fd = -1
  }

  var ws = new WriteStream(file, options)

  var oldOpen = ws.open
  ws.open = function () {
    ws.fd = null // set actual fd
    if (dirExists) return oldOpen.call(ws)

    // this only runs once on first write
    mkdir.mkdirs(dir, function (err) {
      if (err) {
        ws.destroy()
        ws.emit('error', err)
        return
      }
      dirExists = true
      oldOpen.call(ws)
    })
  }

  ws.open()

  return ws
}

module.exports = createOutputStream

}, function(modId) { var map = {"../mkdirs":1581584713036}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713050, function(require, module, exports) {
var fs = require('fs')
var path = require('path')
var mkdir = require('../mkdirs')
var remove = require('../remove')

function emptyDir (dir, callback) {
  callback = callback || function () {}
  fs.readdir(dir, function (err, items) {
    if (err) return mkdir.mkdirs(dir, callback)

    items = items.map(function (item) {
      return path.join(dir, item)
    })

    deleteItem()

    function deleteItem () {
      var item = items.pop()
      if (!item) return callback()
      remove.remove(item, function (err) {
        if (err) return callback(err)
        deleteItem()
      })
    }
  })
}

function emptyDirSync (dir) {
  var items
  try {
    items = fs.readdirSync(dir)
  } catch (err) {
    return mkdir.mkdirsSync(dir)
  }

  items.forEach(function (item) {
    item = path.join(dir, item)
    remove.removeSync(item)
  })
}

module.exports = {
  emptyDirSync: emptyDirSync,
  emptydirSync: emptyDirSync,
  emptyDir: emptyDir,
  emptydir: emptyDir
}

}, function(modId) { var map = {"../mkdirs":1581584713036,"../remove":1581584713042}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713051, function(require, module, exports) {
var file = require('./file')
var link = require('./link')
var symlink = require('./symlink')

module.exports = {
  // file
  createFile: file.createFile,
  createFileSync: file.createFileSync,
  ensureFile: file.createFile,
  ensureFileSync: file.createFileSync,
  // link
  createLink: link.createLink,
  createLinkSync: link.createLinkSync,
  ensureLink: link.createLink,
  ensureLinkSync: link.createLinkSync,
  // symlink
  createSymlink: symlink.createSymlink,
  createSymlinkSync: symlink.createSymlinkSync,
  ensureSymlink: symlink.createSymlink,
  ensureSymlinkSync: symlink.createSymlinkSync
}

}, function(modId) { var map = {"./file":1581584713052,"./link":1581584713053,"./symlink":1581584713054}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713052, function(require, module, exports) {
var path = require('path')
var fs = require('graceful-fs')
var mkdir = require('../mkdirs')

function createFile (file, callback) {
  function makeFile () {
    fs.writeFile(file, '', function (err) {
      if (err) return callback(err)
      callback()
    })
  }

  fs.exists(file, function (fileExists) {
    if (fileExists) return callback()
    var dir = path.dirname(file)
    fs.exists(dir, function (dirExists) {
      if (dirExists) return makeFile()
      mkdir.mkdirs(dir, function (err) {
        if (err) return callback(err)
        makeFile()
      })
    })
  })
}

function createFileSync (file) {
  if (fs.existsSync(file)) return

  var dir = path.dirname(file)
  if (!fs.existsSync(dir)) {
    mkdir.mkdirsSync(dir)
  }

  fs.writeFileSync(file, '')
}

module.exports = {
  createFile: createFile,
  createFileSync: createFileSync,
  // alias
  ensureFile: createFile,
  ensureFileSync: createFileSync
}

}, function(modId) { var map = {"../mkdirs":1581584713036}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713053, function(require, module, exports) {
var path = require('path')
var fs = require('graceful-fs')
var mkdir = require('../mkdirs')

function createLink (srcpath, dstpath, callback) {
  function makeLink (srcpath, dstpath) {
    fs.link(srcpath, dstpath, function (err) {
      if (err) return callback(err)
      callback(null)
    })
  }

  fs.exists(dstpath, function (destinationExists) {
    if (destinationExists) return callback(null)
    fs.lstat(srcpath, function (err, stat) {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureLink')
        return callback(err)
      }

      var dir = path.dirname(dstpath)
      fs.exists(dir, function (dirExists) {
        if (dirExists) return makeLink(srcpath, dstpath)
        mkdir.mkdirs(dir, function (err) {
          if (err) return callback(err)
          makeLink(srcpath, dstpath)
        })
      })
    })
  })
}

function createLinkSync (srcpath, dstpath, callback) {
  var destinationExists = fs.existsSync(dstpath)
  if (destinationExists) return undefined

  try {
    fs.lstatSync(srcpath)
  } catch (err) {
    err.message = err.message.replace('lstat', 'ensureLink')
    throw err
  }

  var dir = path.dirname(dstpath)
  var dirExists = fs.existsSync(dir)
  if (dirExists) return fs.linkSync(srcpath, dstpath)
  mkdir.mkdirsSync(dir)

  return fs.linkSync(srcpath, dstpath)
}

module.exports = {
  createLink: createLink,
  createLinkSync: createLinkSync,
  // alias
  ensureLink: createLink,
  ensureLinkSync: createLinkSync
}

}, function(modId) { var map = {"../mkdirs":1581584713036}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713054, function(require, module, exports) {
var path = require('path')
var fs = require('graceful-fs')
var _mkdirs = require('../mkdirs')
var mkdirs = _mkdirs.mkdirs
var mkdirsSync = _mkdirs.mkdirsSync

var _symlinkPaths = require('./symlink-paths')
var symlinkPaths = _symlinkPaths.symlinkPaths
var symlinkPathsSync = _symlinkPaths.symlinkPathsSync

var _symlinkType = require('./symlink-type')
var symlinkType = _symlinkType.symlinkType
var symlinkTypeSync = _symlinkType.symlinkTypeSync

function createSymlink (srcpath, dstpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type

  fs.exists(dstpath, function (destinationExists) {
    if (destinationExists) return callback(null)
    symlinkPaths(srcpath, dstpath, function (err, relative) {
      if (err) return callback(err)
      srcpath = relative.toDst
      symlinkType(relative.toCwd, type, function (err, type) {
        if (err) return callback(err)
        var dir = path.dirname(dstpath)
        fs.exists(dir, function (dirExists) {
          if (dirExists) return fs.symlink(srcpath, dstpath, type, callback)
          mkdirs(dir, function (err) {
            if (err) return callback(err)
            fs.symlink(srcpath, dstpath, type, callback)
          })
        })
      })
    })
  })
}

function createSymlinkSync (srcpath, dstpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type

  var destinationExists = fs.existsSync(dstpath)
  if (destinationExists) return undefined

  var relative = symlinkPathsSync(srcpath, dstpath)
  srcpath = relative.toDst
  type = symlinkTypeSync(relative.toCwd, type)
  var dir = path.dirname(dstpath)
  var exists = fs.existsSync(dir)
  if (exists) return fs.symlinkSync(srcpath, dstpath, type)
  mkdirsSync(dir)
  return fs.symlinkSync(srcpath, dstpath, type)
}

module.exports = {
  createSymlink: createSymlink,
  createSymlinkSync: createSymlinkSync,
  // alias
  ensureSymlink: createSymlink,
  ensureSymlinkSync: createSymlinkSync
}

}, function(modId) { var map = {"../mkdirs":1581584713036,"./symlink-paths":1581584713055,"./symlink-type":1581584713056}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713055, function(require, module, exports) {
var path = require('path')
// path.isAbsolute shim for Node.js 0.10 support
path.isAbsolute = (path.isAbsolute) ? path.isAbsolute : require('path-is-absolute')
var fs = require('graceful-fs')

/**
 * Function that returns two types of paths, one relative to symlink, and one
 * relative to the current working directory. Checks if path is absolute or
 * relative. If the path is relative, this function checks if the path is
 * relative to symlink or relative to current working directory. This is an
 * initiative to find a smarter `srcpath` to supply when building symlinks.
 * This allows you to determine which path to use out of one of three possible
 * types of source paths. The first is an absolute path. This is detected by
 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
 * see if it exists. If it does it's used, if not an error is returned
 * (callback)/ thrown (sync). The other two options for `srcpath` are a
 * relative url. By default Node's `fs.symlink` works by creating a symlink
 * using `dstpath` and expects the `srcpath` to be relative to the newly
 * created symlink. If you provide a `srcpath` that does not exist on the file
 * system it results in a broken symlink. To minimize this, the function
 * checks to see if the 'relative to symlink' source file exists, and if it
 * does it will use it. If it does not, it checks if there's a file that
 * exists that is relative to the current working directory, if does its used.
 * This preserves the expectations of the original fs.symlink spec and adds
 * the ability to pass in `relative to current working direcotry` paths.
 */

function symlinkPaths (srcpath, dstpath, callback) {
  if (path.isAbsolute(srcpath)) {
    return fs.lstat(srcpath, function (err, stat) {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureSymlink')
        return callback(err)
      }
      return callback(null, {
        'toCwd': srcpath,
        'toDst': srcpath
      })
    })
  } else {
    var dstdir = path.dirname(dstpath)
    var relativeToDst = path.join(dstdir, srcpath)
    return fs.exists(relativeToDst, function (exists) {
      if (exists) {
        return callback(null, {
          'toCwd': relativeToDst,
          'toDst': srcpath
        })
      } else {
        return fs.lstat(srcpath, function (err, stat) {
          if (err) {
            err.message = err.message.replace('lstat', 'ensureSymlink')
            return callback(err)
          }
          return callback(null, {
            'toCwd': srcpath,
            'toDst': path.relative(dstdir, srcpath)
          })
        })
      }
    })
  }
}

function symlinkPathsSync (srcpath, dstpath) {
  var exists
  if (path.isAbsolute(srcpath)) {
    exists = fs.existsSync(srcpath)
    if (!exists) throw new Error('absolute srcpath does not exist')
    return {
      'toCwd': srcpath,
      'toDst': srcpath
    }
  } else {
    var dstdir = path.dirname(dstpath)
    var relativeToDst = path.join(dstdir, srcpath)
    exists = fs.existsSync(relativeToDst)
    if (exists) {
      return {
        'toCwd': relativeToDst,
        'toDst': srcpath
      }
    } else {
      exists = fs.existsSync(srcpath)
      if (!exists) throw new Error('relative srcpath does not exist')
      return {
        'toCwd': srcpath,
        'toDst': path.relative(dstdir, srcpath)
      }
    }
  }
}

module.exports = {
  'symlinkPaths': symlinkPaths,
  'symlinkPathsSync': symlinkPathsSync
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713056, function(require, module, exports) {
var fs = require('graceful-fs')

function symlinkType (srcpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type
  if (type) return callback(null, type)
  fs.lstat(srcpath, function (err, stats) {
    if (err) return callback(null, 'file')
    type = (stats && stats.isDirectory()) ? 'dir' : 'file'
    callback(null, type)
  })
}

function symlinkTypeSync (srcpath, type) {
  if (type) return type
  try {
    var stats = fs.lstatSync(srcpath)
  } catch (e) {
    return 'file'
  }
  return (stats && stats.isDirectory()) ? 'dir' : 'file'
}

module.exports = {
  symlinkType: symlinkType,
  symlinkTypeSync: symlinkTypeSync
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713057, function(require, module, exports) {
var path = require('path')
var fs = require('graceful-fs')
var mkdir = require('../mkdirs')

function outputFile (file, data, encoding, callback) {
  if (typeof encoding === 'function') {
    callback = encoding
    encoding = 'utf8'
  }

  var dir = path.dirname(file)
  fs.exists(dir, function (itDoes) {
    if (itDoes) return fs.writeFile(file, data, encoding, callback)

    mkdir.mkdirs(dir, function (err) {
      if (err) return callback(err)

      fs.writeFile(file, data, encoding, callback)
    })
  })
}

function outputFileSync (file, data, encoding) {
  var dir = path.dirname(file)
  if (fs.existsSync(dir)) {
    return fs.writeFileSync.apply(fs, arguments)
  }
  mkdir.mkdirsSync(dir)
  fs.writeFileSync.apply(fs, arguments)
}

module.exports = {
  outputFile: outputFile,
  outputFileSync: outputFileSync
}

}, function(modId) { var map = {"../mkdirs":1581584713036}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584713058, function(require, module, exports) {
var klaw = require('klaw')

module.exports = {
  walk: klaw
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1581584713030);
})()
//# sourceMappingURL=index.js.map