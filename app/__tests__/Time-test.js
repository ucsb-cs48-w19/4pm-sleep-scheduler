import 'react-native';
import React from 'react';
 import HomeScreen from '../app/screens/HomeScreen';

 import renderer from 'react-test-render';

 it('time test',()=>{
     let TimeData= renderer.create(<HomeScreen />).getInstance();
     expect(TimeData.state().hasPicked).toEqual(true);
     TimeData.simulate('click');
     expect(TimeData.state().hasPicked).toEqual(false);

 })
