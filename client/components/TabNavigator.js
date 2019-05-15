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
import { LogoTitle } from '../styles/defaultNavigationOptions';
import SingleWineRating from './SingleWineRating';
import AlreadySavedWine from './AlreadySavedWine';

const AuthStack = createStackNavigator({
  Login: Login,
  Signup: Signup,
});

const HomeStack = createStackNavigator({
  Home: Home,
});

const CameraStack = createStackNavigator(
  {
    Camera: Camera,
    ConfirmWine: ConfirmWine,
    Comparisons: Comparisons,
    SelectedWine: SelectedWine,
    AlreadySavedWine: AlreadySavedWine,
    ErrorWine: ErrorWine,
  },
  {
    defaultNavigationOptions: {
      headerTitle: <LogoTitle />,
    },
  }
);

const myWinesStack = createStackNavigator(
  {
    myWines: MyWines,
    Rating: SingleWineRating,
  },
  {
    defaultNavigationOptions: {
      headerTitle: <LogoTitle />,
    },
  }
);

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
        let size;
        if (routeName === 'Home') {
          iconName = 'ios-home';
          size = 25;
        } else if (routeName === 'myWines') {
          iconName = 'ios-wine';
          size = 25;
        } else if (routeName === 'Camera') {
          iconName = 'ios-camera';
          size = 35;
        }

        return <IconComponent name={iconName} size={size} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

// const AppContainer = createAppContainer(
//   createSwitchNavigator(
//     {
//       App: TabNavigator,
//       Auth: AuthStack,
//     },
//     {
//       initialRouteName: 'Auth',
//     }
//   )
// );

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;
