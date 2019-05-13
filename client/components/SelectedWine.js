import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

export default class SelectedWine extends Component {
  render() {
    const thumbsUp = {
      uri:
        'https://cdn0.iconfinder.com/data/icons/elite-emoticons/512/thumbs-up-512.png',
    };
    const thumbsDown = {
      uri: 'https://sitejerk.com/images/transparent-thumbs-down-2.png',
    };
    const gif = {
      uri: 'https://media.giphy.com/media/3XHMTIqcUev2Vy9ILk/giphy.gif',
    };
    const wine = this.props.navigation.getParam('wine', 'Not Found');

    return (
      <View style={styles.container}>
        <Text style={styles.cheers}>Cheers!</Text>
        <View style={styles.gifView}>
          <Image source={gif} style={styles.gif} />
        </View>
        <Text style={styles.text}>Don't forget to rate your selection:</Text>
        <Text style={styles.wineTitle}>{wine.title}</Text>
        <View style={styles.thumbsContainer}>
          <View style={styles.imageView}>
            <Image source={thumbsUp} style={styles.image} />
          </View>
          <View style={styles.imageView}>
            <Image source={thumbsDown} style={styles.image} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cheers: {
    textAlign: 'center',
    fontSize: 60,
    padding: 20,
  },
  gif: {
    width: 175,
    height: 175,
  },
  gifView: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
  wineTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  thumbsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  imageView: {
    padding: 25,
  },
});
