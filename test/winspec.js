/* globals describe, it*/


'use strict';

var assert = require('chai').assert;
var fs = require('fs');
var sh = require('..');

describe('execSync', function() {
  var execSync = sh.execSync;

  it ('should perform git operations', function() {
    //! if git bash is used this will fail since it will use bash version not
    //! Windows version
    execSync('rmdir /S /Q tmp');
    execSync('git clone git://github.com/mgutz/execSync tmp');
    execSync('cd tmp');
    execSync('git pull origin master')
    execSync('cd ..');
    var result = sh.exec('type tmp\\README.md');
    assert.include(result.stdout, 'mgutz');
    assert.equal(result.code, 0);
  });
});
