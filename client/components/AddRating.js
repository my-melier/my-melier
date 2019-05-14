import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import {
  rateWineInDb,
  fetchingWinesFromDb,
} from '../store/reducers/userWinesReducer';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

class AddRating extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
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
          <Text>Add your rating:</Text>
        </View>
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
  )(AddRating)
);

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});
