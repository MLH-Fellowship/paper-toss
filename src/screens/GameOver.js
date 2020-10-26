
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const GameOver = ({route, navigation}) => {
  const [points, setPoints] = useState(0);
  
  const getData = async () => {
    let value = '';
    try {
      value = await AsyncStorage.getItem('points') || 'none';
      setPoints(value);
      if(value !== null) {
        console.log(value);
      }
    } catch(e) {
      console.log(e.message);
      alert("can't read data");
    }
    return value;
  }

  useEffect(() => {
   getData();
  });


//{/*route.params.points*/}
// {points}


    return(
    <View>
        <Text>Game Over. Your score is {points}</Text>
        <Button
        title="Go back to menu"
        onPress={() => navigation.navigate('Start')}
      />
    </View>
    );
  };
   
  export default GameOver;