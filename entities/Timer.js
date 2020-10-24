import React, { Component } from "react";
import { StyleSheet, View, Image, Text} from "react-native";


export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            second: 0,
        }
    }
        render() {
            return (
                <View>
                <Text style={styles.secondText}>{this.state.second}</Text>
                </View>
            );
        }
}

const styles = StyleSheet.create({
    secondText: {
        fontSize: 24,
        color: '#000', 
        position: 'absolute',
        top: 50,
        alignSelf: 'center',
    }
})