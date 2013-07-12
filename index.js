/*============================================================================
 * Copyright(c) 2010 Mario L Gutierrez <mario@mgutz.com>
 * MIT Licensed
 *==========================================================================*/

var shell = require('./build/Release/shell');
var temp = require('temp');
var fs = require('fs');
var tempName = temp.path({suffix: '.pdf'});

function execSync (cmd) {
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


function exec(cmd) {
  var tempName = temp.path({suffix: '.exec'});
  var code = execSync('(' + cmd + ') &> ' + tempName);
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
    execSync: execSync,
    exec: exec
};

