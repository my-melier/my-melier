import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Button } from 'react-native';
// import { connect } from 'react-redux';
// import { selectedWine } from '../store/reducers/comparisonReducer';

export default class SelectedWine extends Component {
  render() {
    return (
      <View>
        <Text>Cheers!</Text>
        <Text>Don't forget to rate your selection:</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
  },
});

// const mapState = state => ({
//   selectedWine: state.comparisons.selectedWine,
// });

// //   const mapDispatch = dispatch => ({
// //     selectedWine: wine => dispatch(selectedWine(wine)),
// //   });

// export default connect(mapState)(SelectedWine);
