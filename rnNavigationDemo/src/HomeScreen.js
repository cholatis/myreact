import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onClickLogin = () => {
    this.props.navigation.navigate('Tab1')
  }

  onClickRegister = () => {
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column'}}>
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
