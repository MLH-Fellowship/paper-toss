import { StatusBar } from 'expo-status-bar';
import React, {PureComponent} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Dimensions, Alert, Modal} from 'react-native';
import {
  Container, Header, Content, Card, Input,
  CardItem, Text, Right, Icon, Row,
  Left, Body, Title, Button, Label, Form, Item }
from 'native-base';
import { GameEngine } from "react-native-game-engine";
import { OurItem, Bin, Timer } from "../renderers";
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
      username: '',
      visibleModal: true,
      item: "can" //random
    }
  }

  storeData = async (points, username) => {
    const v = [{
      points:points,
      username: username}];
    AsyncStorage.getItem('points', (err,result) => {
      if (result !== null) {
        //console.log('Data found', result);
        var arr = JSON.parse(result) || [];
        var newPoints = arr.concat(v);
        AsyncStorage.setItem('points', JSON.stringify(newPoints));
      }
      else {
        //console.log("data not found");
        AsyncStorage.setItem('points', JSON.stringify(v));
      }
    })
  }


  onEvent = (e) => { 
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

  //game over
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

  renderModalContent(){
    return (
      <View style={styles.modalView}>
        <Form>
          <Item fixedLabel>
            <Label>Your score: {this.state.points}. To save it insert your username</Label>
            <Input 
              value={this.state.username}
              onChangeText={(text) => { 
                this.setState({username: text})}}
            />
            </Item>
            <Button onPress={() => {
              this.storeData(JSON.stringify(this.state.points), this.state.username);
              this.reset()
              
              }}>
              <Text>Play again</Text>
            </Button>
            <Button title="View Leaderboard" 
            onPress={() => {
              this.storeData(JSON.stringify(this.state.points), this.state.username);
              this.props.navigation.navigate("GameOver", {points: this.state.points})
              this.setState({
              visibleModal: false
              })
          }
            }>
                <Text>View Leaderboard</Text>
            </Button>
          <Button
            onPress={() => this.setState({
              visibleModal: false
            })}
          >
          <Text>Hide Modal</Text>
          </Button>
        </Form>
     
      </View>
      )
    }


  
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
          1: {position: [WIDTH/2, HEIGHT-100], item: this.state.item, renderer: <OurItem/>}, //-- Notice that each entity has a unique id (required)
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
        }}>
      <StatusBar hidden={true} />
      </GameEngine>
      {!this.state.running && 
      <Modal
      transparent={true}
      visible={this.state.visibleModal}
      animationType="slide"
  >
      {this.renderModalContent()}
  </Modal>
        } 
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
  },
  modalView: {
    //justifyContent: "center",
    //alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    width: WIDTH*0.8
  }
  
});