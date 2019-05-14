import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';

class SingleWineRating extends Component {
  constructor() {
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {}

  render() {
    return (
      <View>
        <View>
          <Text>{wine.title}</Text>
          <Text>{wine.description}</Text>
          <Text>Score: {wine.points}</Text>
          <Text>Your rating: </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => handleUpdate()}>
            <Text>update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
