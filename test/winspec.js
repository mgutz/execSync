/* globals describe, it*/


'use strict';

var assert = require('chai').assert;
var fs = require('fs');
var sh = require('..');

describe('exec', function() {
  var exec = sh.exec;

  it ('should perform git operations', function() {
    //! if git bash is used this will fail since it will use bash version not
    //! Windows version
    exec('rmdir /S /Q tmp');
    exec('git clone git://github.com/mgutz/execSync tmp');
    exec('cd tmp');
    exec('git pull origin master')
    exec('cd ..');
    var result = sh.exec('type tmp\\README.md');
    assert.include(result.stdout, 'mgutz');
    assert.equal(result.code, 0);
  });
});
