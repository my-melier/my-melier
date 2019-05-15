import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
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
  input: {
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 40,
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
  },
  mainButtonView: {
    alignItems: 'center',
    paddingBottom: 20,
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
    textAlign: 'right',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  logo: {
    fontSize: 50,
    padding: 15,
    paddingBottom: 50,
  },
});
