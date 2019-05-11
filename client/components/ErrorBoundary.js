import React, {Component} from 'react'
import {Text, StyleSheet, View, Image} from 'react-native'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error) {
    return {hasError: true}
  }

  componentDidCatch(error, info) {
    console.log(error, info)
  }

  render() {
    const broken = {
      uri: 'https://media.giphy.com/media/zFlVvkBN0DDz2/giphy.gif'
    }

    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.whoops}>Whoops!</Text>
          <View style={styles.gifView}>
            <Image source={broken} style={styles.gif} />
          </View>
        </View>
      )
    }

    return this.props.children
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  whoops: {
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
