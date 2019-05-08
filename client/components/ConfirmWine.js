import React, { Component } from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchingWinesFromDb,
  confirmedWine,
  gettingWines,
} from '../store/reducers/dbReducer';
import { ocrToUrlTitle } from '../../utils';

class ConfirmWine extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { googleResponse, fetchWine } = this.props;
    const queryString = ocrToUrlTitle(googleResponse);
    fetchWine(queryString);
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
});

const mapDispatch = dispatch => ({
  fetchWine: googleResFormatted =>
    dispatch(fetchingWinesFromDb(googleResFormatted)),
  confirmedWine: wine => dispatch(confirmedWine(wine)),
  gettingWines: () => dispatch(gettingWines()),
});

export default connect(
  mapState,
  mapDispatch
)(ConfirmWine);
