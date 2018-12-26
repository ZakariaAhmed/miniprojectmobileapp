import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Text, StyleSheet, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import LoginScreen from '../screens/LoginScreen';

const AppNavigator = createStackNavigator(
  { 
    Home: HomeScreen,
    Login:LoginScreen,
    Game: GameScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#387EF5'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);
  
  export default createAppContainer(AppNavigator);