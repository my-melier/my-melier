import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AddRating from './AddRating';
import UpdateRating from './UpdateRating';
import { MyWinesTitle } from '../styles/defaultNavigationOptions';
import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';

class SingleWineRating extends Component {
  static navigationOptions = {
    headerTitle: <MyWinesTitle />,
  };

  render() {
    const wine = this.props.navigation.getParam('wine');
    return (
      <View style={layoutStyles.container}>
        <Text style={textStyles.h2bold}>{wine.title}</Text>
        <Text style={textStyles.h3}>{wine.description}</Text>
        <Text style={textStyles.h3bold}>Score: {wine.points}</Text>
        {wine.savedWine.like === null ? (
          <AddRating wine={wine} />
        ) : (
          <UpdateRating wine={wine} />
        )}
      </View>
    );
  }
}

export default SingleWineRating;
