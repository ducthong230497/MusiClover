import React, { Component } from 'react';
import {View,StyleSheet,Text, TouchableOpacity, Image, Animated, Easing} from 'react-native';
import {Icon} from 'react-native-elements'
import {connect} from 'react-redux' 

class SongPlayerMinimizer extends Component{
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
              duration: this.props.duration || 4000,              // Make it take a while
              easing: Easing.linear,
              useNativeDriver: true,
          }
      ).start(() => this.spin());
      }

    onWholeButtonPress()
    {
        this.props.dispatch({type: 'ShowMaximizer'})
    }
    
    onResumeButtonPress()
    {
        this.props.dispatch({type: 'Resume'})
    }

    onPauseButtonPress()
    {
        this.props.dispatch({type: 'Pause'})
    }

    onSkipButtonPress()
    {
    if(this.props.shuffleOn)
      {
        this.props.dispatch({type: 'NextShuffleTrack'});
      }
      else
      {
        this.props.dispatch({type: 'NextTrack'});
      }
    }

    onCloseButtonPress()
    {
        this.props.dispatch({type: 'HideInterface'});
        this.props.dispatch({type: 'Pause'});
    }

    render(){

        if(!this.props.isMinimizerVisible) return null;

        const track = this.props.tracks[this.props.selectedTrackIndex];

        let spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })

        return(
        <TouchableOpacity style = {styles.container} onPress = {this.onWholeButtonPress.bind(this)}>
            <View style = {styles.subcontainer}>
            <Animated.Image style={{width: 40, height: 40, borderRadius: 40, marginLeft: 10, transform: [{rotate:spin}]}}
            source={{uri: this.props.selectedTrackImage}}/>
                <View style = {styles.songInfoContainer}>
                    <Text style = {styles.songName}>{track.songName}</Text>
                    <Text style = {styles.artistName}>{track.artist}</Text>
                </View>
                {!this.props.paused?
                <TouchableOpacity style = {styles.button} onPress = {this.onPauseButtonPress.bind(this)}>
                    <Icon name = 'pause' color = 'white' size = {35}></Icon>
                </TouchableOpacity>:
                <TouchableOpacity style = {styles.button} onPress = {this.onResumeButtonPress.bind(this)}>
                    <Icon name = 'play-arrow' color = 'white' size = {35}></Icon>
                </TouchableOpacity>
                }
                <TouchableOpacity style = {styles.button} onPress = {this.onSkipButtonPress.bind(this)}>
                    <Icon name = 'skip-next' color = 'white' size = {35}></Icon>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button} onPress = {this.onCloseButtonPress.bind(this)}>
                    <Icon name = 'close' color = 'white' size = {30}></Icon>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
        )
    }
}

function mapStateToProps(state)
{
    return{
        tracks: state.songPlayer.tracks,
        selectedTrackIndex: state.songPlayer.selectedTrackIndex,
        selectedTrackImage: state.songPlayer.selectedTrackImage,
        paused: state.songPlayer.paused,
        shuffleOn: state.songPlayer.shuffleOn,
        isMinimizerVisible: state.songPlayer.isMinimizerVisible
    }
}

export default connect(mapStateToProps)(SongPlayerMinimizer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    width:'100%',
    height: 50,
    backgroundColor: '#212321'
  },
  subcontainer:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
  },
  songInfoContainer:{
      flex:1,
      marginLeft: 20
  },
  songName:{
      fontWeight: 'bold',
      fontSize: 15,
      color: 'white'
  },
  artistName:{
    fontSize: 12,
    color: 'white'
  },
  button:{
      paddingRight: 10
  },
  Avatar:{
      width: 40,
      height: 40,
      borderRadius:40,
      marginLeft: 10,
  }

});