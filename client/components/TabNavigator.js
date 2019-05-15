/* eslint-disable react/display-name */
import React from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import MyWines from './MyWines';
import Camera from './Camera';
import ConfirmWine from './ConfirmWine';
import Comparisons from './Comparisons';
import SelectedWine from './SelectedWine';
import Signup from './Signup';
import Login from './Login';
import ErrorWine from './ErrorWine';
import defaultNavStyling from '../styles/defaultNavigationOptions';
import SingleWineRating from './SingleWineRating';

const AuthStack = createStackNavigator(
  {
    Login: Login,
    Signup: Signup,
  },
  { defaultNavigationOptions: defaultNavStyling }
);

const HomeStack = createStackNavigator({
  Home: Home,
});

const CameraStack = createStackNavigator(
  {
    Camera: Camera,
    ConfirmWine: ConfirmWine,
    Comparisons: Comparisons,
    SelectedWine: SelectedWine,
    ErrorWine: ErrorWine,
  },
  { defaultNavigationOptions: defaultNavStyling }
);

const myWinesStack = createStackNavigator({
  myWines: MyWines,
  Rating: SingleWineRating,
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Camera: CameraStack,
    myWines: myWinesStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
        } else if (routeName === 'myWines') {
          iconName = 'ios-wine';
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

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: TabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    }
  )
);

export default AppContainer;
