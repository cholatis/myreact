import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, NativeModules } from 'react-native'

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
        return <Image style={{ width: null, height: 400, resizeMode: 'cover' }} source={image} />
      }

    render() {
        return (
            <View style={styles.container}>
            {this.state.image ? <Text>{this.state.image.uri}</Text> : null}
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

          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
    }
  });
  
