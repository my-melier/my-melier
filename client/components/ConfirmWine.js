import React, { Component } from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchingWinesFromDb,
  confirmedWine,
  gettingWines,
} from '../store/reducers/dbReducer';

class ConfirmWine extends Component {
  constructor(props) {
    super(props);
  }

  ocrToUrlTitle = string => {
    const characters = '.,!/1234567890()$!@#%^&*+';
    return string
      .split('')
      .filter(char => !characters.includes(char))
      .join('')
      .replace(/-/g, ' ')
      .replace(/ /g, '_');
  };

  componentDidMount() {
    const { googleResponse, fetchWine } = this.props;
    const queryString = this.ocrToUrlTitle(
      googleResponse.responses[0].fullTextAnnotation.text
    );
    fetchWine(queryString);
  }

  render() {
    const { loading, wines } = this.props;

    if (loading) {
      return <ActivityIndicator />;
    }
    return (
      <View style={styles.container}>
        {wines.map(wine => (
          <Text key={wine.id}>{wine.title}</Text>
        ))}
        <Text> Please Confirm Your Wine! </Text>
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
