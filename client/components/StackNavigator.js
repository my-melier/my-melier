import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ConfirmWine from './ConfirmWine';

const AppNavigator = createStackNavigator(
  {
    ConfirmWine: ConfirmWine,
  }
  // {
  //   initialRouteName: 'Home',
  // }
);
