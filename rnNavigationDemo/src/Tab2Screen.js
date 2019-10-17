import React, { Component } from 'react';
import { View, Text, FlatList, Image, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';

class Tab2Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderItemList = (item) => {
    return(
      <View>
      <Card containerStyle={{overflow: 'hidden', flexDirection: 'column', marginBottom: 20, borderRadius: 8, padding: 0}}>
        <View style={{flexDirection: 'row', marginBottom: 16, height: 45, alignItems: 'center'}} >
          <Image source={require('./assets/img/avatar.png')} style={{ width: 45, height: '100%', marginRight: 16}} />
          <View style ={{flexDirection: 'column'}} >
            <Text style={{fontWeight: '700'}}>Title</Text>
            <Text  style={{fontWeight: '100'}}>Subtitle</Text>
          </View>
        </View>
        <Image source={require('./assets/img/loadingimg.png')} style={{width: '100%', height: 200}} />
      </Card>
      </View>
    )
  }

  renderHeaderList = () => {
    return(
      <Image 
      resizeMode='contain'
      style={{width: '100%', height: 70, marginBottom: 20 }} 
      source={ require('./assets/img/header_react_native.png')} />
    ) 
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
        style={{width: '100%', height: '100%'}} 
        source={require('./assets/img/bg.png')}>
        <FlatList 
          ListHeaderComponent = { this.renderHeaderList}
          style={{marginTop : 10, marginLeft: 15, marginRight: 15}}
          data={[1,2,3,4]}
          renderItem={({item}) => this.renderItemList(item)}
        />
        </ImageBackground>
      </View>
    );
  }
}

export default Tab2Screen;
