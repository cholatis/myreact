import React, { Component } from "react";
import { Image } from "react-native";

import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import HomeScreen from "./HomeScreen";
import RegisterScreen from "./RegisterScreen";
import Tab1Screen from "./Tab1Screen";
import Tab2Screen from "./Tab2Screen";
import Tab3Screen from "./Tab3Screen";
import Tab4Screen from "./Tab4Screen";
import DetailScreen from "./DetailScreen";
import ScanScreen from "./ScanScreen";
import YoutubeScreen from "./YoutubeScreen";
import LoginScreen from "./LoginScreen";


//คือการทำหน้าที่มี tab ให้เลือก
const TabStack = createBottomTabNavigator(
  {
    Tab1: {
      screen: Tab1Screen,
      navigationOptions: {
        tabBarLabel: "Tab1",
        tabBarIcon: ({ focused }) => (
          <Image
            style={{
              height: 28,
              width: 28
            }}
            resizeMode="contain"
            source={
              focused
                ? require("./assets/img/ic_profile_select.png")
                : require("./assets/img/ic_profile.png")
            }
          />
        )
      }
    },
    YoutubeHome: {
      screen: Tab2Screen,
      navigationOptions: {
        tabBarLabel: "Youtube Home",
        tabBarIcon: ({ focused }) => (
          <Image
            style={{
              height: 28,
              width: 28
            }}
            resizeMode="contain"
            source={
              focused
                ? require("./assets/img/ic_card_select.png")
                : require("./assets/img/ic_card.png")
            }
          />
        )
      }
    },
    Tab3: {
      screen: Tab3Screen,
      navigationOptions: {
        tabBarLabel: "QR",
        tabBarIcon: ({ focused }) => (
          <Image
            style={{
              height: 28,
              width: 28
            }}
            resizeMode="contain"
            source={
              focused
                ? require("./assets/img/ic_card_select.png")
                : require("./assets/img/ic_card.png")
            }
          />
        )
      }
    },
    Tab4: {
      screen: Tab4Screen,
      navigationOptions: {
        tabBarLabel: "Camera & Gallery",
        tabBarIcon: ({ focused }) => (
          <Image
            style={{
              height: 28,
              width: 28
            }}
            resizeMode="contain"
            source={
              focused
                ? require("./assets/img/ic_card_select.png")
                : require("./assets/img/ic_card.png")
            }
          />
        )
      }
    }

  },
  {
    initialRouteName: "Tab1"
  }
);

//เอาไว้ตกแต่ง navigation bar
TabStack.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  
 
  // You can do whatever you like here to pick the title based on the route name
  //เปลี่ยนชื่อ navigation bar ด้านบน
  const headerTitle = routeName;
 
  return {
    headerTitle,
    headerStyle: { backgroundColor: '#339CED'},
    headerTitleStyle: { color: "#fff" },

  };
};


//Scene
const AppStack = createStackNavigator(
  {   
    // Tab1: {screen: Tab1Screen}
    Tabs: { screen: TabStack },
    Detail: {screen: DetailScreen}, 
    Youtube: { screen: YoutubeScreen},
    Scan: {screen: ScanScreen}
  },
  {
      //Scene เริ่มต้น
    initialRouteName: "Tabs"
  }
);


//Scene
const AuthenStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Register: { screen: RegisterScreen },
  Login: {screen: LoginScreen}
}, {
  initialRouteName: 'Login'
})

// HOC
export default createAppContainer(
  createSwitchNavigator({
    AuthenScene: AuthenStack,
    AppScene: AppStack,
  }, {initialRouteName: 'AuthenScene'}));
