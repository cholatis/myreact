import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';


export default class HomeScreen extends Component {
  //onClickLogin = () => {}
  onClickLogin = async () => {
    //this.props.navigation.navigate('Tab1')

    //การจะส่งข้อมูลจะต้องบันทึกข้อมูลก่อนที่จะ navigate
    // จะ return ข้อมูลในลักษณะ promise
    await AsyncStorage.setItem("username", "cholatis")

    // กรณ๊ไม่ใช้ await
    // AsyncStorage.setItem('username', 'cholatis').then(() => {
    //  this.props.navigation.navigate('AppScene')
    //});

    
    this.props.navigation.navigate("AppScene")
  };

  onClickRegister = () => {
    this.props.navigation.navigate("Register");
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around"
        }}
      >
        <Button title="Login" onPress={this.onClickLogin} />
        <Button title="Register" onPress={this.onClickRegister} />
      </View>
    );
  }
}

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "CodeMobiles",
    headerStyle: {
      backgroundColor: "#119CED"
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: { color: "#fff" },
    headerBackTitle: " ",
    headerRight: (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => alert("www.codemobiles.com")}
        style={{ padding: 10 }}
      >
        <Image
          source={require("./assets/img/avatar.png")}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    )
  };
};
