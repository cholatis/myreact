import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';


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

  //original fetch
  fetchSomething = () => {
    fetch('https://facebook.github.io/react-native/movies.json')
    .then(result => result.json())
    .then(jsonResult => {
      alert("First movie in array: " + jsonResult.movies[0].title);
    })
    .catch(err => {
      console.log(err);
    })
  }

  fetchAxios = () => {
    axios.get('https://facebook.github.io/react-native/movies.json')
    .then(response => {
      alert(response.data.movies[0].title)
    })
    .catch(err=> {
      console.log(err);
    });
  }

  callGet = () => {
    const data = {
      username: 'admin',
      password: 'password',
      type: 'foods'
    }
    axios.get('http://codemobiles.com/adhoc/youtubes/index_new.php', { params: data })
    .then(response => {
      alert(response.data.youtubes[0].title)
    })
    .catch(err => {
      alert(JSON.stringify(err));
    })
  }

  callPost = () => {
    const data = new FormData();
    data.append('username', 'admin');
    data.append('password', 'password');
    data.append('type', 'foods');
    axios.post('http://codemobiles.com/adhoc/youtubes/index_new.php', data)
    .then(response => {
      alert(response.data.youtubes[1].title);
    })
    .catch(err => {
      alert(JSON.stringify(err));
    })
  }

  render() {
    return (
      <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around"
      }}
      >
        <Text> Tab1 </Text>
        <Button title="GO" onPress={this.onClickDetail}/>

        <Button title="fetch" onPress={this.fetchSomething}/>
        <Button title="fetch with axios" onPress={this.fetchAxios}/>

        <Button title="call get" onPress={this.callGet}/>
        <Button title="call post" onPress={this.callPost}/>
      </View>
    );
  }
}
