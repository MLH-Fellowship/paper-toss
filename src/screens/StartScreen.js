
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
const Start = ({navigation}) => {
    return(
    <View style = {styles.MainContainer}>
        <Text style={styles.title}>RecycleThis!</Text>
        <Image source={require('./../assets/bins-start.png')} key='bins' style={[styles.bins]}/>
        <TouchableOpacity
          style={styles.customBtnBG}
          onPress={() => navigation.navigate('Game', {startAgain: false})}  >
          <Text style={styles.customBtnText}>START</Text>
        </TouchableOpacity>
    </View>
    );
  };

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#B8E994',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: '400',
    fontFamily: 'Thonburi-Bold',
    color: "#fff"
  },
  customBtnText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Thonburi-Bold',
    color: "#fff",
    width: 200,
    marginTop: 0
  },
  customBtnBG: {
    backgroundColor: "#78E08F",
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 200,
    marginTop: 0,
    borderRadius: 30
  },
  bins: {
    borderRadius: 20 * 2,
    width: 200 * 2,
    height: 200 * 2,
  }
});
  export default Start;