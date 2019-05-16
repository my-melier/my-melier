import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';

export default class LoadingPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { pronoun } = this.props;
    const loading = {
      uri: 'https://media.giphy.com/media/l1J9Aw6ARFZIpjlyU/giphy.gif',
    };

    return (
      <View style={layoutStyles.container}>
        <Text style={textStyles.h1}>Searching {pronoun} cellar...</Text>
        <View style={styles.gifView}>
          <Image source={loading} style={styles.gif} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gif: {
    width: 500,
    height: 500,
  },
  gifView: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
});
