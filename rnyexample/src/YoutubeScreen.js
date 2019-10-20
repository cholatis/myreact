import React, { Component } from 'react'
import { Text, View } from 'react-native'
import YouTube from 'react-native-youtube';

export default class YoutubeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.navigation.getParam("item")
        };
    }

    componentDidMount(){
        let item = this.props.navigation.getParam("item")
        alert(JSON.stringify(item))
    }
    render() {
        return (
            <View>
                <Text> YoutubeScreen </Text>
                <YouTube
                apiKey="YOUR_API_KEY"
                videoId={this.state.item.id} // The YouTube video ID
                play // control playback of video with true/false
                fullscreen // control whether the video should play in fullscreen or inline
                loop // control whether the video should loop when ended
                onReady={e => this.setState({ isReady: true })}
                onChangeState={e => this.setState({ status: e.state })}
                onChangeQuality={e => this.setState({ quality: e.quality })}
                onError={e => this.setState({ error: e.error })}
                style={{ alignSelf: 'stretch', height: 300 }}
                />
            </View>
        )
    }
}
