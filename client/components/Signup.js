import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Button,
  View,
} from 'react-native';
import { auth } from '../store/reducers/userReducer';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      error: '',
    };
  }
  signup() {
    const { auth } = this.props;
    const { email, password } = this.state;
    auth(email, password, 'signup');
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              returnKeyType="go"
              secureTextEntry
              ref={input => (this.passwordInput = input)}
            />
          </View>
          <View style={styles.button}>
            <Button title="sign up" onPress={this.signup} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    height: 40,
  },
});

const mapDispatch = dispatch => ({
  auth: (email, password, method) => dispatch(auth(email, password, method)),
});

export default connect(
  null,
  mapDispatch
)(Signup);
