
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const GameOver = ({route, navigation}) => {
  const [points, setPoints] = useState([{}]);

  
  const getData = async () => {
    AsyncStorage.getItem('points', (err,result) => {
      if (result !== null) {
        //console.log('Data found', result);
        setPoints(JSON.parse(result))

      }
})
  }

  useEffect(() => {
   getData();
  });

<Text>Leaderboard {JSON.stringify(points)}</Text>
    return(
    <View style={styles.scoreboard}>
        <Text>Game Over. Your score is {route.params.points}</Text>
          <View>
          {
          points
          .sort((a,b) => a.points < b.points ? 1: -1)
          .map((entry,index) => {
            return(
            <View>
              <Text>{index+1}</Text> 
          <Text>naaame {entry.username}</Text>
          <Text>poooints {entry.points}</Text>
          </View>
          )})
        }
        </View>

        <Button
        title="Go back to menu"
        onPress={() => navigation.navigate('Start')}
      />
    </View>
    );
  };

  
const styles = StyleSheet.create({
  scoreboard: {
    backgroundColor: '#B8E994',
  },
});
   
  export default GameOver;