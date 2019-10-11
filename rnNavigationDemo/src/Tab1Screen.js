import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class Tab1Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  } 

  async componentDidMount(){
    let username = await AsyncStorage.getItem("username")
    alert(username)
  }

  onClickDetail = () =>{

    let item = {title: "codemobiles", url: "www.codemobiles.com"}
    this.props.navigation.navigate('Detail', {item})
  }

  render() {
    return (
      <View>
        <Text> Tab1 </Text>
        <Button title="GO" onPress={this.onClickDetail}/>
      </View>
    );
  }
}
