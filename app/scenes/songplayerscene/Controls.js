import React, { Component } from 'react';
import {View,StyleSheet,TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'

class Controls extends Component{

  render(){

      // let imgFolderPath = '../../../resources/img/'; 

      return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.0} onPress={this.props.onPressShuffle}>
          {/* <Image style={[styles.secondaryControl, this.props.shuffleOn ? [] : styles.off]} source={require( imgFolderPath + 'ic_shuffle_white.png')}/> */}
            <Icon name = "shuffle" size = {18} color = {this.props.shuffleOn?"white":"gray"}></Icon>
        </TouchableOpacity>
        <View style={{width: 40}} />
        <TouchableOpacity onPress={this.props.onBack}>
          {/* <Image source={require(imgFolderPath + 'ic_skip_previous_white_36pt.png')}/> */}
          <Icon name = "skip-previous" size = {36} color = "white"></Icon>
        </TouchableOpacity>
        <View style={{width: 20}} />
        {!this.props.paused ?
          <TouchableOpacity onPress={this.props.onPressPause}>
            <View style={styles.playButton}>
              {/* <Image source={require(imgFolderPath + 'ic_pause_white_48pt.png')}/> */}
              <Icon name = "pause" size = {60} color = "white"></Icon>
            </View>      
          </TouchableOpacity> :
          <TouchableOpacity onPress={this.props.onPressPlay}>
            <View style={styles.playButton}>
              {/* <Image source={require(imgFolderPath + 'ic_play_arrow_white_48pt.png')}/> */}
              <Icon name = "play-arrow" size = {60} color = "white"></Icon>
            </View>
          </TouchableOpacity>
        }
        <View style={{width: 20}} />
        <TouchableOpacity onPress={this.props.onForward}
          disabled={this.props.forwardDisabled}>
          {/* <Image style={[this.props.forwardDisabled && {opacity: 0.3}]} source={require(imgFolderPath + 'ic_skip_next_white_36pt.png')}/> */}
          <Icon name = "skip-next" size = {36} color = {this.props.forwardDisabled?"gray":"white"}></Icon>
        </TouchableOpacity>
        <View style={{width: 40}} />
        <TouchableOpacity activeOpacity={0.0} onPress={this.props.onPressRepeat}>
          {/* <Image style={[styles.secondaryControl, this.props.repeatOn ? [] : styles.off]} source={require(imgFolderPath + 'ic_repeat_white.png')}/> */}
          <Icon name = "repeat" size = {18} color = {this.props.repeatOn?"white":"gray"}></Icon>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Controls;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryControl: {
    height: 18,
    width: 18,
  },
  off: {
    opacity: 0.30,
  }
})