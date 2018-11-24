import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import MapScreen from './screens/MapScreen';

const MainNavigator = createStackNavigator({
  Main:{
    screen:MapScreen
  },
  Login:{
    screen:LoginScreen
  }
})

const App = createAppContainer(MainNavigator);

export default App;