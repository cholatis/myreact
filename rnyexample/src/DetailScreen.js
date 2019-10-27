import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
      let item = this.props.navigation.getParam("item")
      alert(JSON.stringify(item))
  }

  onClickBack = () => {
    //this.props.navigation.navigate("Home"); //refer to name of navigation stack
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}> 
        <View style={{flex: 0.2}} >
        <Text> DetailScreen </Text>
        <Button title="Back" onPress={this.onClickBack}></Button>
        </View>
        <View style={{flex: 0.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
        <Avatar
          size="small"
          rounded
          title="MT"
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Avatar
          size="medium"
          title="BP"
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Avatar
          size="large"
          title="LW"
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Avatar
          size="xlarge"
          rounded
          title="CR"
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
      </View>
      </View>
    );
  }
}



DetailScreen.navigationOptions = ({ navigation }) => {
    return {
      title: "Detail",
      headerStyle: {
        backgroundColor: '#119CED'
      },
      headerTintColor: "#FFFFFF",
      headerTitleStyle: { color: "#fff" },
      headerBackTitle: " ",
    };
  };
