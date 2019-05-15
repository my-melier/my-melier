import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { gotGoogleResponse } from '../store/reducers/googleVisionReducer';
import {
  fetchingWinesFromDb,
  confirmedWine,
} from '../store/reducers/queryWinesReducer';
import { addedToComparisons } from '../store/reducers/comparisonReducer';
import { ocrToUrlTitle } from '../../utils';
import ErrorWine from './ErrorWine';
import LoadingPage from './LoadingPage';
import googleVisionConfig from '../../googleVisionConfig.js';
import SingleWine from './SingleWineForConfirm';
import { fetchingRating } from '../store/reducers/userWinesReducer';

class ConfirmWine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.sendToGoogle = this.sendToGoogle.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  async componentDidMount() {
    await this.sendToGoogle();
    const { googleResponse, fetchWine } = this.props;
    const queryString = ocrToUrlTitle(googleResponse);
    await fetchWine(queryString);
    this.setState({ loading: false });
  }

  async sendToGoogle() {
    const { image, gotGoogleResponse } = this.props;
    try {
      const body = JSON.stringify({
        requests: [
          {
            features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
            image: {
              content: image.base64,
            },
          },
        ],
      });
      const data = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' +
          googleVisionConfig.API_KEY,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: body,
        }
      );
      const responseJson = await data.json();
      gotGoogleResponse(responseJson);
    } catch (error) {
      console.error(error);
    }
  }

  async handlePress(wine) {
    const {
      comparisons,
      addedToComparisons,
      navigation,
      fetchRating,
      loading,
    } = this.props;
    await fetchRating(wine.id);
    const { alreadySavedWine } = this.props;
    if (loading) {
      <ActivityIndicator />;
    } else if (!loading && !alreadySavedWine) {
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
    } else if (!loading && alreadySavedWine) {
      return navigation.navigate('AlreadySavedWine', {
        savedWine: alreadySavedWine,
      });
    }
  }

  render() {
    const { wines, loading } = this.props;

    if (this.state.loading) {
      return <LoadingPage pronoun={'our'} />;
    } else if (!wines[0]) {
      return (
        <View>
          <ErrorWine />
        </View>
      );
    } else if (wines.length === 1) {
      const singleWine = wines[0];
      return (
        <View style={styles.container}>
          <Text style={styles.headerText}>
            Please confirm this is the correct wine:
          </Text>
          <SingleWine
            wine={singleWine}
            handlePress={this.handlePress}
            loading={loading}
          />
        </View>
      );
    } else
      return (
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.headerText}>
              Please confirm which wine is correct:
            </Text>
            {wines.map(wine => (
              <SingleWine
                key={wine.id}
                wine={wine}
                handlePress={this.handlePress}
                loading={loading}
              />
            ))}
          </View>
        </ScrollView>
      );
  }
}

const mapState = state => ({
  image: state.googleVision.image,
  googleResponse: state.googleVision.response,
  wines: state.database.results,
  comparisons: state.comparisons.comparisons,
  alreadySavedWine: state.userWines.alreadySavedWine,
  loading: state.userWines.loading,
});

const mapDispatch = dispatch => ({
  gotGoogleResponse: response => dispatch(gotGoogleResponse(response)),
  fetchWine: googleResFormatted =>
    dispatch(fetchingWinesFromDb(googleResFormatted)),
  confirmedWine: wine => dispatch(confirmedWine(wine)),
  addedToComparisons: wine => dispatch(addedToComparisons(wine)),
  fetchRating: wineId => dispatch(fetchingRating(wineId)),
});

export default connect(
  mapState,
  mapDispatch
)(ConfirmWine);

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
