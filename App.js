import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Item from './entities/Item';
import Bin from './entities/Bin';
import Timer from './entities/Timer';
import Constants from './Constants';
import Physics from './systems/Physics';


export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            running: true
        };

        this.gameEngine = null;

        this.entities = this.setupWorld();
    }

    setupWorld = () => {
        let engine = Matter.Engine.create({ enableSleeping: false });
        let world = engine.world;

        let item = Matter.Bodies.rectangle( Constants.MAX_WIDTH / 4, Constants.MAX_HEIGHT / 2, 20, 20);
        Matter.World.add(world, [item]);
        let binGlass = Matter.Bodies.rectangle(Constants.MAX_WIDTH-40,Constants.MAX_HEIGHT/4, 20, 20, {isStatic: true});
        let binOrganic = Matter.Bodies.rectangle(Constants.MAX_WIDTH/8,Constants.MAX_HEIGHT/2, 20, 20, {isStatic: true});
        let binPaper = Matter.Bodies.rectangle(Constants.MAX_WIDTH-40,Constants.MAX_HEIGHT/2, 20, 20, {isStatic: true});
        let binPlastic = Matter.Bodies.rectangle(Constants.MAX_WIDTH/8,Constants.MAX_HEIGHT/4, 20, 20, {isStatic: true});
        let binTrash = Matter.Bodies.rectangle(Constants.MAX_WIDTH/2,Constants.MAX_HEIGHT/6, 20, 20, {isStatic: true});
        Matter.World.add(world, [item, binGlass, binOrganic, binPaper, binPlastic, binTrash]);

        return {
            physics: { engine: engine, world: world },
            timer: {renderer: Timer},
            item: { body: item, size: [20, 20], color: 'red', item: "can", renderer: Item},
            binGlass: { body: binGlass, size: [20, 20], color: 'blue', category: "glass",  renderer: Bin},
            binOrganic: { body: binOrganic, size: [20, 20], color: 'blue', category: "organic", renderer: Bin},
            binPaper: { body: binPaper, size: [20, 20], color: 'blue', category: "paper",  renderer: Bin},
            binPlastic: { body: binPlastic, size: [20, 20], color: 'blue', category: "plastic", renderer: Bin},
            binTrash: { body: binTrash, size: [20, 20], color: 'blue', category: "trash", renderer: Bin}
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <GameEngine
                  ref={(ref) => { this.gameEngine = ref; }}
                  style={styles.gameContainer}
                  running={this.state.running}
                  systems={[Physics]}
                  entities={this.entities}>
</GameEngine>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    gameContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});