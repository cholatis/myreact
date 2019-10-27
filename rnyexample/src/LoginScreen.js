import React, { Component } from 'react'
import { Text, View, ScrollView, Image, Alert, TextInput, StyleSheet, TouchableHighlight } from 'react-native'
//import { TouchableHighlight } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { StackActions, NavigationActions, SwitchActions } from 'react-navigation';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
      
        }

        this.validAuthen()
    }

    async validAuthen() {
        const storedToken = await AsyncStorage.getItem("token")
        if(storedToken != null) {
            this.goHomeScreen()
        }
    }

    goHomeScreen() {
        // คือการทำไม่ให้มีปุ่ม back
        const resetAction = NavigationActions.navigate({
            routeName: 'AppScene',
            action: StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: "Tabs"})
                ]
            })
        });
        /*
        const resetAction = StackActions.reset({
            index: 0,
            //actions: [NavigationActions.navigate({ routeName: 'AppScene' })],
            actions: [NavigationActions.navigate({ routeName: 'AppScene',
            action: NavigationActions.navigate({ routeName: "Tabs"})
            })],
          });
        */
          this.props.navigation.dispatch(resetAction);        
    }

    onLoginPressed = async () => {
        const { username, password } = this.state
        const data = {username: username, password: password}

        axios.post('http://192.168.0.15:8082/api/v1/login', data)
        .then(async response => {
            const result = response.data
            Alert.alert(JSON.stringify(result))

            if(result.result == "success") {
                //เก็บข้อมูล token ไว้ใน asyncstorage
                await AsyncStorage.setItem("token", result.data)

                //ทำ alert บอกว่า sucess แล้วต้องรับค่า OK
                Alert.alert("Login successful", "",
                [
                    {text: 'OK', onPress: () => this.goHomeScreen()}
                ])
            }
            else {
                Alert.alert("Login failed")
            }
        })
        .catch(error => {
            Alert.alert(JSON.stringify(error))
        })
        //Alert.alert(`Username: ${username}, Password: ${password}`)

        /*
        let regUsername = await AsyncStorage.getItem('username')
        let regPassword = await AsyncStorage.getItem('password')

        if(regUsername == null || regPassword == null) {
            Alert.alert("Invalid account")
            return
        }

        if(regUsername == username && regPassword == password ) {
            Alert.alert("Login successful")
            this.props.navigation.navigate("AppScene")
        }
        else {
            Alert.alert("Invalid account")
        }
        */

    }

    onRegisterPressed = () => {
        Alert.alert("Register")
        this.props.navigation.navigate('Register')
    }
    render() {
        return (
            <ScrollView style={styles.scrollView} >

            <View style={styles.container}>
            <Image
                source={require('./assets/img/header_react_native.png')}
                resizeMode={'center'}
                style={styles.banner}
                />


                <TextInput 
                onChangeText={(text)=> this.setState({username: text})}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                autoCorrect={false}
                style={styles.input}
                placeholder="username" />

                <TextInput 
                onChangeText={(text)=> this.setState({password: text})}
                autoCapitalize={'none'}
                autoCorrect={false}
                style={styles.input}
                secureTextEntry={true}
                placeholder="password" />

                <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}> 
                        Login 
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                underlayColor={"#FF0"}
                onPress={this.onRegisterPressed.bind(this)}
                style={styles.registerButton}
                >
                    <Text style={styles.registerButtonText}> Don't have an account, Register? </Text>
                </TouchableHighlight>
            </View>
            
            </ScrollView>

        )
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
        padding: 10,
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
        backgroundColor: '#EB6663',
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

//export default LoginScreen;
