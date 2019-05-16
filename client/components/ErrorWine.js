import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';

export default class ErrorWine extends Component {
  render() {
    const noWine = {
      uri: 'https://i.gifer.com/GPkz.gif',
    };

    return (
      <View style={{ margin: 20 }}>
        <Text style={textStyles.h1}>
          Oh no! We don't have that particular wine in our cellar. Please make
          another selection!
        </Text>
        <View style={styles.gifView}>
          <Image source={noWine} style={styles.gif} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gif: {
    width: 375,
    height: 275,
  },
  gifView: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 40,
  },
});
