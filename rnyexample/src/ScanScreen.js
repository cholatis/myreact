import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
    Alert
  } from 'react-native';
  
  import QRCodeScanner from 'react-native-qrcode-scanner';
  
export default class ScanScreen extends Component {
    onSuccess = (e) => {
      /*Linking
        .openURL(e.data)
        .catch(err => console.error('An error occured', err));
    */
        Alert.alert(
            'Alert Title',
            e.data,
            [
            { text: 'Close', onPress: () => this.scanner.reactivate(), style: 'cancel' },
            ],
            { cancelable: false }
        )

    }

    scanAgain = ()=> {
        this.scanner.reactivate();
    }    
    
    render() {
      return (
        <QRCodeScanner
            ref={(node) => { this.scanner = node }}
          onRead={this.onSuccess.bind(this)}
          //flashMode={QRCodeScanner.Constants.FlashMode.torch}      
          topContent={
            <Text style={styles.centerText}>
              Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
            </Text>
          }
          bottomContent={
            <TouchableOpacity onPress={this.scanAgain} style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          }
        />
      );
    }
  }
  
  const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777',
    },
    textBold: {
      fontWeight: '500',
      color: '#000',
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
      padding: 16,
    },
  });
  

ScanScreen.navigationOptions = ({ navigation }) => {
    return {
      title: "QR Scanner",
      headerStyle: {
        backgroundColor: '#119CED'
      },
      headerTintColor: "#FFFFFF",
      headerTitleStyle: { color: "#fff" },
      headerBackTitle: " ",
    };
  };