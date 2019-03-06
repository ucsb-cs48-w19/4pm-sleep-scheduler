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
import {List, ListItem, Overlay} from 'react-native-elements';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import moment from "moment";
import { FULLSCREEN_UPDATE_PLAYER_DID_DISMISS } from 'expo/build/av/Video';
import { FutureAlert } from '../components/FutureAlert';


export default class HomeScreen extends React.Component {
	constructor(props){
    super(props);
    //count is the number of succesful wake-ups
		this.state = {
            chosenDate: new Date(),
            wakeTimeObj: null,
            wakeTime: "",
            currentTime: new Date(),
            count: 0,
            hasPicked: true,
            isPicking: false,
            sleepHours: "8",
            sleepMode: "hours",
            isVisible: false,
            isVisibleCycle: false,
            isVisibleSetUp: true,
		};
    this.setDate = this.setDate.bind(this);
    this.setSleep = this.setSleep.bind(this);
  }
  componentDidMount() {
    this.interval = setInterval(
      () => {
      this.setState({ 
        currentTime: Date.now(),
      });
      this.checkBedTime(this.state.wakeTime);
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }


  render() {
		const ti = this.state.chosenDate;
		const pickedTime = moment(ti).format("LT");
    const sleepTime = moment(ti).subtract(this.state.sleepHours, "hours").format("LT");
    

    return(
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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




          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.welcomeImage}
            />
          </View>	
					



					
          <View style={styles.contentContainer}>
              <Text style={styles.getStartedText2}>What time do you want to wake up? </Text>
          </View>


					<View style={styles.contentContainer2}>
						<DatePickerIOS
							date={this.state.chosenDate}
							onDateChange={this.setDate}
							mode='time'
						/>
					</View>

          <TouchableOpacity onPress={this.onPressView}>
						<Text style = {styles.button}> Set Alert</Text>
					</TouchableOpacity>

          <View style={styles.getStartedContainer}>
            {this.displayAlarmStatus()}
            <Text style={styles.getStartedText}> { 'Time you want to wake up: ' + pickedTime
						+ '\n' + 'Time to sleep: ' + sleepTime}</Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>This is the repository link	</Text>
            </TouchableOpacity>
          </View>


        <View style = {styles.getStartedText}>
						<Text>{
              'count: ' + this.state.count + 
              '\nisPicking:' + this.state.isPicking + 
              '\nhasPicked: ' + this.state.hasPicked + 
              '\nsleepHours: ' + this.state.sleepHours + 
              '\nsleepMode: ' + this.state.sleepMode + 
              '\nisVisible: ' + this.state.isVisible + 
              '\nisVisibleSetUp: ' + this.state.isVisibleSetUp
              
              }
            </Text>
					</View>	  
        </ScrollView>
      </View>
    );
  }


	setDate(newDate) {
		this.setState({chosenDate: newDate});
  }
  
  setSleep(newTime){
    this.setState({
      wakeTime: moment(newTime).subtract(this.state.sleepHours, "hours").format("LT"),
      wakeTimeObj: new Date(newTime),
      hasPicked: false,
    });
  }

  onPressSleep = (hours) =>{
      this.setState({
          isVisible: false,
          sleepHours: hours,
      })
  }

	onPressView = () => {
    //const ti = Object.assign({}, this.state.chosenDate);
		this.setState({
      isPicking: true,
      hasPicked: false,
    });
    this.setSleep(this.state.chosenDate);
    Alert.alert(
      'Your alarm has been set!',
      '',
      [
        {text: 'OK', onPress: () => {
            this.setState({
              isPicking: false,
            });
          }
        },
      ]
    )
  }
  
  alertBedTime = () => {
    Alert.alert(
      "It's bed time!" ,
      'Do you want to sleep now?',
      [
        {
          text: 'Ask me later', 
          onPress: () => {
            console.log('Ask me later pressed');
            this.setState({
              isPicking: false,
            });
            this.setSleep(moment(this.state.wakeTimeObj).add(5, "m"));
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            this.setState({
              isPicking: false,
            });
          },
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          this.setState({
            isPicking: false,
            count: this.state.count + 1, 
          });
          console.log('OK Pressed')},
        },
      ],
      {cancelable: false},
    );
  }

  checkBedTime = (LTime) => {
    if(LTime === moment(this.state.currentTime).format("LT")) {
      if(!this.state.isPicking && !this.state.hasPicked){
        this.setState({
          isPicking: true,
          hasPicked: true,
        });
        this.alertBedTime();
      }
    }
  }

  displayAlarmStatus = () => {
    if(!this.state.hasPicked)
      return(
        <Text style={styles.getStartedText}>
          Your alarm has been set for {this.state.wakeTime}.
        </Text>
      );
    else
      return(
        <Text style={styles.getStartedText}>
          Alarm has not been set.
        </Text>
      );
  }

	_storeData = async () => {
		try {
			await AsyncStorage.setItem( 'sleep_time', '' + this.state.chosenDate);
		} catch (error) {
			// Error saving data
		}
	};

  static navigationOptions = {
    header: null,
  };
  
  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://github.com/ucsb-cs48-w19/4pm-sleep-scheduler'
    );
  };
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
