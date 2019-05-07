import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './client/store';
import AppContainer from './client/components/TabNavigator';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
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
