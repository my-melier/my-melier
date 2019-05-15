import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { rateWineInDb } from '../store/reducers/userWinesReducer';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';
import buttonStyles from '../styles/buttonStyles';

class UpdateRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateClicked: false,
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handlePress() {
    this.setState({ updateClicked: !this.state.updateClicked });
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
      <View>
        {wine.savedWine.like ? (
          <Text style={textStyles.h3bold}>You liked this wine!</Text>
        ) : (
          <Text style={textStyles.h3bold}>You did not like this wine!</Text>
        )}
        <View style={buttonStyles.container}>
          <TouchableOpacity
            onPress={this.handlePress}
            style={buttonStyles.wideButton}
          >
            <Text style={buttonStyles.text}>Update Rating</Text>
          </TouchableOpacity>
        </View>
        {this.state.updateClicked ? (
          <View>
            <TouchableOpacity onPress={() => this.handleUpdate(wine.id, true)}>
              <IconComponent
                name={'ios-checkmark-circle-outline'}
                size={50}
                color={'green'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleUpdate(wine.id, false)}>
              <IconComponent
                name={'ios-close-circle-outline'}
                size={50}
                color={'tomato'}
              />
            </TouchableOpacity>
          </View>
        ) : null}
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
  )(UpdateRating)
);

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});
