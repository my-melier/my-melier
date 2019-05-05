import React from 'react';
import { StyleSheet } from 'react-native';
import AppContainer from './client/components/TabNavigator';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
