import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Button } from 'react-native';

export default class SelectedWine extends Component {
  render() {
    return (
      <View>
        <Text>Cheers!</Text>
        <Text>Don't forget to rate your selection:</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
  },
});
