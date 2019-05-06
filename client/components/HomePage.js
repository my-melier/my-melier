import React, {Component} from 'react'
import {Text, StyleSheet, View} from 'react-native'
import {TabNavigator} from './TabNavigator'

export default class HomePage extends Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text> myMelier </Text>
          <Text>
            Instructions: Choose a color. Uncork. Pour out a glass. Enjoy!
          </Text>
        </View>
        <View styles={styles.navBar}>
          <TabNavigator />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navBar: {
    flex: 1
  }
})
