'use strict';

let Assertion = require('../../../lib/assert/equal').Assertion;
let AssertionError = require('../../../lib/assert/error');
let chai = require('chai');
let should = require('chai').should();
let equal;

describe('equal assertion', () => {
  
  beforeEach(() => {
    equal = new Assertion({jar: 'contents of webpage'});
  });
  
  it('should check for equality', () => {   
    equal.assert('hello','hello');
    chai.expect(() => equal.negate('hello','hello')).to.throw(AssertionError);
  });
  
  it('should check for something not to be equal', () => {   
    equal.negate('hello', 'hi');
    chai.expect(() => equal.assert('hello', 'hi')).to.throw(AssertionError);
  });  
  
  it('should provide nice assert error message', () => {
    equal.params.expected = 'hello';
    equal.params.actual = 'hi';
    let err = equal.getFailedAssertion();
    err.inspect().should.equal("expected contents of webpage to equal")
  });

  it('should provide nice negate error message', () => {
    equal.params.expected = 'hello';
    equal.params.actual = 'hello';
    let err = equal.getFailedNegation();
    err.inspect().should.equal("expected contents of webpage not to equal")  });

  
});