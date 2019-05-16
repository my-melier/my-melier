import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { clearedComparisons } from '../store/reducers/comparisonReducer';
import { fetchingWinesFromDb } from '../store/reducers/userWinesReducer';
import { connect } from 'react-redux';
import Logout from './Logout';
import textStyles from '../styles/textStyles';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    headerRight: <Logout />,
  };

  componentDidMount() {
    const { fetchUserWines, user } = this.props;
    fetchUserWines(user.id);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.padding}>
          <Text style={textStyles.logo}>
            <Text style={textStyles.bold}>my</Text>Melier
          </Text>
          <Text style={textStyles.h3bold}>
            Life is too short to drink bad wine!
          </Text>
          <View style={styles.bubbleContainer}>
            <Text style={textStyles.h3}>Open the camera to scan a menu</Text>
            <Text style={textStyles.h4}>o o o</Text>
            <Text style={textStyles.h3}>
              Click on myWines to see previously saved wines
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapState = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  fetchUserWines: userId => dispatch(fetchingWinesFromDb(userId)),
});

export default connect(
  mapState,
  mapDispatch
)(Home);

const styles = StyleSheet.create({
  padding: {
    paddingTop: 5,
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  bubbleContainer: {
    backgroundColor: '#E3E8EA',
    borderRadius: 20,
    padding: 25,
    marginTop: 30,
    marginBottom: 10,
  },
});
