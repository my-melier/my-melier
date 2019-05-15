import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import AddRating from './AddRating';
import UpdateRating from './UpdateRating';

class AlreadySavedWine extends Component {
  render() {
    let wine;
    const { wineRating, selectedWine } = this.props;
    console.log('WINE W RATING', wineRating);
    if (wineRating.wines) {
      wine = wineRating.wines[0];
    } else {
      wine = selectedWine;
    }
    return (
      <View>
        <View>
          <Text>You've already had this wine!</Text>
          <Text>{wine.title}</Text>
          <Text>{wine.description}</Text>
          <Text>Score: {wine.points}</Text>
          {wine.savedWine ? (
            wine.savedWine.like ? (
              <Text>Rating: you liked this wine!</Text>
            ) : wine.savedWine.like === false ? (
              <Text>You did not like this wine!</Text>
            ) : (
              <View>
                <Text>You haven't rated this wine yet</Text>
                <AddRating wine={wine} />
              </View>
            )
          ) : (
            <View>
              <Text>You haven't rated this wine yet</Text>
              <AddRating wine={wine} />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const mapState = state => ({
  wineRating: state.userWines.alreadySavedWine,
  loading: state.userWines.loading,
});
// const mapDispatch = dispatch => ({
//   fetchRating: wineId => dispatch(fetchingRating(wineId)),
// });

export default connect(mapState)(AlreadySavedWine);
