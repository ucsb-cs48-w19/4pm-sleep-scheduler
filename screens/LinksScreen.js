import React from 'react';
import { AsyncStorage, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Achievements',
  };
  constructor(props){
    super(props);
    //count is the number of succesful wake-ups
		this.state = {
      count: 0,
      sleepHours: 8,
		};
  }

componentDidMount() {
    this.interval = setInterval(
      () => {
      try{
        this._getCount();
        this._getHours();
      } catch(error){
      }
    }, 100);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }



  renderRow({item}) {
    return (
      <ListItem
        roundAvatar
        title={item.name}
        subtitle={item.subtitle}
        avatar={{uri:item.avatar_url}}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.getStartedText2}>{
          'You have succesfully gotten: \n'
        }
        </Text>
        {this._logoPicker()}
        <Text style={styles.getStartedText2}>{
          'of good sleep in a row' 
        }
        </Text>
      </View>
    );
  }

  _getHours = async() => {
    try {
      const s = await AsyncStorage.getItem('s');
      this.setState({sleepHours: parseInt(s)});
		} catch (error) {
    }
    return sleepHours;
  }
  _getCount = async() => {
    try{
      const _count = await AsyncStorage.getItem('count');
      this.setState({count: parseInt(_count)});
    } catch(error) {
    }
    return count;
  }
  _logoPicker = ()=>{
    if(this.state.count != 1){
      return(<Text style={styles.big}>
        {this.state.count + ' days \n'}
      </Text>);
    } else {
      return(<Text style={styles.big}>
        {this.state.count + ' day \n'}
      </Text>);
    }
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  big: {
    fontSize: 69,
    color: 'rgba(50,50,50, 1)',
    paddingTop: 50,
    textAlign: 'center',
  },
  getStartedText2: {
    fontSize: 25,
    color: 'rgba(50,50,50, 1)',
    paddingTop: 50,
    textAlign: 'center',
  },

});
