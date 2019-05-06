import React, {Component} from 'react'
import {
  Text,
  Button,
  View,
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native'

export default class Login extends Component {
  //are we doing this ourselves or using an OAuth?

  render() {
    return (
      <View style={styles.container}>
        <Text> myMelier </Text>
        <Text>Login</Text>
        <View style={styles.inputContainer}>
          <FormLabel>UserName</FormLabel>
          <FormInput onChangeText={someFunction} />
          <FormValidationMessage />
        </View>
        <View style={styles.inputContainer}>
          <FormLabel>Password</FormLabel>
          <FormInput onChangeText={someFunction} />
          <FormValidationMessage>
            Your username or password is incorrect
          </FormValidationMessage>
        </View>
        <View>
          <Button
            title="Submit"
            onPress={() => this.props.navigation.navigate('HomePage')}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    flex: 1
  }
})
