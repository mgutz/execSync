/*============================================================================
 * Copyright(c) 2010 Mario L Gutierrez <mario@mgutz.com>
 * MIT Licensed
 *==========================================================================*/

var ffi = require('ffi');
var fs = require('fs');

var libc = ffi.Library(null, {
  // FILE* popen(char* cmd, char* mode);
  popen: ['pointer', ['string', 'string']],

  // void pclose(FILE* fp);
  pclose: ['void', [ 'pointer']],

  // char* fgets(char* buff, int buff, in)
  fgets: ['string', ['pointer', 'int','pointer']],

  system: ['int32', ['string']]
});


/**
 * Executes shell `cmd` returning result code.
 *
 * @example
 *  var result = execSync.code('rm -rf tempdir');
 */
function code(cmd) {
  return libc.system(cmd) >> 8;
}


/**
 * Executes shell `cmd` returning STDOUT.
 *
 * @example
 *  var user = execSync.stdout('echo $USER');
 *
 * @returns Returns STDOUT. If `cmd` cannot be exected
 * an `Error` is thrown.
 */
function stdout(cmd) {
  var
    buffer = new Buffer(1024),
    result = '',
    fp = libc.popen(cmd, 'r');

  if (!fp) throw new Error('execSync error: '+cmd);

  while(libc.fgets(buffer, 1024, fp)) {
    result += buffer.readCString();
  }
  libc.pclose(fp);

  return result;
}

var uniqIdK = 0;

uniqId = function() {
  var prefix;
  prefix = 'tmp';
  return prefix + (new Date()).getTime() + '' + (uniqIdK++) + ('' + Math.random()).split('.').join('');
};

tmpDir = function() {
  var dir, name, _i, _len, _ref;
  _ref = ['TMPDIR', 'TMP', 'TEMP'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    name = _ref[_i];
    if (process.env[name] != null) {
      dir = process.env[name];
      if (dir.charAt(dir.length - 1) === '/') {
        return dir.substr(0, dir.length - 1);
      }
      return dir;
    }
  }
  return '/tmp';
};

getOutput = function(path) {
  var output;
  output = fs.readFileSync(path);
  fs.unlinkSync(path);
  output = "" + output;
  if (output.charAt(output.length - 1) === "\n") {
    output = output.substr(0, output.length - 1);
  }
  return output;
};

function exec(cmd) {
  var code, dir, error, id, result, stderr, stdout;

  id = uniqId();
  stdout = id + '.stdout';
  stderr = id + '.stderr';
  dir = tmpDir();
  cmd = "" + cmd + " > " + dir + "/" + stdout + " 2> " + dir + "/" + stderr;
  code = libc.system(cmd);
  result = getOutput("" + dir + "/" + stdout);
  error = getOutput("" + dir + "/" + stderr);

  return {
    code: code,
    stdout: result,
    stderr: error
  }
}

module.exports = {
    code: code,
    stdout: stdout,
    exec: exec
};

