import React, {Component} from 'react'
import {Text, StyleSheet, View, Button} from 'react-native'
import {logout} from '../store/reducers/userReducer'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    logout()
    return this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text>Click the Camera to Scan an Item on a Wine Menu!</Text>
        </View>
        <View style={styles.button}>
          <Button title="Logout" onPress={this.logout} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 40,
    backgroundColor: '#ff6347'
  }
})
