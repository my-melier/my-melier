import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native'
import AddRating from './AddRating'
import UpdateRating from './UpdateRating'
import {numToLetter} from '../../utils'

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
