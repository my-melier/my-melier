import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
import fetch from 'node-fetch';

export default class App extends React.Component {
  constructor() {
    super();
    this.handlePress = this.handlePress.bind(this);
  }
  async handlePress() {
    const { data } = await axios.get('http://172.16.25.122:8080/api/wine');
    console.log(data);
    // console.log(data);
  }

  // async handlePress() {
  //   const res = await fetch('http://172.16.25.122:8080/api/wine');
  //   console.log('RES', await res.json());
  //   // .then(res => res.json())
  //   // .then(data => console.log(data))
  //   // .catch(err => console.log(err));
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button title="Click me!" onPress={this.handlePress} />
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
