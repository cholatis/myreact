import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity, NativeModules, Alert } from 'react-native'
import axios from 'axios';

var ImagePicker = NativeModules.ImageCropPicker

export default class Tab4Screen extends Component {
    constructor() {
        super();

        this.state = {
            image: null
        }
    }
/*
    openCamera() {

        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        }).then(image => {
          console.log(image);
        });
    
      }

    pickSingleWithCamera(cropping) {
        ImagePicker.openCamera({
          cropping: cropping,
          width: 500,
          height: 500,
          cropperCircleOverlay: true, //ตอนจะ crop ให้เป็นวงกลม
          includeExif: true,
        }).then(image => {
          console.log('received image', image);
          this.setState({
            image: { uri: image.path, width: image.width, height: image.height }
          });
        }).catch(e => alert(e));
      }
*/
pickSingleWithCamera(cropping, mediaType='photo') {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime}
      });
    }).catch(e => alert(e));
  }

/*
      pickSingle = (cropit, circular = false) => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: cropit,
          cropperCircleOverlay: circular,
          compressImageMaxWidth: 640,
          compressImageMaxHeight: 480,
          compressImageQuality: 0.5,
          compressVideoPreset: 'MediumQuality',
          includeExif: true,
        }).then(image => {
          console.log('received image', image);
          this.setState({
            image: { uri: image.path, width: image.width, height: image.height, mime: image.mime }
          });
        }).catch(e => {
          console.log(e);
          Alert.alert(e.message ? e.message : e);
        });
      }
*/
pickSingle(cropit, circular=false, mediaType) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime}
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }
      renderImage(image) {
        return <Image style={{ width: null, height: 300, resizeMode: 'cover' }} source={image} />
      }

      upload = () => {
          //Alert.alert(this.state.image.mime)
          const urires =this.state.image.uri.split('/');
          

          const data = new FormData();
          data.append('username', 'admin');
          data.append('password', '1234');
          data.append('userfile', {
              uri: this.state.image.uri,
              type: this.state.image.mime,
              name: urires[urires.length - 1]
          });

          
          axios.post('http://192.168.0.15:8082/api/v1/uploads', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
          .then(response => {
              const result = response.data
              Alert.alert(JSON.stringify(result))
  
          })
          .catch(error => {
              Alert.alert(JSON.stringify(error))
          })
          
/*
          fetch('http://192.168.0.15:8082/api/v1/uploads', {
            method: 'POST',
            body: data
          })
          .then(res => res.json())
          .then(res => {
            Alert.alert(res.result);
          })
*/
      }

      viewAll = () => {
        this.props.navigation.navigate('Upload')
      }

    render() {
        return (
            <ScrollView style={styles.scrollView} >
            <View style={styles.container}>
            {this.state.image ? <Text>{this.state.image.uri} {this.state.image.mime}</Text> : null}
            {this.state.image ? 
                <TouchableOpacity onPress={() => this.upload()} style={styles.button}>
                    <Text style={styles.text}>Upload</Text>
                </TouchableOpacity>
                : null
            }


            {this.state.image ? this.renderImage(this.state.image) : null}
            
            <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={styles.button}>
            <Text style={styles.text}>Select Single Image With Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)} style={styles.button}>
            <Text style={styles.text}>Select Single With Camera With Cropping</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.pickSingle(false)} style={styles.button}>
            <Text style={styles.text}>Select Single</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.viewAll()} style={styles.button}>
            <Text style={styles.text}>View All</Text>
            </TouchableOpacity>
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
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
      padding: 10
    },
    button: {
        height: 50,
        backgroundColor: '#EB6663',
        alignSelf: 'stretch',
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'center'
    },
    text: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    }
  });
  
