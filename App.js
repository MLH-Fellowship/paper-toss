import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Game from './src/screens/Game';
import Start from './src/screens/StartScreen';
import GameOver from './src/screens/GameOver';

 
const RootStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown:false}}>
        <RootStack.Screen name="Start" component={Start} />
        <RootStack.Screen name="Game" component={Game} />
        <RootStack.Screen name="GameOver" component={GameOver} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;