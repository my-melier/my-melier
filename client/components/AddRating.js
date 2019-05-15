import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { rateWineInDb } from '../store/reducers/userWinesReducer';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';
import buttonStyles from '../styles/buttonStyles';

class AddRating extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(wineId, rating) {
    const { rateWineInDb, navigation } = this.props;
    rateWineInDb(wineId, rating);
    return navigation.navigate('myWines');
  }

  render() {
    const { wine } = this.props;
    let IconComponent = Ionicons;

    return (
      <View style={layoutStyles.container}>
        <Text style={textStyles.h3}>Add your rating:</Text>
        <View style={buttonStyles.container}>
          <TouchableOpacity
            onPress={() => this.handleUpdate(wine.id, true)}
            style={buttonStyles.rating}
          >
            <IconComponent
              name={'ios-checkmark-circle-outline'}
              size={60}
              color={'green'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleUpdate(wine.id, false)}
            style={buttonStyles.rating}
          >
            <IconComponent
              name={'ios-close-circle-outline'}
              size={60}
              color={'tomato'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatch = dispatch => ({
  rateWineInDb: (wineId, rating) => dispatch(rateWineInDb(wineId, rating)),
});

export default withNavigation(
  connect(
    null,
    mapDispatch
  )(AddRating)
);
