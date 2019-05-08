import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  Button,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { auth } from '../store/reducers/userReducer';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
  }

  login() {
    const { auth } = this.props;
    const { email, password } = this.state;
    auth(email, password, 'login');
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <Text>myMelier</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            onBlur={Keyboard.dismiss}
            onChangeText={email => this.setState({ email })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            onBlur={Keyboard.dismiss}
            onChangeText={password => this.setState({ password })}
          />
        </View>
        <Button title="login" onPress={this.login} />
        <Button
          title="new here? sign up"
          onPress={() => this.props.navigation.navigate('Signup')}
        />
      </KeyboardAvoidingView>
    );
  }
}
// return {
//   handleSubmit(evt) {
//     evt.preventDefault();
//     const { userName, password } = this.state;
//     dispatch(auth(userName, password, 'login', null));
//   },
// };

const mapDispatch = dispatch => ({
  auth: (email, password, method) => dispatch(auth(email, password, method)),
});

export default connect(
  null,
  mapDispatch
)(Login);

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
});
