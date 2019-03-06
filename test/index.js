import React from 'react';

var assert = require('assert');
describe('HelloWorld Module', function() {
  it('should return -1 when "Hello" is missing', function() {
    assert.equal(-1, "Hallo World".indexOf("Hello"));
  });
  it('should return 0 when sentence starts with Hello', function() {
    assert.equal(0, "Hello World, how are you?".indexOf("Hello"));
  });
});

describe('HomeScreen test', function() {
	it('should test time', function(){
		const sortingFunctions = require("../app/screens/HomeScreen.js");
		var sleep = '11:00 PM';
		
		assert.equal({isPicking: true, hasPicked: true},checkBedTime(sleep).setState());
	});
});
