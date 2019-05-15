import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { logout } from '../store/reducers/userReducer';
import { clearedComparisons } from '../store/reducers/comparisonReducer';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  logout() {
    const { clearedComparisons, navigation } = this.props;
    logout();
    clearedComparisons();
    return navigation.navigate('Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.text}>
          <Text style={styles.logo}>
            <Text style={styles.bold}>my</Text>Melier
          </Text>
        </View>
        <View>
          <Text style={styles.instructions}>Instructions:</Text>
          <Text style={styles.copy}>Open the camera to scan a menu</Text>
          <Text style={styles.copy}>
            Click on myWines to see previously saved wines
          </Text>
          <Text style={styles.copy}>
            Only drink wine you like - life is too short!
          </Text>
        </View>
        <TouchableOpacity onPress={this.logout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatch = dispatch => ({
  clearedComparisons: () => dispatch(clearedComparisons()),
});

export default connect(
  null,
  mapDispatch
)(Home);

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  logo: {
    fontSize: 50,
    padding: 15,
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
    marginTop: 150,
    marginLeft: 75,
    marginRight: 75,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    padding: 5,
  },
  instructions: {
    textAlign: 'center',
    fontSize: 35,
    paddingTop: 20,
    paddingBottom: 5,
  },
  copy: {
    textAlign: 'center',
    fontSize: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
  },
});
