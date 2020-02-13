module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { __MODS__[modId].m.exports.__proto__ = m.exports.__proto__; Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; var desp = Object.getOwnPropertyDescriptor(m.exports, k); if(desp && desp.configurable) Object.defineProperty(m.exports, k, { set: function(val) { __MODS__[modId].m.exports[k] = val; }, get: function() { return __MODS__[modId].m.exports[k]; } }); }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1581584712949, function(require, module, exports) {
// On windows, create a .cmd file.
// Read the #! in the file to see what it uses.  The vast majority
// of the time, this will be either:
// "#!/usr/bin/env <prog> <args...>"
// or:
// "#!<prog> <args...>"
//
// Write a binroot/pkg.bin + ".cmd" file that has this line in it:
// @<prog> <args...> %dp0%<target> %*

module.exports = cmdShim
cmdShim.ifExists = cmdShimIfExists

var fs = require("graceful-fs")

var mkdir = require("mkdirp")
  , path = require("path")
  , toBatchSyntax = require("./lib/to-batch-syntax")
  , shebangExpr = /^#\!\s*(?:\/usr\/bin\/env)?\s*([^ \t]+=[^ \t]+\s+)*\s*([^ \t]+)(.*)$/

function cmdShimIfExists (from, to, cb) {
  fs.stat(from, function (er) {
    if (er) return cb()
    cmdShim(from, to, cb)
  })
}

// Try to unlink, but ignore errors.
// Any problems will surface later.
function rm (path, cb) {
  fs.unlink(path, function(er) {
    cb()
  })
}

function cmdShim (from, to, cb) {
  fs.stat(from, function (er, stat) {
    if (er)
      return cb(er)

    cmdShim_(from, to, cb)
  })
}

function cmdShim_ (from, to, cb) {
  var then = times(3, next, cb)
  rm(to, then)
  rm(to + ".cmd", then)
  rm(to + ".ps1", then)

  function next(er) {
    writeShim(from, to, cb)
  }
}

function writeShim (from, to, cb) {
  // make a cmd file and a sh script
  // First, check if the bin is a #! of some sort.
  // If not, then assume it's something that'll be compiled, or some other
  // sort of script, and just call it directly.
  mkdir(path.dirname(to), function (er) {
    if (er)
      return cb(er)
    fs.readFile(from, "utf8", function (er, data) {
      if (er) return writeShim_(from, to, null, null, null, cb)
      var firstLine = data.trim().split(/\r*\n/)[0]
        , shebang = firstLine.match(shebangExpr)
      if (!shebang) return writeShim_(from, to, null, null, null, cb)
      var vars = shebang[1] || ""
        , prog = shebang[2]
        , args = shebang[3] || ""
      return writeShim_(from, to, prog, args, vars, cb)
    })
  })
}


function writeShim_ (from, to, prog, args, variables, cb) {
  var shTarget = path.relative(path.dirname(to), from)
    , target = shTarget.split("/").join("\\")
    , longProg
    , shProg = prog && prog.split("\\").join("/")
    , shLongProg
    , pwshProg = shProg && "\"" + shProg + "$exe\""
    , pwshLongProg
  shTarget = shTarget.split("\\").join("/")
  args = args || ""
  variables = variables || ""
  if (!prog) {
    prog = "\"%dp0%\\" + target + "\""
    shProg = "\"$basedir/" + shTarget + "\""
    pwshProg = shProg
    args = ""
    target = ""
    shTarget = ""
  } else {
    longProg = "\"%dp0%\\" + prog + ".exe\""
    shLongProg = "\"$basedir/" + prog + "\""
    pwshLongProg = "\"$basedir/" + prog + "$exe\""
    target = "\"%dp0%\\" + target + "\""
    shTarget = "\"$basedir/" + shTarget + "\""
  }

  // SETLOCAL
  // CALL :find_dp0
  //
  // SET _maybeQuote="
  // IF EXIST "%dp0%\node.exe" (
  //   SET "_prog=%dp0%\node.exe"
  // ) ELSE (
  //   SET "_prog=node"
  //   SET _maybeQuote=
  //   SET PATHEXT=%PATHEXT:;.JS;=;%
  // )
  //
  // %_maybeQuote%%_prog%%_maybeQuote% "%dp0%\.\node_modules\npm\bin\npm-cli.js" %*
  // ENDLOCAL
  // EXIT /b %errorlevel%
  //
  // :find_dp0
  // SET dp0=%~dp0
  // EXIT /b
  //
  // Subroutine trick to fix https://github.com/npm/cmd-shim/issues/10
  var head = '@ECHO off\r\n' +
    'SETLOCAL\r\n' +
    'CALL :find_dp0\r\n'
  var foot = 'ENDLOCAL\r\n' +
    'EXIT /b %errorlevel%\r\n' +
    ':find_dp0\r\n' +
    'SET dp0=%~dp0\r\n' +
    'EXIT /b\r\n'

  var cmd
  if (longProg) {
    shLongProg = shLongProg.trim();
    args = args.trim();
    var variableDeclarationsAsBatch = toBatchSyntax.convertToSetCommands(variables)
    cmd = head
        + variableDeclarationsAsBatch
        + "\r\n"
	+ "SET _maybeQuote=\"\r\n"
        + "IF EXIST " + longProg + " (\r\n"
        + "  SET \"_prog=" + longProg.replace(/(^")|("$)/g, '') + "\"\r\n"
        + ") ELSE (\r\n"
	+ "  SET _maybeQuote=\r\n"
        + "  SET \"_prog=" + prog.replace(/(^")|("$)/g, '') + "\"\r\n"
        + "  SET PATHEXT=%PATHEXT:;.JS;=;%\r\n"
        + ")\r\n"
        + "\r\n"
        +  "%_maybeQuote%%_prog%%_maybeQuote% " + args + " " + target + " %*\r\n"
        + foot
  } else {
    cmd = head + prog + " " + args + " " + target + " %*\r\n" + foot
  }

  // #!/bin/sh
  // basedir=`dirname "$0"`
  //
  // case `uname` in
  //     *CYGWIN*|*MINGW*|*MSYS*) basedir=`cygpath -w "$basedir"`;;
  // esac
  //
  // if [ -x "$basedir/node.exe" ]; then
  //   "$basedir/node.exe" "$basedir/node_modules/npm/bin/npm-cli.js" "$@"
  //   ret=$?
  // else
  //   node "$basedir/node_modules/npm/bin/npm-cli.js" "$@"
  //   ret=$?
  // fi
  // exit $ret

  var sh = "#!/bin/sh\n"

  sh = sh
      + "basedir=$(dirname \"$(echo \"$0\" | sed -e 's,\\\\,/,g')\")\n"
      + "\n"
      + "case `uname` in\n"
      + "    *CYGWIN*|*MINGW*|*MSYS*) basedir=`cygpath -w \"$basedir\"`;;\n"
      + "esac\n"
      + "\n"

  if (shLongProg) {
    sh = sh
       + "if [ -x "+shLongProg+" ]; then\n"
       + "  " + variables + shLongProg + " " + args + " " + shTarget + " \"$@\"\n"
       + "  ret=$?\n"
       + "else \n"
       + "  " + variables + shProg + " " + args + " " + shTarget + " \"$@\"\n"
       + "  ret=$?\n"
       + "fi\n"
       + "exit $ret\n"
  } else {
    sh = sh
       + shProg + " " + args + " " + shTarget + " \"$@\"\n"
       + "exit $?\n"
  }

  // #!/usr/bin/env pwsh
  // $basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent
  //
  // $ret=0
  // $exe = ""
  // if ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {
  //   # Fix case when both the Windows and Linux builds of Node
  //   # are installed in the same directory
  //   $exe = ".exe"
  // }
  // if (Test-Path "$basedir/node") {
  //   & "$basedir/node$exe" "$basedir/node_modules/npm/bin/npm-cli.js" $args
  //   $ret=$LASTEXITCODE
  // } else {
  //   & "node$exe" "$basedir/node_modules/npm/bin/npm-cli.js" $args
  //   $ret=$LASTEXITCODE
  // }
  // exit $ret
  var pwsh = "#!/usr/bin/env pwsh\n"
           + "$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent\n"
           + "\n"
           + "$exe=\"\"\n"
           + "if ($PSVersionTable.PSVersion -lt \"6.0\" -or $IsWindows) {\n"
           + "  # Fix case when both the Windows and Linux builds of Node\n"
           + "  # are installed in the same directory\n"
           + "  $exe=\".exe\"\n"
           + "}\n"
  if (shLongProg) {
    pwsh = pwsh
         + "$ret=0\n"
         + "if (Test-Path " + pwshLongProg + ") {\n"
         + "  & " + pwshLongProg + " " + args + " " + shTarget + " $args\n"
         + "  $ret=$LASTEXITCODE\n"
         + "} else {\n"
         + "  & " + pwshProg + " " + args + " " + shTarget + " $args\n"
         + "  $ret=$LASTEXITCODE\n"
         + "}\n"
         + "exit $ret\n"
  } else {
    pwsh = pwsh
         + "& " + pwshProg + " " + args + " " + shTarget + " $args\n"
         + "exit $LASTEXITCODE\n"
  }

  var then = times(3, next, cb)
  fs.writeFile(to + ".ps1", pwsh, "utf8", then)
  fs.writeFile(to + ".cmd", cmd, "utf8", then)
  fs.writeFile(to, sh, "utf8", then)
  function next () {
    chmodShim(to, cb)
  }
}

function chmodShim (to, cb) {
  var then = times(3, cb, cb)
  fs.chmod(to, "0755", then)
  fs.chmod(to + ".cmd", "0755", then)
  fs.chmod(to + ".ps1", "0755", then)
}

function times(n, ok, cb) {
  var errState = null
  return function(er) {
    if (!errState) {
      if (er)
        cb(errState = er)
      else if (--n === 0)
        ok()
    }
  }
}

}, function(modId) {var map = {"./lib/to-batch-syntax":1581584712950}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1581584712950, function(require, module, exports) {
exports.replaceDollarWithPercentPair = replaceDollarWithPercentPair
exports.convertToSetCommand = convertToSetCommand
exports.convertToSetCommands = convertToSetCommands

function convertToSetCommand(key, value) {
    var line = ""
    key = key || ""
    key = key.trim()
    value = value || ""
    value = value.trim()
    if(key && value && value.length > 0) {
        line = "@SET " + key + "=" + replaceDollarWithPercentPair(value) + "\r\n"
    }
    return line
}

function extractVariableValuePairs(declarations) {
    var pairs = {}
    declarations.map(function(declaration) {
        var split = declaration.split("=")
        pairs[split[0]]=split[1]
    })
    return pairs
}

function convertToSetCommands(variableString) {
    var variableValuePairs = extractVariableValuePairs(variableString.split(" "))
    var variableDeclarationsAsBatch = ""
    Object.keys(variableValuePairs).forEach(function (key) {
        variableDeclarationsAsBatch += convertToSetCommand(key, variableValuePairs[key])
    })
    return variableDeclarationsAsBatch
}

function replaceDollarWithPercentPair(value) {
    var dollarExpressions = /\$\{?([^\$@#\?\- \t{}:]+)\}?/g
    var result = ""
    var startIndex = 0
    do {
        var match = dollarExpressions.exec(value)
        if(match) {
            var betweenMatches = value.substring(startIndex, match.index) || ""
            result +=  betweenMatches + "%" + match[1] + "%"
            startIndex = dollarExpressions.lastIndex
        }
    } while (dollarExpressions.lastIndex > 0)
    result += value.substr(startIndex)
    return result
}



}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1581584712949);
})()
//# sourceMappingURL=index.js.map