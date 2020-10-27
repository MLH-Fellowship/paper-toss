
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


//{/*route.params.points*/}
// {points}
/*
  results(() => {
    <View>
    {points.map(entry => {
      <View>
      <Text>{entry.username}</Text>
      <Text>{entry.points}</Text>
      </View>
    })}
    </View>
  })*/
 //      <div>{persons.map(person => <div key={person.name}> {person.name} </div>)}</div>
<Text>Leaderboard {JSON.stringify(points)}</Text>
    return(
    <View>
        <Text>Game Over. Your score is {route.params.points}</Text>
          {points.map(entry => {
            return(
            <View>
          <Text>naaame {entry.username}</Text>
          <Text>poooints {entry.points}</Text>
          </View>
          )})
        }
    
             

        <Button
        title="Go back to menu"
        onPress={() => navigation.navigate('Start')}
      />
    </View>
    );
  };
   
  export default GameOver;