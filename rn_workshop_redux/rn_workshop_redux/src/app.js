import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux';

import {fetchData} from './actions'

class App extends Component {

    render() {

        const {
            container,
            header,
            title,
            image,
            content
        } = styles

        props = this.props

        return (
            <View style={container}>
                <Image resizeMode='center' style={image} source={{ uri: 'http://www.codemobiles.com/biz/images/codemobiles_logo.png?ref=10' }} />
                <Text style={header}>Redux Example</Text>
                <Button title='Load' onPress={()=> props.fetchData()} />
                <View style={content}>
                    {
                        props.fetchReducer.isFetching && <Text>Loading</Text>
                    }
                    {
                        !props.fetchReducer.isFetching && props.fetchReducer.data.length ? (
                            props.fetchReducer.data.map((person, i) => {
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

// Used to add reducer's state into the props
const mapStateToProps = (state) => ({
  fetchReducer: state.fetchReducer
})

// Used to add action (dispatch) into the props
const mapDispatchToProps = {
  fetchData
};


//export default App
export default connect(mapStateToProps, mapDispatchToProps)(App)

