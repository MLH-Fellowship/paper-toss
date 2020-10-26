
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const GameOver = ({route, navigation}) => {
  const [points, setPoints] = useState([]);
  
  const getData = async () => {
    AsyncStorage.getItem('points', (err,result) => {
      if (result !== null) {
        console.log('Data found', result);
        setPoints(result)
      }
})
  }

  useEffect(() => {
   getData();
  });


//{/*route.params.points*/}
// {points}


    return(
    <View>
        <Text>Game Over. Your score is {route.params.points}</Text>
        <Text>Leaderboard</Text>
        

        <Button
        title="Go back to menu"
        onPress={() => navigation.navigate('Start')}
      />
    </View>
    );
  };
   
  export default GameOver;