import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import MyWines from './MyWines';
import Camera from './Camera';

const TabNavigator = createBottomTabNavigator({
  Home: Home,
  Camera: Camera,
  myWines: MyWines,
});

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;
