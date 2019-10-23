import React, { Component } from 'react'
import { Text, View, ScrollView, Image, Alert, TextInput, StyleSheet } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
      
        }
    }
    onLoginPressed = async () => {
        const { username, password } = this.state
        //Alert.alert(`Username: ${username}, Password: ${password}`)

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

                <TouchableHighlight
                onPress={this.onLoginPressed.bind(this)}
                style={styles.loginButton}
                >
                    <Text style={styles.loginButtonText}> Login </Text>
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

export default LoginScreen;
