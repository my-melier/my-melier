/* eslint-disable react/display-name */
import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import MyWines from './MyWines';
import Camera from './Camera';
import CameraComponent from './CameraComponent';

const TabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Camera: CameraComponent,
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
