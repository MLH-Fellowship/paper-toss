import { StatusBar } from 'expo-status-bar';
import React, {PureComponent} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { GameEngine } from "react-native-game-engine";
import { Item, Bin } from "./renderers";
import { MoveItem, Collision } from "./systems";
//import Constants from './Constants';
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;


export default class App extends PureComponent  {
  constructor() {
    super();
    this.state ={
      running: true,
      points: 0,
      item: "can"
    }
  }

  render() {
  return (
    <View style={styles.container}>
      <Text>TIME!</Text>
      <GameEngine
        style={styles.container}
        systems={[MoveItem, Collision]}
        entities={{
          1: { position: [WIDTH/2, HEIGHT-100], item: this.state.item, renderer: <Item/>}, //-- Notice that each entity has a unique id (required)
          2: {position: [WIDTH - 40, HEIGHT/2], category: "paper", renderer: <Bin/>},
          3: {position: [WIDTH - 40, HEIGHT/4], category: "glass", renderer: <Bin/>},
          4: {position: [WIDTH/8, HEIGHT/2], category: "organic",renderer: <Bin/>},
          5: {position: [WIDTH/8, HEIGHT/4], category: "plastic", renderer: <Bin/>},
          6: {position: [WIDTH/2, HEIGHT/6], category: "trash", renderer: <Bin/>},

        }}>
 
        <StatusBar hidden={true} />
 
      </GameEngine>
      <StatusBar style="auto" />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});