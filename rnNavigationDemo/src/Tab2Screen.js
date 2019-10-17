import React, { Component } from 'react';
import { View, Text, FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import Axios from 'axios';

class Tab2Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      youtubes: []
    };
  }

  // component ที่ติดตั้งบนหน้าจอ หรือ show เรียบร้อยแล้ว
  componentDidMount() {
    this.feedYoutubes();

  }

  feedYoutubes = () => {
    const data = {
      username: 'admin',
      password: 'password',
      type: 'foods'
    }
    const url = 'http://codemobiles.com/adhoc/youtubes/index_new.php';
    Axios.get(url, {params: data})
    .then(response => {
      this.setState({ youtubes: response.data.youtubes })
    })
    .catch(err => {
      alert(JSON.stringify(err));
    })
  }

  onClickItem= (item) => {
    alert(item.title)
  }

  renderItemList = (item) => {
    return(
      <TouchableOpacity 
        setOpacityTo={50} //พอ click แล้วจะมี hilight ประมาณ 50%
        onPress={() => this.onClickItem(item)}
      >
      <Card containerStyle={{overflow: 'hidden', flexDirection: 'column', marginBottom: 20, borderRadius: 8, padding: 0}}>
        <View style={{flexDirection: 'row', marginBottom: 16, height: 45, alignItems: 'center'}} >
          <Image source={{uri: item.avatar_image}} style={{ width: 45, height: '100%', marginRight: 16}} />
          <View style ={{flexDirection: 'column'}} >
            <Text style={{fontWeight: '700'}}>{item.title}</Text>
            <Text  style={{fontWeight: '100'}}>{item.subtitle}</Text>
          </View>
        </View>
        <Image source={{uri: item.youtube_image}} style={{width: '100%', height: 200}} />
      </Card>
      </TouchableOpacity>
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
          //data={[1,2,3,4]}
          data={this.state.youtubes}
          renderItem={({item}) => this.renderItemList(item)}
        />
        </ImageBackground>
      </View>
    );
  }
}


export default Tab2Screen;
