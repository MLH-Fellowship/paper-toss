import { StatusBar } from 'expo-status-bar';
import React, {PureComponent} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Dimensions, Alert, Button} from 'react-native';
import { GameEngine } from "react-native-game-engine";
import { Item, Bin, Timer } from "../renderers";
import { MoveItem, Collision } from "../systems";
import Constants from './../Constants';
const WIDTH = Constants.WIDTH;
const HEIGHT = Constants.HEIGHT;


export default class Game extends React.Component  {
  constructor() {
    super();
    this.engine = null;

    this.state ={
      running: true,
      points: 0,
      updateTimer: 0,
      item: "can" //random
    }
  }

  storeData = async (value) => {
    try {
      console.log("saved");
      alert("Saved!");
      return await AsyncStorage.setItem('points', value);
      
    } catch (e) {
      console.log("can't save");
      alert("Failed to save the data to the storage");
    }
  }

  onEvent = (e) => {
    if (e.type=='game-over') {
      this.storeData(this.state.points);
      this.setState({
        running: false
      });
    }
 
    if (e.type == 'correct') {
      this.setState({
        points: this.state.points+10
      })
    }
    if (e.type=='wrong') {
      this.setState({
        points: this.state.points-10
      });
    }
  }

  onChangeTimer = () => {   
    this.setState({ running: false });
  }

  reset = () => {
    this.setState({
        running: true,
        points: 0,
        updateTimer: this.state.updateTimer+1
    });
}



//
   /* componentDidMount() {
        if (this.props.route.params.startAgain==true)
        this.reset();
    }*/
  
  render() {
  return (
    <View style={styles.container}>
      <Text style={styles.points}>POINTS: {this.state.points}</Text>
      <Timer key = {this.state.updateTimer} onChange={this.onChangeTimer}/>
      <GameEngine
      ref={(ref) => { this.engine = ref; }}
        style={styles.container}
        running = {this.state.running}
        onEvent = {this.onEvent}
        systems={[MoveItem, Collision]}
        entities={{
          1: {position: [WIDTH/2, HEIGHT-100], item: this.state.item, renderer: <Item/>}, //-- Notice that each entity has a unique id (required)
          2: {position: [WIDTH-125, HEIGHT/3], category: "paper", renderer: <Bin/>},
          3: {position: [WIDTH-55, HEIGHT/3], category: "glass", renderer: <Bin/>},
          4: {position: [WIDTH/3.7, HEIGHT/3], category: "organic",renderer: <Bin/>},
          5: {position: [WIDTH/16, HEIGHT/3], category: "plastic", renderer: <Bin/>},
          6: {position: [WIDTH/2.1, HEIGHT/3], category: "trash", renderer: <Bin/>},
          // Clouds
          7: {position: [WIDTH/2.3, HEIGHT/7], category: "cloud", renderer: <Bin/>},
          8: {position: [WIDTH/2, HEIGHT/8], category: "cloud", renderer: <Bin/>},
          9: {position: [WIDTH/1.7, HEIGHT/6.8], category: "cloud", renderer: <Bin/>},
          10: {position: [WIDTH-90, HEIGHT/20], category: "cloud", renderer: <Bin/>},
          11: {position: [WIDTH-60, HEIGHT/30], category: "cloud", renderer: <Bin/>},
          12: {position: [WIDTH-40, HEIGHT/22], category: "cloud", renderer: <Bin/>},
          13: {position: [WIDTH/5, HEIGHT/12], category: "cloud", renderer: <Bin/>},
          14: {position: [WIDTH/22, HEIGHT/12], category: "cloud", renderer: <Bin/>},
          15: {position: [WIDTH/10, HEIGHT/14], category: "cloud", renderer: <Bin/>},
          // Floor
          16: {position: [WIDTH/10, HEIGHT/2.2], category: "floor", renderer: <Bin/>},
          17: {position: [WIDTH/1.2, HEIGHT/2.2], category: "floor", renderer: <Bin/>},
          18: {position: [WIDTH/1.1, HEIGHT/2.2], category: "floor", renderer: <Bin/>},
          19: {position: [WIDTH/2, HEIGHT/2.2], category: "floor", renderer: <Bin/>},
          20: {position: [WIDTH/2.4, HEIGHT/2.2], category: "floor", renderer: <Bin/>},
          21: {position: [WIDTH/3, HEIGHT/2.2], category: "floor", renderer: <Bin/>},
          22: {position: [WIDTH/4, HEIGHT/2.2], category: "floor", renderer: <Bin/>},
          23: {position: [WIDTH/5, HEIGHT/2.2], category: "floor", renderer: <Bin/>},
          24: {position: [WIDTH/7, HEIGHT/2.2], category: "floor", renderer: <Bin/>},
          25: {position: [WIDTH/-125, HEIGHT/2.2], category: "floor", renderer: <Bin/>},
          26: {position: [WIDTH/-120, HEIGHT/2.2], category: "floor", renderer: <Bin/>},
          27: {position: [WIDTH/1.5, HEIGHT/2.2], category: "floor", renderer: <Bin/>},
          28: {position: [WIDTH/1.7, HEIGHT/2.2], category: "floor", renderer: <Bin/>},
          29: {position: [WIDTH/1.3, HEIGHT/2.2], category: "floor", renderer: <Bin/>},
        }}>
      <StatusBar hidden={true} />
      </GameEngine>
      {!this.state.running && 
      Alert.alert(
          'Game over! Your score: '+this.state.points,
          '',
          [
              {
                  text: 'Play again',
                  onPress: () => this.reset()
              },
              {
                  text: 'View Leaderboard',
                  onPress: () => this.props.navigation.navigate("GameOver", {points: this.state.points})
              }
          ]
      )} 
      <StatusBar style="auto" />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#63CDDA"
  },
  points: {
    color: 'red'
  }
  
});