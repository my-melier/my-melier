import React from 'react';
import { View, Text } from 'react-native';
import AddRating from './AddRating';
import UpdateRating from './UpdateRating';
import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';
import {numToLetter} from '../../utils';

const SingleWineRating = props => {
  const wine = props.navigation.getParam('wine')

  return (
    <View style={layoutStyles.container}>
      <Text style={textStyles.h2bold}>{wine.title}</Text>
      <Text style={textStyles.h3}>{wine.description}</Text>
      <Text style={textStyles.h3bold}>Score: {numToLetter(wine.points)}</Text>
      {wine.savedWine.like === null ? (
        <AddRating wine={wine} />
      ) : (
        <UpdateRating wine={wine} />
      )}
    </View>
  )
}

export default SingleWineRating
