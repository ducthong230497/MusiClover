import React, { Component } from 'react';
import {View, StatusBar} from 'react-native';
import Header from './Header';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';
import {getXmlURL, getDataFromXmlURL} from '../../connector/connector'
import {connect} from 'react-redux'

class SongPlayerMaximizer extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      selectedTrackImageUrl: 'null',
    };

    // this.getSongData(this.props.selectedTrackIndex);
  }

  getSongData(index)
  {
    getXmlURL(this.props.tracks[index].songURL).then(xmlUrl=> {
      getDataFromXmlURL(xmlUrl).then(data => {
        this.setState({selectedTrackImageUrl: data.img});
        this.props.dispatch({type: 'SetSelectedTrackURL', selectedTrackURL: data.URL})
      });
    });
  }

  onSeek(position) {
    this.props.songPlayer.seek(position)
    this.props.dispatch({type: 'SetCurrentPosition', currentPosition: Math.floor(position)})
  }

  onBack() {
    
    if (this.props.selectedTrackIndex > 0) {
      this.getSongData(this.props.selectedTrackIndex-1);
      this.props.dispatch({type: 'BackTrack'});
      
      // this.props.dispatch({type: 'SetCurrentPosition', currentPosition: 0})
      // this.props.dispatch({type: 'Resume'})
      // this.props.dispatch({type: 'SetTotalLength', totalLength: 1})
      // this.props.dispatch({type: 'SetSelectedTrackIndex', selectedTrackIndex: this.props.selectedTrackIndex-1})

    } else {
    //   this.video.current.seek(0);
    //   this.setState({
    //     currentPosition: 0,
    //   });
    }
  }

  onForward() {
    const trackLength = this.props.tracks.length;
    if (this.props.selectedTrackIndex < trackLength-1) {
      this.getSongData(this.props.selectedTrackIndex+1);
      this.props.dispatch({type: 'NextTrack'});

      // this.props.dispatch({type: 'SetCurrentPosition', currentPosition: 0})
      // this.props.dispatch({type: 'Resume'})
      // this.props.dispatch({type: 'SetTotalLength', totalLength: 1})
      // this.props.dispatch({type: 'SetSelectedTrackIndex', selectedTrackIndex: this.props.selectedTrackIndex+1})
    }

  }

  onHideButtonPress()
  {
    this.props.dispatch({type: 'ShowMinimizer'});
  }

  render() {

    if(!this.props.isMaximizerVisible) return null;

    const track = this.props.tracks[this.props.selectedTrackIndex];
    
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Header 
          message="Playing From Charts"
          onHideButtonPress = {this.onHideButtonPress.bind(this)} />
        <AlbumArt url={this.state.selectedTrackImageUrl} />
        <TrackDetails title={track.songName} artist={track.artist} />
        <SeekBar
          onSeek={this.onSeek.bind(this)}
          trackLength={this.props.totalLength}
          onSlidingStart={() => this.props.dispatch({type: 'Pause'})}
          currentPosition={this.props.currentPosition} />
        <Controls
          onPressRepeat={() => this.props.dispatch({type: 'ToggleRepeat'})}
          repeatOn={this.props.repeatOn}
          shuffleOn={this.props.shuffleOn}
          forwardDisabled={this.props.selectedTrackIndex == this.props.tracks.length - 1}
          onPressShuffle={() => this.props.dispatch({type: 'ToggleShuffle'})}
          onPressPlay={() => this.props.dispatch({type: 'Resume'})}
          onPressPause={() => this.props.dispatch({type: 'Pause'})}
          onBack={this.onBack.bind(this)}
          onForward={this.onForward.bind(this)}
          paused={this.props.paused}/>
      </View>
    );
  }
}

function mapStateToProps(state)
{
  return {
    tracks: state.songPlayer.tracks,
    selectedTrackIndex: state.songPlayer.selectedTrackIndex,
    totalLength: state.songPlayer.totalLength,
    currentPosition: state.songPlayer.currentPosition,
    paused: state.songPlayer.paused,
    repeatOn: state.songPlayer.repeatOn,
    shuffleOn: state.songPlayer.shuffleOn,
    isMaximizerVisible: state.songPlayer.isMaximizerVisible
  }
}

export default connect(mapStateToProps)(SongPlayerMaximizer);

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
    position: 'absolute',
    top: 0,
    left: 0,
    width:'100%',
    height: '100%',
  },
};