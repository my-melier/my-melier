import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { logout } from '../store/reducers/userReducer';
import { clearedComparisons } from '../store/reducers/comparisonReducer';
import { connect } from 'react-redux';

import buttonStyles from '../styles/buttonStyles';
import textStyles from '../styles/textStyles';
import layoutStyles from '../styles/layoutStyles';

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
      <View style={layoutStyles.container}>
        <View style={styles.padding}>
          <View style={styles.padding}>
            <Text style={textStyles.logo}>
              <Text style={textStyles.bold}>my</Text>Melier
            </Text>
          </View>
          <View style={styles.padding}>
            <Text style={textStyles.h1}>
              Life is too short to drink bad wine!
            </Text>
            <Text style={textStyles.h2}>Open the camera to scan a menu</Text>
            <Text style={textStyles.h2}>
              Click on myWines to see previously saved wines
            </Text>
          </View>
          <View style={styles.padding}>
            <View style={buttonStyles.container}>
              <TouchableOpacity
                onPress={this.logout}
                style={buttonStyles.button}
              >
                <Text style={buttonStyles.text}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  padding: {
    paddingTop: 50,
  },
});
