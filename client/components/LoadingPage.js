import React, {Component} from 'react'
import {Text, StyleSheet, View, Image, ScrollView, Button} from 'react-native'

export default class LoadingPage extends Component {
  render() {
    const loading = {
      uri: 'https://media.giphy.com/media/l1J9Aw6ARFZIpjlyU/giphy.gif'
    }

    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Searching our cellar...</Text>
        <View style={styles.gifView}>
          <Image source={loading} style={styles.gif} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  loading: {
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
