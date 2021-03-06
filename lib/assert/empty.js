'use strict';
let Assertion = require('../assert');
let AssertionFailedError = require('./error');
let template = require('../utils').template;
let output = require('../output');

class EmptinessAssertion extends Assertion {
  
  constructor(params) {
    super(function(value) {
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      return !value;
    }, params);
    this.params.type = 'to be empty';
  }
   
  getException() {
    if (Array.isArray(this.params.value)) {
      this.params.value = '[' + this.params.value.join(', ')+']';
    }
    let err = new AssertionFailedError(this.params, "{{customMessage}}expected {{subject}} '{{value}}' {{type}}");
    err.actual = this.params.value;
    err.expected = [];
    
    err.cliMessage = () => {
      let msg = err.message
        .replace('{{value}}', output.colors.yellow.bold('{{value}}'))      
        .replace('{{subject}}', output.colors.bold('{{subject}}'));
      return template(msg, this.params);        
    }
    return err;
  }
   
   
  addAssertParams() {
    this.params.value = arguments[0];
    this.params.customMessage = arguments[1] ? arguments[1]+"\n\n" : '';
  } 
}

module.exports = {
  Assertion: EmptinessAssertion,
  empty: (subject) => {
    return new EmptinessAssertion({subject});
  } 
}