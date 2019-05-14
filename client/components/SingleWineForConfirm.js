import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

const SingleWine = props => {
  const { wine, handlePress } = props;

  return (
    <View style={styles.wine}>
      <View style={styles.titleContainer}>
        <Text style={styles.wineTitle}>{wine.title}</Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => handlePress(wine)}>
          <Text style={styles.buttonText}>confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleWine;

const styles = StyleSheet.create({
  wine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  titleContainer: {
    width: '60%',
  },
  wineTitle: {
    fontSize: 15,
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 5,
    height: 30,
    width: 75,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
});
