import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from 'react-native';
import { auth } from '../store/reducers/userReducer';
import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';
import buttonStyles from '../styles/buttonStyles';

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

  async signup() {
    const { email, password } = this.state;
    await this.props.checkEmail(email);
    if (!this.props.user) {
      if (email && password) {
        this.props.auth(email, password, 'signup');
        return this.props.navigation.navigate('App');
      } else {
        Alert.alert(null, 'Check username or password', [
          { text: 'OK', style: 'cancel' },
        ]);
      }
    } else {
      Alert.alert(null, 'An acccount with this username already exists', [
        { text: 'OK', style: 'cancel' },
      ]);
    }
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={{ margin: 20 }}>
          <Text style={textStyles.logo}>
            <Text style={textStyles.bold}>my</Text>Melier
          </Text>
          <View style={layoutStyles.bubble}>
            <TextInput
              style={textStyles.h5}
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={layoutStyles.bubble}>
            <TextInput
              style={textStyles.h5}
              placeholder="Password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              returnKeyType="go"
              secureTextEntry
              ref={input => (this.passwordInput = input)}
            />
          </View>
          <View style={buttonStyles.container}>
            <TouchableOpacity style={buttonStyles.button} onPress={this.signup}>
              <Text style={buttonStyles.text}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

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
