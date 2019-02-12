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
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import moment from "moment";


export default class HomeScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
            chosenDate: new Date(),
            currentTime: new Date(),
						isPicking: false,
		};
		this.setDate = this.setDate.bind(this);
	}

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ currentTime: Date.now() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

	setDate(newDate) {
		this.setState({chosenDate: newDate});
	}
	onPressView = () => {
		this.setState({
			isPicking: true,
    });
    this.alertBedTime();
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
          });
          console.log('OK Pressed')},
        },
      ],
      {cancelable: false},
    );
  }

  checkBedTime = (LTime) => {
    if(LTime === moment(this.state.currentTime).format("LT") )
      return true;
    return false;
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

  render() {
		const ti = this.state.chosenDate;
		const pickedTime = moment(ti).format("LT");
    const sleepTime = moment(ti).subtract("8", "hours").format("LT");
    if(this.checkBedTime(sleepTime) && !this.state.isPicking){
      this.setState({
        isPicking: true,
      });
      this.alertBedTime();
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/logo.png')
                  : require('../assets/images/logo.png')
              }
              style={styles.welcomeImage}
            />
          </View>	
					<TouchableOpacity onPress={this.onPressView}>
						<Text style = {styles.button}> Pick Time </Text>
					</TouchableOpacity>
					<View style = {styles.getStartedText}>
						<Text>{'' + this.state.isPicking}</Text>
					</View>	
					<View style={styles.container}>
						<DatePickerIOS
							date={this.state.chosenDate}
							onDateChange={this.setDate}
							mode='time'
						/>
					</View>
          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}
            <Text style={styles.getStartedText}> { 'Time you want to wake up: ' + pickedTime
						+ '\n' + 'Time to sleep: ' + sleepTime}</Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>This is the repository link	</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
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
