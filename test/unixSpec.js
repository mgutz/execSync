/* globals describe, it*/


'use strict';

var assert = require('chai').assert;
var fs = require('fs');
var sh = require('..');

describe('execSync', function() {
  var exec = sh.exec;

  it ('should perform git operations', function() {
    exec('rm -rf tmp');
    exec('mkdir -p tmp');
    exec('git clone git://github.com/mgutz/execSync tmp/execSync');
    exec('cd tmp');
    exec('git pull origin master')
    exec('cd ..');
    var result = exec('cat tmp/execSync/README.md');
    assert.include(result.stdout, 'mgutz');
    assert.equal(result.code, 0);
  });

  it ('should execute and get everything', function() {
    var result = sh.exec('echo my_bad 1>&2; echo foo; echo your_bad 1>&2; exit 42');
    assert.equal(result.stdout, 'my_bad\nfoo\nyour_bad\n');
    assert.equal(result.code, 42);
  });
});
