import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useLayoutEffect, useState}from 'react';
import { StyleSheet, Text, View,SafeAreaView, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [txt, setTxt] = useState('안녕하세요')

  //처음 자동으로 실행하게 해주는 hook : useEffect
  useEffect(() => {
    //console.log('프로그램 시작');   
    loadData();
  }, []);



  // 데이터를 app에 저장
  const saveData = async (value) => {
    try {
      await AsyncStorage.setItem('assa', value)
      //await : 내용이 얼마나 될지 모르니까 비동기통신을 기다림
      //AsyncStorage.setItem('@storage_Key', value) :@storage_Key 아무변수나 넣어도 됨, but 불러올때도 같은 이름이여야함 
      console.log('저장');

    } catch (e) {
      // saving error
    }
  }

  // 데이터를 app에서 불러옴
  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('assa')
      console.log('불러오기');

      if(value !== null) {
        // value previously stored
        setTxt(value);
      }
    } catch(e) {
      // error reading value
    }
  }



  return (
    <View style={{ flex:1, backgroundColor:'#fc0'}}>
      <SafeAreaView style={{ flex:1,  }}>
        <StatusBar style="auto" />
        <View style={{padding:10, flexDirection:'row', 
                      alignItems:'center', justifyContent:'space-between'}}>
          <Button title="저장" onPress={()=>saveData(txt)}></Button>
          <Text style={{fontSize:18}}> 메모장 </Text>
          <Button title="불러오기"  onPress={()=>loadData()}></Button>
        </View>
      <View style={{backgroundColor:'#eeeeee', flex:1, padding:10}}>
        <TextInput value={txt} 
                    multiline //여러줄 입력가능하도록 하는 것
                   onChangeText={txt => setTxt(txt)}//textInput에서 값을 바꿀수 있도록
                  />
      </View>
    </SafeAreaView>
   </View>
  );
}

