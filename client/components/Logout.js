import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import { logout } from '../store/reducers/userReducer';
import { clearedComparisons } from '../store/reducers/comparisonReducer';
import buttonStyles from '../styles/buttonStyles';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { clearedComparisons, navigation } = this.props;
    logout();
    clearedComparisons();
    return navigation.navigate('Auth');
  }

  render() {
    return (
      <View>
        <View>
          <Button title="Logout" onPress={this.logout} />
        </View>
      </View>
    );
  }
}

const mapDispatch = dispatch => ({
  clearedComparisons: () => dispatch(clearedComparisons()),
});

export default withNavigation(
  connect(
    null,
    mapDispatch
  )(Logout)
);

// const styles = StyleSheet.create({
//   padding: {
//     paddingTop: 5,
//     paddingBottom: 100,
//   },
//   logout: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
// });
