import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, AsyncStorage } from 'react-native';

//import AsyncStorage from '@react-native-community/async-storage';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

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

    this.props.navigation.navigate('AppScene')  //เป็นการ switch scene จะไม่มีปุ่ม back เพราะอยู่คนละ scene 
  }

  onClickRegister = () => {
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column', justifyContent: 'space-around'}}>
        <Text> HomeScreen </Text>
        <Button title="Login" onPress={this.onClickLogin()} />
        <Button title="Register" onPress={this.onClickRegister()} />
      </View>
    );
  }
}

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
      title: "Home",
      headerStyle: {
          backgroundColor: '#119CED'
      },
      headerTintColor: "#FFFFFF",
      headerTitleStyle: { color: "#FFFFFF"},
      headerBackTitle: " ",
      headerRight: (
          <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => alert("Home")}
              style={{ padding: 10 }}
          >
              <Image source={require('./assets/img/avatar.png')} style={{width:30, height:30}} />
          </TouchableOpacity>
      )
  };
};
