import React, {Component} from 'react'
import {
  Text,
  StyleSheet,
  Button,
  View,
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native'

export default class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      userName: '',
      email: '',
      password: ''
    }
    this.someFunction = this.someFunction.bind(this)
    this.matchingFunction = this.matchingFunction.bind(this)
    this.handlePress = this.handlePress.bind(this)
  }

  someFunction(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  matchingFunction(event) {
    if (this.state === event.target.value) {
      return true
    }
  }

  handlePress() {
    event.preventDefault()
    //do we need this in native?
    this.props.addUser({
      name: this.state.name,
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> myMelier </Text>
        <Text>Sign Up</Text>
        <View style={styles.inputContainer}>
          <FormLabel>Name</FormLabel>
          <FormInput onChangeText={someFunction} />
          <FormValidationMessage>Name is required</FormValidationMessage>
        </View>
        <View style={styles.inputContainer}>
          <FormLabel>User Name</FormLabel>
          <FormInput onChangeText={someFunction} />
          <FormValidationMessage>Username is required</FormValidationMessage>
        </View>
        <View style={styles.inputContainer}>
          <FormLabel>Email</FormLabel>
          <FormInput onChangeText={someFunction} />
          <FormValidationMessage>Email is required</FormValidationMessage>
        </View>
        <View style={styles.inputContainer}>
          <FormLabel>Password</FormLabel>
          <FormInput onChangeText={someFunction} />
          <FormValidationMessage>Password is required</FormValidationMessage>
        </View>
        <View style={styles.inputContainer}>
          <FormLabel>Password</FormLabel>
          <FormInput onChangeText={matchingFunction} />
          <FormValidationMessage>Passwords do not match</FormValidationMessage>
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
