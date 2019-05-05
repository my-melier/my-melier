import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Button } from 'react-native';

export default class MyWines extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text> myWines </Text>
          <View style={styles.buttonContainer}>
            <Button title="Thumbs Up" onPress={() => this.filter(thumbsUp)} />
            <Button title="Thumbs Down" onPress={() => this.filter(thumbsUp)} />
          </View>
          <View style={styles.wineContainer}>
            {wines.map(wine => {
              return <Text key={wine.id}>{wine}</Text>;
            })}
          </View>
        </View>
      </ScrollView>
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
