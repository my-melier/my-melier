/* eslint-disable react/display-name */
import React from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import MyWines from './MyWines';
import Camera from './Camera';
import ConfirmWine from './ConfirmWine';
import Comparisons from './Comparisons';

const CameraStack = createStackNavigator({
  Camera: Camera,
  ConfirmWine: ConfirmWine,
  Comparisons: Comparisons,
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Camera: CameraStack,
    myWines: MyWines,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-wine';
        } else if (routeName === 'Account') {
          iconName = 'md-person';
        } else if (routeName === 'Camera') {
          iconName = 'ios-camera';
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;
