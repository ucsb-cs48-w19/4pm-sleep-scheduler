import React from "react-native";
import { shallow } from "enzyme";
import HomeScreen from '../app/screens/HomeScreen';

describe("<HomeScreen/>", () => {
  it("Should set the sleeping hours to 8", ()=> {
     var wake = '01 Jan 2018 07:00:00 GMT';
     const time = shallow(<HomeScreen ti= wake/>);
     var sleep = '11:00 PM';
    
     assert.equal(sleep,time.sleepTime);
  });
});
