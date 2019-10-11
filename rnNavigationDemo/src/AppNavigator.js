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
import DetailScreen from "./DetailScreen";


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
    Tab2: {
      screen: Tab2Screen,
      navigationOptions: {
        tabBarLabel: "Tab2",
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
    Detail: {screen: DetailScreen}
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
}, {
  initialRouteName: 'Home'
})

// HOC
export default createAppContainer(
  createSwitchNavigator({
    AuthenScene: AuthenStack,
    AppScene: AppStack,
  }, {initialRouteName: 'AuthenScene'}));
