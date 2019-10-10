/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// flex : 1 = 100% เต็มหน้าจอ
// flexDirection จะให้วางเรียงอย่างไร column เรียงบนลงล่าง row เรียงซ้ายไปขวา column-reverse เรียงจากล่างขึ้นบน row-reverse เรียงจากขวาไปซ้าย
//alignItems จัดส่วนภายในไว้แบบใด
// justifyContent อยากให้ content กระจุกตรงไหน
// flex: 0.5 จะครึ่งจอ 0.25 จะเป็น 1 ใน 4 ถ้าเอามาต่อกันแบบ flexDirection: column ก็จะลงข้างล่าง ถ้า row ก็จะเป็นแนวซ้ายไปขวา
// หรือถ้าเป็น view ใหญ่ มีค่าเป็น 1 ส่วนภายในจะเป็นสัดส่วน เช่น 0.1, 0.9 เพื่อรวมให้ได้ 1 เป็นต้น
// flexbox
// flex: dimension, flexDirection: row|column
// justifyContent: center แนวตั้ง|space-between เหมือนมี space อยู่ระหว่าง component, alignItems: center แนวนอน
// space-between, space-around, space-evenly จะถัวเฉลี่ยให้ space เท่าๆกัน, strech กระจายเต็ม (ห้ามมีกำหนด width, height ในตัว component ลูก)
class Component1 extends Component {
  render() {
    return(
      <View style={{flex: 1, flexDirection: 'column',backgroundColor: "#FF0000", alignItems:"center", justifyContent:'center'}}>
        <Text style={{ textAlign: 'center', color: '#FFFFFF'}}>Welcome to react native</Text>
      </View>
    );
  }
};


export default Component1;
