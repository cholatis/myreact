import React, { Component } from 'react'
import { Text, View, Image, FlatList, TouchableOpacity, ImageBackground, Alert, StyleSheet, ActivityIndicator } from 'react-native'
import { Card } from 'react-native-elements';
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

class UploadListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          imgs: [],
          isLoading: false,
          page: 1
        };
      }

        // component ที่ติดตั้งบนหน้าจอ หรือ show เรียบร้อยแล้ว
        async componentDidMount() {
            //this.feedUpload();
            this.setState({isLoading: true}, this.feedPage);
            //Alert.alert('component')
        }

      feedPage = async () => {
        const token = await AsyncStorage.getItem("token")
        
        Axios.get(global.MyURL+'/api/v1/feedpage?rowno=10&page='+this.state.page, 
//        Axios.get('http://192.168.0.15:8082/api/v1/feedpage?rowno=10&page='+this.state.page, 
        {
          headers: {'x-access-token': token}
        })
        .then(response => {
            Alert.alert(JSON.stringify(response.data))
          const result = response.data.page
          //Alert.alert(JSON.stringify(result))
          this.setState({ imgs: this.state.imgs.concat(result), isLoading: false })
          console.log("imgs: "+imgs.length)
        })
        .catch(error => {
          Alert.alert( JSON.stringify(error))
          console.log(error)
        });        

      }

      feedUpload = async ()  => {
        //this.state = { feedData: "loading..."}
        const token = await AsyncStorage.getItem("token")
        this.setState({isLoading: true})
    
        Axios.get(global.MyURL+'/api/v1/feedupload', 
        {
          headers: {'x-access-token': token}
        })
        .then(response => {
            Alert.alert(JSON.stringify(response.data))
          const result = response.data.upload
          //Alert.alert(JSON.stringify(result))
          this.setState({ imgs: result })
        })
        .finally(() => this.setState({isLoading: false}))
        .catch(error => {
          Alert.alert( JSON.stringify(error))
          console.log(error)
        });
      }

      renderItemList = (item) => {
        //Alert.alert(JSON.stringify(item))
        return(
          <TouchableOpacity 
            setOpacityTo={50} //พอ click แล้วจะมี hilight ประมาณ 50%
            
          >
          <Card containerStyle={{overflow: 'hidden', flexDirection: 'column', marginBottom: 20, borderRadius: 8, padding: 0}}>
          <View style={{flexDirection: 'row', marginBottom: 16, height: 45, alignItems: 'center'}} >
              <Image source={require('./assets/img/avatar.png')} style={{ width: 45, height: '100%', marginRight: 16}} />
              <View style ={{flexDirection: 'column'}} >
                <Text style={{fontWeight: '700'}}>{item.id}</Text>
                <Text  style={{fontWeight: '100'}}>{item.orgname}</Text>
              </View>
            </View>
            <Image source={{uri: global.MyURL+"/"+item.servername}} style={{width: '100%', height: 200}} />
            
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

      handleLoadMore = async () => {
        //Alert.alert('handleLoadMore');
        const token = await AsyncStorage.getItem("token")
        Axios.get(global.MyURL+'/api/v1/feedcount', 
        {
          headers: {'x-access-token': token}
        })
        .then(response => {
          //  Alert.alert(JSON.stringify(response.data))
          const result = response.data.cnt
          Alert.alert(this.state.imgs.length + " vs cnt "+JSON.stringify(result[0].cnt))
          if(this.state.imgs.length < result[0].cnt) {
            this.setState(
              {page: this.state.page+1, isLoading: true},
              this.feedPage
            );
          }
  
        })
        .catch(error => {
          Alert.alert( JSON.stringify(error))
          console.log(error)          
        });

      }

      handleReload = () => {
        Alert.alert('handleReload');
        this.setState(
          {imgs: [], page: 1, isLoading: false},
          this.feedPage
        );
      }

      renderFooter = () => {
        return(
          this.setState.isLoading ?
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View> : null
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
          //Invariant violation: Element type is invalid ในที่นี้มาจาก Card มัน import คนละที่กับ react-native
          data={this.state.imgs}
          renderItem={({item}) => this.renderItemList(item)}
          refreshing={this.state.isLoading}
          onRefresh={this.handleReload}
          keyExtractor={(i, k) => k.toString()}
          //load more
          onEndReached={this.handleLoadMore}
          ListFooterComponent={this.renderFooter}
        />
        </ImageBackground>
      </View>
        )
    }
}

const styles =StyleSheet.create({
  loader: {
    marginTop: 10,
    alignItems: 'center'
  }
})

export default UploadListScreen;
