import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super();
    this.handlePress = this.handlePress.bind(this);
  }
  async handlePress(title) {
    const { data } = await axios.get(
      `http://172.16.25.122:8080/api/wine/${title}`
    );
    console.log(data);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button
          title="Click me!"
          onPress={() => this.handlePress('J_Vineyards_Sparkling_Blend')}
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
