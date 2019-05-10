import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { logout } from '../store/reducers/userReducer';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    logout();
    return this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.text}>
          <Text style={styles.logo}>
            <Text style={styles.bold}>my</Text>Melier
          </Text>
        </View>
        <TouchableOpacity onPress={this.logout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  logo: {
    fontSize: 50,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 5,
    height: 40,
    margin: 10,
    marginLeft: 75,
    marginRight: 75,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    padding: 5,
  },
});
