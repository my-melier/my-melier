import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { rateWineInDb } from '../store/reducers/userWinesReducer';

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
    this.props.rateWineInDb(wineId, rating);
  }

  render() {
    const { wine } = this.props;
    const thumbsUp = {
      uri:
        'https://cdn0.iconfinder.com/data/icons/elite-emoticons/512/thumbs-up-512.png',
    };
    const thumbsDown = {
      uri: 'https://sitejerk.com/images/transparent-thumbs-down-2.png',
    };

    return (
      <View>
        <View>
          <Text>
            Your rating:
            {wine.savedWine.like ? (
              <Image source={thumbsUp} style={styles.image} />
            ) : (
              <Image source={thumbsDown} style={styles.image} />
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
              <Image source={thumbsUp} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleUpdate(wine.id, false)}>
              <Image source={thumbsDown} style={styles.image} />
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

export default connect(
  null,
  mapDispatch
)(UpdateRating);

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});
