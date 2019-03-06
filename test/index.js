var assert = require('assert');
describe('HelloWorld Module', function() {
  it('should return -1 when "Hello" is missing', function() {
    assert.equal(-1, "Hallo World".indexOf("Hello"));
  });
  it('should return 0 when sentence starts with Hello', function() {
    assert.equal(0, "Hello World, how are you?".indexOf("Hello"));
  });
});

describe('Testing setting hours', function() {
	it('Should set the sleeping hours to 7', function() {
		const functions = require("../screens/Homescreen.js");
		functions.onPressSleep(7);
		var sleep = functions.sleepHours;
		assert.equal(7,sleep);
	});
});
