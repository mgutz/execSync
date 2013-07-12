/*============================================================================
 * Copyright(c) 2010 Mario L Gutierrez <mario@mgutz.com>
 * MIT Licensed
 *==========================================================================*/

var shell = require('./build/Release/shell');
var temp = require('temp');
var fs = require('fs');
var tempName = temp.path({suffix: '.pdf'});
var isWindows = require('os').platform().indexOf('win') === 0;

function run(cmd) {
  try {
    var code = shell.exec(cmd);
    return code;
  } catch (err) {
    if (err) {
      console.error(err)
    }
    return 1;
  }
}


function exec(command) {
  var tempName = temp.path({suffix: '.exec'});
  var cmd;
  if (isWindows)
    cmd = 'cmd /C ' + command + ' > ' + tempName + ' 2>&1';
  else
    cmd = '(' + command + ') &> ' + tempName;

  console.error('cmd', cmd);

  var code = run(cmd);
  var text;

  if (fs.existsSync(tempName)) {
    try {
      text = fs.readFileSync(tempName, 'utf8');
      console.log('TEXT', text);
      fs.unlink(tempName);
    } catch (err) {
      throw new Error('ERROR: could not delete capture file');
    }

  } else {
    throw new Error('ERROR: output not captured');
  }

  return {
    code: code,
    stdout: text
  }
}

module.exports = {
    run: run,
    exec: exec
};
