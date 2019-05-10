import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Text,
  StyleSheet,
  Button,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native'
import {auth} from '../store/reducers/userReducer'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.login = this.login.bind(this)
  }

  async login() {
    const {auth} = this.props
    const {email, password} = this.state
    await auth(email, password, 'login')
    if (this.props.user) {
      return this.props.navigation.navigate('App')
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <Text>myMelier</Text>
          <Text>Login here:</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            onBlur={Keyboard.dismiss}
            onChangeText={email => this.setState({email})}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            onBlur={Keyboard.dismiss}
            secureTextEntry
            onChangeText={password => this.setState({password})}
          />
          <View style={styles.inputContainer}>
            <Button title="Login" onPress={this.login} />
          </View>
        </View>
        <Button
          title="New here? Sign up"
          onPress={() => this.props.navigation.navigate('Signup')}
        />
      </KeyboardAvoidingView>
    )
  }
}

const mapLogin = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  auth: (email, password, method) => dispatch(auth(email, password, method))
})

export default connect(
  mapLogin,
  mapDispatch
)(Login)

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginBottom: 30,
    paddingHorizontal: 10,
    fontSize: 18
  },
  inputContainer: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10,
    fontSize: 16
  }
})
