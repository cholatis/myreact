import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';

export default class Tab1Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // page load ตอนเข้าหน้า
  async componentDidMount() {
    let username = await AsyncStorage.getItem("username");
    alert (username);
  }

  onClickDetail = () => {
    let item = { title: 'go to detail', url: 'www.google.com'}
    this.props.navigation.navigate('Detail', {item})  //ต้องส่งเป็น object ต้องมี {}
  }

  render() {
    return (
      <View>
        <Text> Tab1Screen </Text>
        <Button title="GO" onPress={this.onClickDetail} />
      </View>
    );
  }
}
