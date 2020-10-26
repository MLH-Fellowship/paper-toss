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
          1: { position: [WIDTH/2, HEIGHT-100], item: this.state.item, renderer: <Item/>}, //-- Notice that each entity has a unique id (required)
          2: {position: [WIDTH - 40, HEIGHT/2], category: "paper", renderer: <Bin/>},
          3: {position: [WIDTH - 40, HEIGHT/4], category: "glass", renderer: <Bin/>},
          4: {position: [WIDTH/8, HEIGHT/2], category: "organic",renderer: <Bin/>},
          5: {position: [WIDTH/8, HEIGHT/4], category: "plastic", renderer: <Bin/>},
          6: {position: [WIDTH/2, HEIGHT/6], category: "trash", renderer: <Bin/>},

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
                  text: 'View Scoreboard',
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