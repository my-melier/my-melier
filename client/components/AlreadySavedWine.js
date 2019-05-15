import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AddRating from './AddRating';

import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';
import buttonStyles from '../styles/buttonStyles';

export default class AlreadySavedWine extends Component {
  constructor() {
    super();
    this.goBackToCamera = this.goBackToCamera.bind(this);
  }
  goBackToCamera() {
    return this.props.navigation.navigate('Camera');
  }
  render() {
    const savedWine = this.props.navigation.getParam('savedWine');
    const wine = savedWine.wines[0];
    return (
      <View style={layoutStyles.container}>
        <View>
          <Text style={textStyles.h2}>You've already had this wine!</Text>
          <View style={layoutStyles.padding}>
            <Text style={textStyles.h2bold}>{wine.title}</Text>
            <Text style={textStyles.h5}>{wine.description}</Text>
            <Text style={textStyles.h5bold}>Score: {wine.points}</Text>
          </View>
          {wine.savedWine.like ? (
            <Text style={textStyles.h3bold}>You liked this wine!</Text>
          ) : wine.savedWine.like === false ? (
            <Text style={textStyles.h3bold}>You did not like this wine!</Text>
          ) : (
            <View>
              <Text style={textStyles.h3bold}>
                You haven't rated this wine yet
              </Text>
              <AddRating wine={wine} />
            </View>
          )}
        </View>
        <View>
          <View style={buttonStyles.container}>
            <TouchableOpacity
              onPress={this.goBackToCamera}
              style={buttonStyles.wideButton}
            >
              <Text style={buttonStyles.text}>Take another photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
