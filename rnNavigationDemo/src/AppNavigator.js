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
import Tab2Screen from './Tab2Screen';
import DetailScreen from './DetailScreen';

//คือการทำหน้าที่มี tab ให้เลือก
const TabStack = createBottomTabNavigator({
    Tab1: {screen: Tab1Screen},
    Tab2: {screen: Tab2Screen}
}, {
    initRouteName: 'Tab1'
})

//เอาไว้ตกแต่ง navigation bar
TabStack.navigationOptions = ({navigation}) => {
    const {routeName} = navigation.state.routes[navigation.state.index];

    //เปลี่ยนชื่อ navigation bar ด้านบน
    const headerTitle = routeName;

    return {
        headerTitle,
        headerStyle: {backgroundColor: '#339CED'},
        headerTitleStyle: { color: "#FFFFFF"}
    };

     
};

//Scene
const AppStack = createStackNavigator({
    //Tab1: {screen: Tab1Screen},
    TabStack: { screen: TabStack},
    Detail: { screen: DetailScreen }
}, {
    // screen เริ่มต้น
    initialRouteName: 'TabStack'
})

//Scene
const AuthStack = createStackNavigator({
    Home: {screen: HomeScreen},
    Register: { screen: RegisterScreen},

}, {
    initialRouteName: 'Home'
})


//HOC - Higher order component
export default createAppContainer(
    createSwitchNavigator({
        AuthScene: AuthStack,
        AppScene: AppStack
    }, {initialRouteName: 'AuthScene'}
    )
);
