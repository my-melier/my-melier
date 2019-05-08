import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Button,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import {
  fetchingWinesFromDb,
  confirmedWine,
  gettingWines,
} from '../store/reducers/dbReducer';
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
      comparisons.map(comparison => {
        if (comparison.id === wine.id) {
          return Alert.alert(null, 'You already added this wine!', [
            { text: 'OK', style: 'cancel' },
          ]);
        } else {
          addedToComparisons(wine);
        }
      });
    }
    return navigation.navigate('Comparisons');
  }

  render() {
    const { loading, wines } = this.props;

    if (loading) {
      return <ActivityIndicator />;
    }
    return (
      <View style={styles.container}>
        <Text> Please Confirm Your Wine! </Text>
        {wines.map(wine => (
          <View key={wine.id}>
            <Text>{wine.title}</Text>
            <Text>{wine.description}</Text>
            <Text>{wine.points}</Text>
            <Button title="confirm" onPress={() => this.handlePress(wine)} />
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  gettingWines: () => dispatch(gettingWines()),
  addedToComparisons: wine => dispatch(addedToComparisons(wine)),
});

export default connect(
  mapState,
  mapDispatch
)(ConfirmWine);
