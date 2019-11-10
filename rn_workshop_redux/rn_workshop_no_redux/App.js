import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Image } from 'react-native'
import loadData from './api'
class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            isFetching: false,
            isError: false
        }
    }

    fetchData(){
        // fetching stage
        this.setState(oldState=>{return {
            isFetching: true
        }})

        loadData()
        .then(result=>{
            this.setState(oldState=>{return {
                isFetching: false,
                data: result
            }})
        })
        .catch(error=>{
            this.setState(oldState=>{return {
                isFetching: false,
                isError: true
            }})
        })            
    }

    render() {

        const {
            container,
            header,
            title,
            image,
            content
        } = styles



        return (
            <View style={container}>
                <Image resizeMode='center' style={image} source={{ uri: 'http://www.codemobiles.com/biz/images/codemobiles_logo.png?ref=10' }} />
                <Text style={header}>Redux Example</Text>
                <Button title='Load' onPress={this.fetchData.bind(this)} />
                <View style={content}>
                    {
                        this.state.isFetching && <Text>Loading</Text>
                    }
                    {
                        !this.state.isFetching && this.state.data.length ? (
                            this.state.data.map((person, i) => {
                                return <View key={i} >
                                    <Text style={title}>Name: {person.name}</Text>
                                    <Text>Position: {person.position}</Text>
                                </View>
                            })
                        ) : null
                    }
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        marginTop: 10
    },
    image: {
        height: 50,
        width: '100%',
    },
    header: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 30

    },
    title: {
        textAlign: 'left',
        fontWeight: 'bold',
        marginTop: 10
    },
    content: {
        marginTop: 50
    }
})

export default App

