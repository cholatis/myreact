import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

const PATH_TO_LOGO ='./assets/img/cmdev_icon.png'

class Tab3Screen extends Component {
    onClickScan = () => {
        this.props.navigation.navigate('Scan')
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Button title="Scan" onPress={this.onClickScan}/>
            <View style={styles.section}>
              <QRCode value='hello world' />
            </View>
            <View style={styles.section}>
              <QRCode
                value='hello world'
                size={200}
              />
            </View>
            <View style={styles.section}>
              <QRCode
                value='hello world'
                color='blue'
                backgroundColor='yellow'
              />
            </View>
            <View style={styles.section}>
              <QRCode
                value='hello world'
                logo={require(PATH_TO_LOGO)}
              />
            </View>
            <View style={styles.section}>
              <QRCode
                value='hello world'
                logo={require(PATH_TO_LOGO)}
                logoSize={50}
              />
            </View>
            <View style={styles.section}>
              <QRCode
                value='hello world'
                logo={require(PATH_TO_LOGO)}
                logoMargin={10}
              />
            </View>
            <View style={styles.section}>
              <QRCode
                value='hello world'
                logo={require(PATH_TO_LOGO)}
                logoBorderRadius={15}
              />
            </View>
               
          </ScrollView>
    
        )
    }
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      paddingTop: 15,
      paddingBottom: 15
    },
    section: {
      marginTop: 15,
      marginBottom: 15
    }
  });

export default Tab3Screen;
