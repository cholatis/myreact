import React, { Component } from 'react'
import {
  StyleSheet,
  Alert,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Text,
  View,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
//IP address: 192.168.0.15

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  async onRegisterPressed() {
    try {
      const {username, password} = this.state

      //await ให้หยุดรอ
      //await AsyncStorage.setItem('username', username)
      //await AsyncStorage.setItem('password', password)

      const data = { username: username, password: password }

      // ห้ามใช้ localhost ต้องใช้ IP จริง
      axios.post('http://192.168.0.15:8082/api/v1/register',
      data)
      .then((response) => {
        const result = response.data.result
        //Alert.alert(JSON.stringify(result))

        if(result == "success") {
          Alert.alert("Register successful", "",
          [
            {text: 'OK', onPress: () => this.props.navigation.goBack()}
          ])
        }
        else {
          Alert.alert("Register failed")
        }
      })


    } catch (error) {
        console.log(error)
        Alert.alert(JSON.stringify(error))
    }

//    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <ScrollView style={styles.scrollView} >
      <View style={styles.container}>

        <Text style={styles.heading}>
            Register
        </Text>
          <TextInput
              onChangeText={(text) => this.setState({ username: text })}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              autoCorrect={false}
              style={styles.input} placeholder="Email">
          </TextInput>
          <TextInput
              onChangeText={(text) => this.setState({ password: text })}
              style={styles.input}
              autoCorrect={false}              
              placeholder="Password"
              autoCorrect={false}
              secureTextEntry={true}>
          </TextInput>
          <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.registerButton}>
              <Text style={styles.registerButtonText}>
                  Register
        </Text>
          </TouchableHighlight>
          <Text style={styles.error}>
              {this.state.error}
          </Text>
      </View>
      </ScrollView>
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

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: '#F5FCFF',
  },
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      padding: 10,
      paddingTop: 80
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
  registerButton: {
      height: 50,
      backgroundColor: '#EB6663',
      alignSelf: 'stretch',
      marginTop: 40,
      borderRadius: 10,
      justifyContent: 'center'
  },
  registerButtonText: {
      fontSize: 22,
      color: '#FFF',
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
