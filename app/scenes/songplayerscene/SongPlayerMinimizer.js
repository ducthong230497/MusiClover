import React, { Component } from 'react';
import {View,StyleSheet,Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'
import {connect} from 'react-redux' 

class SongPlayerMinimizer extends Component{

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
        this.props.dispatch({type: 'NextTrack'})
    }

    render(){

        if(!this.props.isMinimizerVisible) return null;

        const track = this.props.tracks[this.props.selectedTrackIndex];

        return(
        <TouchableOpacity style = {styles.container} onPress = {this.onWholeButtonPress.bind(this)}>
            <View style = {styles.subcontainer}>
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
        paused: state.songPlayer.paused,
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
  }

});