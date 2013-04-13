/* globals describe, it*/


'use strict';

var assert = require('chai').assert;
var execSync = require('..');


describe('execSync', function() {

  it('should get stdout', function() {
    var stdout = execSync.stdout('node --help');
    assert.include(stdout, 'Usage: node');
  });

});