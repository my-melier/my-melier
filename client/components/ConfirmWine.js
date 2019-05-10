import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import {
  fetchingWinesFromDb,
  confirmedWine,
} from '../store/reducers/queryWinesReducer';
import { addedToComparisons } from '../store/reducers/comparisonReducer';
import { ocrToUrlTitle } from '../../utils';

class ConfirmWine extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    const { googleResponse, fetchWine } = this.props;
    const queryString = ocrToUrlTitle(googleResponse);
    fetchWine(queryString);
  }

  handlePress(wine) {
    const { comparisons, addedToComparisons, navigation } = this.props;
    if (comparisons.length === 0) {
      addedToComparisons(wine);
    } else {
      for (let i = 0; i < comparisons.length; i++) {
        if (comparisons[i].id === wine.id) {
          Alert.alert(null, 'You already added this wine!', [
            { text: 'OK', style: 'cancel' },
          ]);
          return navigation.navigate('Comparisons');
        }
      }
      addedToComparisons(wine);
    }
    return navigation.navigate('Comparisons');
  }

  render() {
    const { loading, wines } = this.props;

    if (loading) {
      return <ActivityIndicator />;
    }

    if (wines.length === 1) {
      const singleWine = wines[0];
      return (
        <View style={styles.container}>
          <Text style={styles.headerText}>
            Please confirm this is the correct wine:
          </Text>
          <View style={styles.wine}>
            <View style={styles.titleContainer}>
              <Text style={styles.wineTitle}>{singleWine.title}</Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => this.handlePress(singleWine)}>
                <Text style={styles.buttonText}>confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headerText}>
            Please confirm which wine is correct:
          </Text>
          {wines.map(wine => (
            <View key={wine.id} style={styles.wine}>
              <View style={styles.titleContainer}>
                <Text style={styles.wineTitle}>{wine.title}</Text>
              </View>
              <View style={styles.button}>
                <TouchableOpacity onPress={() => this.handlePress(wine)}>
                  <Text style={styles.buttonText}>confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  titleContainer: {
    width: '60%',
  },
  wineTitle: {
    fontSize: 15,
  },
  wine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 5,
    height: 30,
    width: 75,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
});

const mapState = state => ({
  loading: state.database.loading,
  wines: state.database.results,
  googleResponse: state.googleVision.response,
  comparisons: state.comparisons.comparisons,
});

const mapDispatch = dispatch => ({
  fetchWine: googleResFormatted =>
    dispatch(fetchingWinesFromDb(googleResFormatted)),
  confirmedWine: wine => dispatch(confirmedWine(wine)),
  addedToComparisons: wine => dispatch(addedToComparisons(wine)),
});

export default connect(
  mapState,
  mapDispatch
)(ConfirmWine);
