import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  fetchingWinesFromDb,
  filterWines,
} from '../store/reducers/userWinesReducer';

class MyWines extends Component {
  constructor() {
    super();
    this.filter = this.filter.bind(this);
  }
  componentDidMount() {
    const { fetchingWinesFromDb, user } = this.props;
    fetchingWinesFromDb(user.id);
  }
  filter(filter) {
    this.props.filterWines(filter);
  }
  render() {
    const { loading, savedWines, filteredWines } = this.props;
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
          <View style={styles.titleContainer}>
            <Text style={styles.title}> myWines </Text>
          </View>
          <Text style={styles.text}> Filter by: </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.filter('all')}
            >
              <Text style={styles.buttonText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.filter(true)}
            >
              <Text style={styles.buttonText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.filter(false)}
            >
              <Text style={styles.buttonText}>Dislike</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.wineContainer}>
            {filteredWines.length
              ? filteredWines.map(wine => (
                  <View key={wine.id}>
                    <View style={styles.wineTitle}>
                      <Text>{wine.title}</Text>
                    </View>
                  </View>
                ))
              : savedWines.wines.map(wine => (
                  <View key={wine.id}>
                    <View style={styles.wineTitle}>
                      <Text>{wine.title}</Text>
                    </View>
                  </View>
                ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => ({
  savedWines: state.userWines.savedWines,
  loading: state.userWines.loading,
  user: state.user,
  filteredWines: state.userWines.filteredWines,
});

const mapDispatch = dispatch => ({
  fetchingWinesFromDb: userId => dispatch(fetchingWinesFromDb(userId)),
  filterWines: filter => dispatch(filterWines(filter)),
});

export default connect(
  mapState,
  mapDispatch
)(MyWines);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 20,
    margin: 10,
    width: 100,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  wineContainer: {
    marginTop: 20,
  },
  wineTitle: {
    padding: 10,
  },
});
