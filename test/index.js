var assert = require('assert');
var sleep = require('./calcSleep.js');

describe('HelloWorld Module', function() {
  it('should return -1 when "Hello" is missing', function() {
    assert.equal(-1, "Hallo World".indexOf("Hello"));
  });
  it('should return 0 when sentence starts with Hello', function() {
    assert.equal(0, "Hello World, how are you?".indexOf("Hello"));
  });
});

describe('Sleep time test', function() {
	// And then we describe our testcases.
	it('should return 9:00 - 8 hours = 1:00', function(done) {
		assert.equal(sleep.sleepTime(9,8), "1:00");
		// Invoke done when the test is complete.
		done();
	});
});
