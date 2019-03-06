import React from 'react';
import { shallow } from "enzyme";
import HomeScreen from '../app/screens/HomeScreen';

var assert = require('assert');
describe('HelloWorld Module', function() {
  it('should return -1 when "Hello" is missing', function() {
    assert.equal(-1, "Hallo World".indexOf("Hello"));
  });
  it('should return 0 when sentence starts with Hello', function() {
    assert.equal(0, "Hello World, how are you?".indexOf("Hello"));
  });
});

describe("<HomeScreen/>", () => {
	it('Should set the sleeping hours to 8', ()=> {
    var wake = '01 Jan 2018 07:00:00 GMT';
    const time = shallow(<HomeScreen ti= wake/>);
    var sleep = '11:00 PM';
    
		assert.equal(sleep,time.sleepTime);
	});
});
