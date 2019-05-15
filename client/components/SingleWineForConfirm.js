import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import layoutStyles from '../styles/layoutStyles';
import textStyles from '../styles/textStyles';
import buttonStyles from '../styles/buttonStyles';

const SingleWine = props => {
  const { wine, handlePress, loading } = props;

  return (
    <View style={layoutStyles.flexContainer}>
      <View style={styles.textContainer}>
        <Text style={textStyles.h6}>{wine.title}</Text>
      </View>
      <View style={styles.container}>
        <View style={buttonStyles.confirmWine}>
          <TouchableOpacity
            onPress={() => handlePress(wine)}
            style={buttonStyles.button}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={buttonStyles.text}>confirm</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SingleWine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
});
