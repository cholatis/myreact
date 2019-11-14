import React, { Component } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions} from 'react-navigation';
import axios from 'axios';
import {httpClient} from './HttpClient';


export default class Tab1Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      feedData: ""
    };

    this.feed();
    
    httpClient
    .get('/feed')
    .then(result => {
      Alert.alert(JSON.stringify(result.data));
      //Alert.alert(global.MyURL);
    })
  } 

  logout = async () => {
    await AsyncStorage.removeItem("token")

    const resetAction = NavigationActions.navigate({
        routeName: 'AuthenScene',
        action: StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: "Login"})
            ]
        })
    });

    this.props.navigation.dispatch(resetAction);       
  }

  async feed() {
    this.state = { feedData: "loading..."}
    const token = await AsyncStorage.getItem("token")

    axios.get(global.MyURL+'/api/v1/feed', 
    {
      headers: {'x-access-token': token}
    })
    .then(response => {
      const result = response.data.result
      this.setState({ feedData: result })
    })
    .catch(error => {
      Alert.alert( JSON.stringify(error))
      console.log(error)
    });
  }

  async componentDidMount(){
    let username = await AsyncStorage.getItem("username")
    //alert(username)
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
        <View style={styles.container}>
          <Text>{this.state.feedData}</Text>
          <Button title="Logout" onPress={this.logout}/>
        </View>
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

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 30,
    paddingTop: 80
  },
  banner: {
    height: 90,
    width: '100%'
  },
  input: {
    height: 50,
    width: '100%',
    marginTop: 10,
    padding: 4,
    borderRadius: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec33'
  },
  loginButton: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 40,
    borderRadius: 10,
    justifyContent: 'center'
  },
  registerButton: {
    height: 50,
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  loginButtonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  registerButtonText: {
    fontSize: 18,
    color: '#0007',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
    marginBottom: 40
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  success: {
    color: 'green',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

