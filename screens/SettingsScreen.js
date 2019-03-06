import React from 'react';
import {
  Alert,
	AsyncStorage,
	DatePickerIOS,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Overlay } from 'react-native-elements'
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings Page',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return(
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress= {() => { 
          this.setState({
            isVisibleSetUp: true,
            hasReset: true,
          });
        }}>
            <Text style = {styles.button}> Change Sleep Settings</Text>
        </TouchableOpacity>

        <Overlay
            isVisible={this.state.isVisibleSetUp}
            windowBackgroundColor="rgba(0, 0, 0, .5)"
            overlayBackgroundColor= "white"
            width = "auto"
            height = "auto"
        >
          <View style={styles.welcomeContainer}>
            <Text style = {styles.getStartedText2}> Pick your sleep calculation mode</Text>
            <View style = {styles.welcomeContainer}>
              <TouchableOpacity onPress= {() => { 
                this.setState({
                  sleepMode: "cycles",
                  isVisibleSetUp: false,
                  isVisibleCycle: true,
                });
              }}>
                <Text style = {styles.button}> Sleep Cycle</Text>
              </TouchableOpacity>
            </View> 
            <View style = {styles.welcomeContainer}>
              <TouchableOpacity onPress={() => { 
                this.setState({
                  sleepMode: "hours",
                  isVisible: true,
                  isVisibleSetUp: false,
                });
              }}>
                <Text style = {styles.button}> Hours</Text>
              </TouchableOpacity>
            </View> 
          </View>
        </Overlay>

        <Overlay
          isVisible={this.state.isVisibleCycle}
          windowBackgroundColor="rgba(0, 0, 0, .5)"
          overlayBackgroundColor= "white"
          width = "auto"
          height = "auto"
        >
          <View style={styles.welcomeContainer}>
            <Text style = {styles.getStartedText2}>Pick your number of sleep Cycles</Text>
            <View style = {styles.welcomeContainer}>
            <TouchableOpacity onPress={() => {
                this.onPressSleep(7.5);
                this.setState({isVisibleCycle: false,})
              }}>
                <Text style = {styles.button}> 5 Cycles</Text>
              </TouchableOpacity>
            </View> 
            <View style = {styles.welcomeContainer}>
              <TouchableOpacity onPress={() => {
                this.onPressSleep(9);
                this.setState({isVisibleCycle: false,})
              }}>
                <Text style = {styles.button}> 6 Cycles</Text>
              </TouchableOpacity>
            </View> 
          </View>
        </Overlay>

        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(0, 0, 0, .5)"
          overlayBackgroundColor= "white"
          width = "auto"
          height = "auto"
        >
          <View style={styles.welcomeContainer}>
            <Text style = {styles.getStartedText2}>Pick a time to sleep</Text>
            <View style = {styles.welcomeContainer}>
              <TouchableOpacity onPress={() => this.onPressSleep(7)}>
                <Text style = {styles.button}> 7 Hours</Text>
              </TouchableOpacity>
            </View> 
            <View style = {styles.welcomeContainer}>
              <TouchableOpacity onPress={() => this.onPressSleep(8)}>
                <Text style = {styles.button}> 8 Hours</Text>
              </TouchableOpacity>
            </View> 
            <View style = {styles.welcomeContainer}>
              <TouchableOpacity onPress={() => this.onPressSleep(9)}>
                <Text style = {styles.button}> 9 Hours</Text>
              </TouchableOpacity>
            </View> 
          </View>
        </Overlay>



      </View>
      

    );
  }

  constructor(props){
    super(props);
    //count is the number of succesful wake-ups
		this.state = {
      isVisible: false,
      isVisibleCycle: false,
      isVisibleSetUp: false,
      sleepHours: 8,
      hasReset: false,
		};
  }

  componentDidMount() {
    this.interval = setInterval(
      () => {
      if(this.state.hasReset === true){
        this._storeData(this.state.sleepHours);
      }
    }, 100);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  _storeData = async (num) => {
		try {
      await AsyncStorage.setItem('s', num + '');
		} catch (error) {
		}
  };
  onPressSleep = (hours) =>{
    this.setState({
        sleepHours: hours,
        isVisible: false,
        isVisibleCycle: false,
        isVisibleSetUp: false,
    });
    this._storeData(this.state.sleepHours);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
	button: {
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 10,
		fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 75,
	},		
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  contentContainer2: {
    marginHorizontal: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  getStartedText2: {
    fontSize: 23,
    color: 'rgba(50,50,50, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },

  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

