import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, View } from 'react-native';

export default class ButtonBasics extends Component {
  _onPressShop() {
    Alert.alert('This will lead to the shop!')
  }
  _onPressStats() {
    Alert.alert('This will lead to the stats page!')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text> Hello World!</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressShop}
            title="Shop"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressStats}
            title="Statistics"
            color="#841584"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  }
});

