import React, { Component } from 'react';

import {View,StyleSheet, Dimensions, Animated, PanResponder, ScrollView, Image, Slider} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

class SongPlayAnimation extends Component{


    componentWillMount()
    {
        this.animation = new Animated.ValueXY({x: 0, y: SCREEN_HEIGHT - 50})
    }

  render(){

    const animatedHeight = {
        transform: this.animation.getTranslateTransform()
    }

    return(
      <Animated.View style={styles.container}>

        <Animated.View 
            style = {[animatedHeight, {position: 'absolute', 
                        left: 0, right: 0, 
                        zIndex: 10, backgroundColor: 'orange', 
                        height: SCREEN_HEIGHT}]}>

            <Animated.View
                style = {{height: 80, borderTopWidth: 1, 
                    borderTopColor: "red", flexDirection: 'row', alignItems: 'center'}}>

                <View style = {{flex: 4, flexDirection: 'row', alignItems: 'center'}}>
                    
                </View>
            
            </Animated.View>

        </Animated.View>

      </Animated.View>
      );
    }
}

export default SongPlayAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width:'100%',
    height: '100%',
  }
});