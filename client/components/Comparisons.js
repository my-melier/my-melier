import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import {
  selectedWine,
  removedWine,
  clearedComparisons,
} from '../store/reducers/comparisonReducer';
import {
  saveWineToDb,
  fetchingRating,
} from '../store/reducers/userWinesReducer';

import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';
import buttonStyles from '../styles/buttonStyles';

class Comparisons extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleSelect(wine) {
    const {
      selectedWine,
      saveWineToDb,
      fetchRating,
      user,
      navigation,
    } = this.props;
    saveWineToDb(wine.id, user.id);
    fetchRating(wine.id);
    selectedWine(wine);
    return navigation.navigate('SelectedWine', { wine: wine });
  }

  handleClear() {
    const { clearedComparisons } = this.props;
    return clearedComparisons();
  }

  render() {
    const { comparisons } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <View style={layoutStyles.container}>
          <Text style={textStyles.h1}>
            <Text style={textStyles.bold}>my</Text>Menu
          </Text>
          <Text style={textStyles.h3}>
            Please select which wine you decide to order
          </Text>
          <Text style={textStyles.h3}>OR</Text>
          <View style={buttonStyles.container}>
            <TouchableOpacity
              onPress={() => navigate('Camera')}
              style={buttonStyles.wideButton}
            >
              <Text style={buttonStyles.text}>Add another wine</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.handleClear}
              style={buttonStyles.wideButton}
            >
              <Text style={buttonStyles.text}>Clear all wines</Text>
            </TouchableOpacity>
          </View>
          <View style={layoutStyles.padding}>
            {comparisons.map(wine => (
              <View key={wine.id} style={layoutStyles.bubble}>
                <Text style={textStyles.h3bold}>{wine.title}</Text>
                <Text style={textStyles.h5}>{wine.description}</Text>
                <Text style={textStyles.h5bold}>Score: {wine.points}</Text>
                <View style={buttonStyles.container}>
                  <TouchableOpacity
                    onPress={() => this.handleSelect(wine)}
                    style={buttonStyles.button}
                  >
                    <Text style={buttonStyles.text}>select</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.removedWine(wine.id)}
                    style={buttonStyles.button}
                  >
                    <Text style={buttonStyles.text}>remove</Text>
                  </TouchableOpacity>
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
  comparisons: state.comparisons.comparisons,
  user: state.user,
});

const mapDispatch = dispatch => ({
  selectedWine: wine => dispatch(selectedWine(wine)),
  removedWine: wineId => dispatch(removedWine(wineId)),
  clearedComparisons: () => dispatch(clearedComparisons()),
  saveWineToDb: (userId, wineId) => dispatch(saveWineToDb(userId, wineId)),
  fetchRating: wineId => dispatch(fetchingRating(wineId)),
});

export default connect(
  mapState,
  mapDispatch
)(Comparisons);
