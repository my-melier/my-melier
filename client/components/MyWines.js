import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
import { fetchingWinesFromDb } from '../store/reducers/userWinesReducer';

class MyWines extends Component {
  componentDidMount() {
    const { fetchingWinesFromDb } = this.props;
    fetchingWinesFromDb(user);
  }
  render() {
    const { loading, wines } = this.props;
    if (loading) {
      return <ActivityIndicator />;
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text> myWines </Text>
          {wines.map(wine => (
            <View key={wine.id}>
              <Text>{wine.title}</Text>
            </View>
          ))}
          <View style={styles.buttonContainer}>
            <Button title="Thumbs Up" onPress={() => this.filter(thumbsUp)} />
            <Button title="Thumbs Down" onPress={() => this.filter(thumbsUp)} />
          </View>
          <View style={styles.wineContainer} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
  },
});

const mapState = state => ({
  wines: state.userWines.wines,
  loading: state.userWines.loading,
  user: state.user,
});

const mapDispatch = dispatch => ({
  fetchingWinesFromDb: user => dispatch(fetchingWinesFromDb(user)),
});

export default connect(
  mapState,
  mapDispatch
)(MyWines);
