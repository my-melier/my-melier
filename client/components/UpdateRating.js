import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import {
  rateWineInDb,
  fetchingWinesFromDb,
} from '../store/reducers/userWinesReducer';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

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
    const { user, fetchWines, rateWineInDb, navigation } = this.props;
    rateWineInDb(wineId, rating);
    fetchWines(user.id);
    return navigation.navigate('myWines');
  }

  render() {
    const { wine } = this.props;
    let IconComponent = Ionicons;

    return (
      <View>
        <View>
          <Text>
            Your rating:
            {wine.savedWine.like ? (
              <IconComponent
                name={'ios-checkmark-circle-outline'}
                size={50}
                color={'green'}
              />
            ) : (
              <IconComponent
                name={'ios-close-circle-outline'}
                size={50}
                color={'tomato'}
              />
            )}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.handlePress}>
            <Text>update</Text>
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

const mapState = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  rateWineInDb: (wineId, rating) => dispatch(rateWineInDb(wineId, rating)),
  fetchWines: userId => dispatch(fetchingWinesFromDb(userId)),
});

export default withNavigation(
  connect(
    mapState,
    mapDispatch
  )(UpdateRating)
);

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});
