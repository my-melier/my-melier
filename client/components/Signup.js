import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
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
    this.signup = this.signup.bind(this);
  }

  signup() {
    const { email, password } = this.state;
    if (email && password) {
      this.props.auth(email, password, 'signup');
      return this.props.navigation.navigate('App');
    }
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.logo}>
              <Text style={styles.bold}>my</Text>Melier
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                returnKeyType="go"
                secureTextEntry
                ref={input => (this.passwordInput = input)}
              />
            </View>
          </View>
          <View style={styles.mainButtonView}>
            <TouchableOpacity style={styles.button} onPress={this.signup}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    backgroundColor: '#D3DCDF',
    borderRadius: 20,
    margin: 60,
    color: '#FFF',
    padding: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  logo: {
    fontSize: 50,
    padding: 15,
    paddingBottom: 50,
  },
  mainButtonView: {
    alignItems: 'center',
  },
  mainButton: {
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 5,
    height: 40,
    width: 150,
    margin: 5,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 5,
    height: 40,
    width: 100,
    margin: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    padding: 5,
  },
  textInput: {
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 40,
    fontSize: 16,
  },
});

const mapSignup = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  auth: (email, password, method) => dispatch(auth(email, password, method)),
});

export default connect(
  mapSignup,
  mapDispatch
)(Signup);
