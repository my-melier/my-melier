import React from 'react';
import { View, Text } from 'react-native';
import AddRating from './AddRating';
import UpdateRating from './UpdateRating';
import {numToLetter} from '../../utils';
import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';

const SingleWineRating = props => {
  const wine = props.navigation.getParam('wine')

  return (
    <View>
      <View>
        <Text>{wine.title}</Text>
        <Text>{wine.description}</Text>
        <Text>Score: {numToLetter(wine.points)}</Text>
        {wine.savedWine.like === null ? (
          <AddRating wine={wine} />
        ) : (
          <UpdateRating wine={wine} />
        )}
      </View>
    </View>
  )
}

export default SingleWineRating
