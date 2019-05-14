import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { rateWineInDb } from '../store/reducers/userWinesReducer';

class AddRating extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(wineId, rating) {
    this.props.rateWineInDb(wineId, rating);
  }

  render() {
    const { wine } = this.props;

    return (
      <View>
        <View>
          <Text>Add your rating:</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => this.handleUpdate(wine.id, true)}>
            <Image source={thumbsUp} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleUpdate(wine.id, false)}>
            <Image source={thumbsDown} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatch = dispatch => ({
  rateWineInDb: (wineId, rating) => dispatch(rateWineInDb(wineId, rating)),
});

export default connect(
  null,
  mapDispatch
)(AddRating);

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});
