import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  Button,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import { auth } from '../store/reducers/userReducer';
import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';
import buttonStyles from '../styles/buttonStyles';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
  }

  static navigationOptions = {
    header: null,
    headerBackTitle: 'Login',
  };

  async login() {
    const { auth } = this.props;
    const { email, password } = this.state;
    await auth(email, password, 'login');
    if (this.props.user.id) {
      return this.props.navigation.navigate('App');
    } else {
      Alert.alert(null, 'Incorrect username or password', [
        { text: 'OK', style: 'cancel' },
      ]);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={{ margin: 20, paddingTop: 60 }}>
          <Text style={textStyles.logo}>
            <Text style={textStyles.bold}>my</Text>Melier
          </Text>
          <View style={layoutStyles.bubble}>
            <TextInput
              style={textStyles.h5}
              placeholder="Email"
              onBlur={Keyboard.dismiss}
              onChangeText={email => this.setState({ email })}
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
              onBlur={Keyboard.dismiss}
              secureTextEntry
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={buttonStyles.container}>
            <TouchableOpacity style={buttonStyles.button} onPress={this.login}>
              <Text style={buttonStyles.text}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 70 }}>
            <Button
              title="New here? Sign up"
              onPress={() => this.props.navigation.navigate('Signup')}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapLogin = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  auth: (email, password, method) => dispatch(auth(email, password, method)),
});

export default connect(
  mapLogin,
  mapDispatch
)(Login);
