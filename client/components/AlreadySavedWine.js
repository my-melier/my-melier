import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AddRating from './AddRating';

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
      <View>
        <View>
          <Text>You've already had this wine!</Text>
          <Text>{wine.title}</Text>
          <Text>{wine.description}</Text>
          <Text>Score: {wine.points}</Text>
          {wine.savedWine.like ? (
            <Text>Rating: you liked this wine!</Text>
          ) : wine.savedWine.like === false ? (
            <Text>You did not like this wine!</Text>
          ) : (
            <View>
              <Text>You haven't rated this wine yet</Text>
              <AddRating wine={wine} />
            </View>
          )}
          <TouchableOpacity onPress={this.goBackToCamera}>
            <Text>Take another photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
