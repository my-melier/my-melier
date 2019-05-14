import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
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
    this.state = {
      filterArg: '',
      button: '',
    };
    this.filter = this.filter.bind(this);
  }
  componentDidMount() {
    const { fetchingWinesFromDb, user } = this.props;
    fetchingWinesFromDb(user.id);
  }

  filter(filter) {
    this.props.filterWines(filter);
    if (filter === 'all') {
      this.setState({ button: 'all' });
    } else if (filter === true) {
      this.setState({ filterArg: 'liked', button: 'true' });
    } else {
      this.setState({ filterArg: 'disliked', button: 'false' });
    }
  }
  render() {
    const { loading, filteredWines } = this.props;
    if (loading) {
      return <ActivityIndicator />;
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}> myWines </Text>
          </View>
          <Text style={styles.filterText}> Filter by: </Text>
          <View style={styles.buttonContainer}>
            {this.state.button === 'all' ? (
              <TouchableOpacity style={styles.activeButton}>
                <Text style={styles.buttonText}>All</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.filter('all')}
              >
                <Text style={styles.buttonText}>All</Text>
              </TouchableOpacity>
            )}
            {this.state.button === 'true' ? (
              <TouchableOpacity style={styles.activeButton}>
                <Text style={styles.buttonText}>Like</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.filter(true)}
              >
                <Text style={styles.buttonText}>Like</Text>
              </TouchableOpacity>
            )}
            {this.state.button === 'false' ? (
              <TouchableOpacity style={styles.activeButton}>
                <Text style={styles.buttonText}>Dislike</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.filter(false)}
              >
                <Text style={styles.buttonText}>Dislike</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.wineContainer}>
            {filteredWines.wines ? (
              filteredWines.wines.length ? (
                filteredWines.wines.map(wine => (
                  <View key={wine.id}>
                    <View style={styles.text}>
                      <Text>{wine.title}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.text}>
                  <Text>
                    You currently have no {this.state.filterArg} wines
                  </Text>
                </View>
              )
            ) : (
              <View style={styles.text}>
                <Text>Your cellar is empty!</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => ({
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
  filterText: {
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
  activeButton: {
    padding: 10,
    backgroundColor: '#D3DCDF',
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
  text: {
    padding: 10,
  },
});
