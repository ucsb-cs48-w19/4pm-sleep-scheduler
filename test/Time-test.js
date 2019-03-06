import 'react-native';
import React from 'react';
 import HomeScreen from '../app/screens/HomeScreen';

 import renderer from 'react-test-render';

 it('time test',()=>{
     let TimeData= renderer.create(<HomeScreen />).getInstance();

console.log(TimeData);

 })
