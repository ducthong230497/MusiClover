import React, { Component } from 'react';

import {View,StyleSheet,Dimensions, Animated, Easing} from 'react-native';

class AlbumArt extends Component {
  state = {
    spinValue: new Animated.Value(0),  
}
 
  componentDidMount(){
    this.spin()
  }
  spin () {
    this.state.spinValue.setValue(0)
    Animated.timing(                  
      this.state.spinValue,                                   // The animated value to drive
      {
          toValue: this.props.toValue || 1,                   // Animate to 360/value
          duration: this.props.duration || 16000,              // Make it take a while
          easing: Easing.linear,
          useNativeDriver: true,
      }
  ).start(() => this.spin());
  }
  render(){
    let spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    return (
      <View style={styles.container}>
          <Animated.Image style={{width: imageSize, height: imageSize, borderRadius: imageSize, transform: [{rotate:spin}]}}
            source={{uri: this.props.url}}/>
      </View>
    );
  }
}

export default AlbumArt;

const { width, height } = Dimensions.get('window');
const imageSize = width - 48;

const styles = StyleSheet.create({
  container: {
    flex: 10,
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: "center",
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize,
  },
})