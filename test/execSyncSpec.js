/* globals describe, it*/


'use strict';

var assert = require('chai').assert;
var execSync = require('..');


describe('execSync', function() {

  it('should get stdout', function() {
    var stdout = execSync.stdout('node --help');
    assert.include(stdout, 'Usage: node');
  });

  it('should get code', function() {
    var code = execSync.code('exit 42');
    assert.equal(code, 42);
    var code = execSync.code('exit');
    assert.equal(code, 0);
  });

  // it('should get code, stdout and stderr', function() {
  //   var result = execSync.exec('echo foo; echo oops 1>&2; exit 42')
  //   assert.equal(result.stdout, 'foo');
  //   assert.equal(result.stderr, 'oops');
  //   assert.equal(result.code, 42);
  // });

});