var assert = require('assert');

describe('HelloWorld Module', function() {
  it('should return -1 when "Hello" is missing', function() {
    assert.equal(-1, "Hallo World".indexOf("Hello"));
  });
  it('should return 0 when sentence starts with Hello', function() {
    assert.equal(0, "Hello World, how are you?".indexOf("Hello"));
  });
});

describe('Testing sleep calculator', function() {
	it('should return 9:00 - 8 hours = 1:00', function(){
		const sleepFunction = require("../sleepCalc.js");
		var result = sleepFunction.sleepTime(9,8);
		assert.equal("1:00",result);
	});
	it('should return 1:00 - 7 hours = 18:00', function(){
		const sleepFunction = require("../sleepCalc.js");
		var result = sleepFunction.sleepTime(1,7);
		assert.equal("18:00",result);
	});
});
