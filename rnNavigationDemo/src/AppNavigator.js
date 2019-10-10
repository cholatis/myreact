import React, { Component } from 'react';
import { Image } from 'react-native';

import {
    createSwitchNavigator,
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer
} from 'react-navigation';

import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import Tab1Screen from './Tab1Screen';

const AppStack = createStackNavigator({
    Home: {screen: HomeScreen},
    Register: { screen: RegisterScreen},
    Tab1: { screen: Tab1Screen},
}, {
    // screen เริ่มต้น
    initRouteName: 'Home'
})

export default createAppContainer(AppStack)