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
  constructor() {
    super();
    this.filter = this.filter.bind(this);
  }
  componentDidMount() {
    const { fetchingWinesFromDb, user } = this.props;
    fetchingWinesFromDb(user.id);
  }
  filter(variable) {
    const { savedWines } = this.props;
    let filteredWines = savedWines;
    return filteredWines.wines.filter(wine => wine.savedWine.like === variable);
  }
  render() {
    const { loading, savedWines } = this.props;
    if (loading) {
      return <ActivityIndicator />;
    }
    if (!loading && !savedWines.wines) {
      return (
        <View style={styles.container}>
          <Text>No saved wines</Text>
        </View>
      );
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text> myWines </Text>
          <View style={styles.buttonContainer}>
            <Text> Filter by: </Text>
            <Button title="Like" onPress={() => this.filter(true)} />
            <Button title="Dislike" onPress={() => this.filter(false)} />
          </View>
          {savedWines.wines.map(wine => (
            <View key={wine.id}>
              <Text>{wine.title}</Text>
              {wine.savedWine.like ? (
                <Text>Like</Text>
              ) : (
                <Text>Do not like</Text>
              )}
            </View>
          ))}
          <View style={styles.wineContainer} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  buttonContainer: {
    flex: 1,
  },
});

const mapState = state => ({
  savedWines: state.userWines.savedWines,
  loading: state.userWines.loading,
  user: state.user,
});

const mapDispatch = dispatch => ({
  fetchingWinesFromDb: userId => dispatch(fetchingWinesFromDb(userId)),
});

export default connect(
  mapState,
  mapDispatch
)(MyWines);
