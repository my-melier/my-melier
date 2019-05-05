import React, { Component } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import axios from 'axios';

const ocrToUrlTitle = string => {
  const characters = '.,!/1234567890()$!@#%^&*+';
  return string
    .split('')
    .filter(char => !characters.includes(char))
    .join('')
    .replace(/-/g, ' ')
    .replace(/ /g, '_');
};

export default class Home extends Component {
  constructor() {
    super();
    this.handlePress = this.handlePress.bind(this);
  }
  async handlePress(title) {
    const { data } = await axios.get(
      `http://192.168.145.78:8080/api/wine/${title}`
    );
    console.log(data);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button
          title="Click me!"
          onPress={() =>
            this.handlePress(
              ocrToUrlTitle('Aconcagua 2005 Reserve Malbec (Mendoza)')
            )
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
