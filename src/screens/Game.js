import { StatusBar } from 'expo-status-bar';
import React, {PureComponent} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Dimensions, Alert, Modal, Pressable} from 'react-native';
import {
  Container, Header, Content, Card, Input,
  CardItem, Text, Right, Icon, Row,
  Left, Body, Title, Button, Label, Form, Item }
from 'native-base';
import { GameEngine } from "react-native-game-engine";

import { OurItem, Bin, Timer, Floor } from "../renderers";
import { MoveItem, Collision } from "../systems";
import { Audio } from 'expo-av';
import { Octicons } from '@expo/vector-icons';
import Constants from './../Constants';
const WIDTH = Constants.WIDTH;
const HEIGHT = Constants.HEIGHT;
let iconURL = ['https://www.shareicon.net/data/128x128/2015/08/17/86679_cat_256x256.png', 'https://www.shareicon.net/data/128x128/2015/08/17/86680_cat_256x256.png','https://www.shareicon.net/data/128x128/2015/08/17/86684_cat_256x256.png', 'https://www.shareicon.net/data/128x128/2015/04/04/17581_cat_128x128.png','https://www.shareicon.net/data/128x128/2015/04/04/17584_animal_128x128.png','https://www.shareicon.net/data/128x128/2015/04/04/17589_animal_128x128.png','https://www.shareicon.net/data/128x128/2015/04/04/17590_animal_128x128.png', 'https://www.shareicon.net/data/128x128/2015/04/04/17586_animal_128x128.png'];

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

  
  soundState = "sound";
  soundObject = new Audio.Sound();
  
  async componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: false,
      playThroughEarpieceAndroid: true,
    });

    try {
      await this.soundObject.loadAsync(require('./../assets/gamesound.mp3'));
      await this.soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  async componentWillUnmount() {
    try {
      await this.soundObject.unloadAsync();
      await this.soundObject.stopAsync();
    } catch (error) {
      console.log(error);
    }
  }

  storeData = async (points, username) => {
    const v = [{
      points:points,
      username: username,
      icon: iconURL[[Math.floor(Math.random() * iconURL.length)]]
    }];
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

  toggleSound = () => {
    if (this.soundState === "sound") {
      this.soundState = "nosound";
      this.soundObject.pauseAsync();
    } else if (this.soundState === "nosound") {
      this.soundState = "sound";
      this.soundObject.playAsync();
    }
  };

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
          <Item stackedLabel>
            <Label>Insert a username to save your score!</Label>
            <Input
              value={this.state.username}
              onChangeText={(text) => { 
                this.setState({username: text})}}
            />
            </Item>
            <Button rounded success 
              style={styles.modalButton}
              onPress={() => {
              this.storeData(JSON.stringify(this.state.points), this.state.username);
              this.reset()
              
              }}>
              <Text>Play again</Text>
            </Button>
            <Button rounded warning
            style={styles.modalButton}
            title="View Leaderboard" 
            onPress={() => {
              this.storeData(JSON.stringify(this.state.points), this.state.username);
              this.props.navigation.navigate("GameOver", {points: this.state.points, username: this.state.username})
              this.setState({
              visibleModal: false
              })
          }
            }>
                <Text>View Leaderboard</Text>
            </Button>
        </Form>
     
      </View>
      )
    }


  
  render() {
  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score</Text>
      <Text style={styles.points}>{this.state.points}</Text>
      <Timer key = {this.state.updateTimer} onChange={this.onChangeTimer}/>
      <Pressable onPress={this.toggleSound}>
        <Octicons name={this.soundState === "sound" ? "unmute" : "mute"} size={24} color="black" />
      </Pressable>
      <GameEngine
      ref={(ref) => { this.engine = ref; }}
        style={styles.container}
        running = {this.state.running}
        onEvent = {this.onEvent}
        systems={[MoveItem, Collision]}
        entities={{
          1: {position: [WIDTH/2, HEIGHT-200], item: this.state.item, renderer: <OurItem/>}, //-- Notice that each entity has a unique id (required)
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
          16: {position: [0, HEIGHT/2.2], category: "floor", renderer: <Floor/>}

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
  score: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Futura',
    textAlign: "right",
  },
  points: {
    fontSize: 30,
    fontWeight: '400',
    fontFamily: 'Futura',
    textAlign: "right",
  },
  modalView: {
    backgroundColor: "white",
    display: 'flex',
    flexDirection: 'row',
    height: HEIGHT*0.3,
    marginTop: 200,
    width: WIDTH*0.9,
    borderRadius: 20,
    alignSelf: 'center',
    alignContent: 'center'
  },
 modalButton: {
   paddingVertical: 50,
   alignSelf: 'center'
 }
  
});