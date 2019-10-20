import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Register </Text>
      </View>
    );
  }
}


RegisterScreen.navigationOptions = ({ navigation }) => {
    return {
      title: "Register",
      headerStyle: {
        backgroundColor: '#119CED'
      },
      headerTintColor: "#FFFFFF",
      headerTitleStyle: { color: "#fff" },
      headerBackTitle: " "
    };
  };