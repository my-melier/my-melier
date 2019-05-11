import React, {Component} from 'react'
import {Text, StyleSheet, View, Image, ScrollView, Button} from 'react-native'

export default class ErrorWine extends Component {
  render() {
    const noWine = {
      uri: 'https://i.gifer.com/GPkz.gif'
    }

    return (
      <View style={styles.container}>
        <Text style={styles.cheers}>
          Oh no! We don't have that particular wine in our cellar. Please try another wine!
        </Text>
        <View style={styles.gifView}>
          <Image source={noWine} style={styles.gif} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  cheers: {
    textAlign: 'center',
    fontSize: 45,
    padding: 20
  },
  gif: {
    width: 275,
    height: 175
  },
  gifView: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20
  },
  text: {
    textAlign: 'center',
    fontSize: 30
  }
})
