import React, { Component } from 'react';
import {View,Text,StyleSheet,Slider} from 'react-native';

class SeekBar extends Component{

  pad(n, width, z=0) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  
  minutesAndSeconds(position) {
    position = Math.floor(position);
    return [this.pad(Math.floor(position / 60), 2),this.pad(position % 60, 2)];
  }

  onValueChange(position)
  {
    this.props.onSeek(position);
  }

  render(){
    let elapsed = this.minutesAndSeconds(this.props.currentPosition);
    let remaining = this.minutesAndSeconds(this.props.trackLength - this.props.currentPosition);

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>
            {elapsed[0] + ":" + elapsed[1]}
          </Text>
          <View style={{flex: 1}} />
          <Text style={[styles.text, {width: 40}]}>
            {this.props.currentPosition > 1 && "-" + remaining[0] + ":" + remaining[1]}
          </Text>
        </View>
        <Slider
          maximumValue={this.props.trackLength}
          onSlidingStart={this.props.onSlidingStart}
          onValueChange = {this.onValueChange.bind(this)}
          value={this.props.currentPosition}
          style={styles.slider}
          minimumTrackTintColor='#fff'
          maximumTrackTintColor='rgba(255, 255, 255, 0.14)'
          thumbStyle={styles.thumb}
          trackStyle={styles.track}/>
      </View>
    );
  };
}

export default SeekBar;

const styles = StyleSheet.create({
  slider: {
    marginTop: -12,
  },
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign:'center',
  }
});