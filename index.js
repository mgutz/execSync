/*============================================================================
 * Copyright(c) 2010 Mario L Gutierrez <mario@mgutz.com>
 * MIT Licensed
 *==========================================================================*/

var ffi = require('ffi');

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
  return libc.system(cmd);
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


module.exports = {
    code: code,
    stdout: stdout
};

