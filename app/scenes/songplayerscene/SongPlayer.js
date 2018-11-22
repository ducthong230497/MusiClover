  import React, { Component } from 'react';
  import Video from 'react-native-video';
  import {connect} from 'react-redux'
  import MusicControl from 'react-native-music-control';

  class SongPlayer extends Component {
    constructor(props)
    {
      super(props);

      this.video = React.createRef();
      this.setSongPlayer(this.video);
    }

    componentDidMount()
    {
      this.setupMusicControl();
    }

    setupMusicControl()
    {
        MusicControl.enableBackgroundMode(true);

        // set up OS music controls
        MusicControl.enableControl('play', true);
        MusicControl.enableControl('pause', true);
        MusicControl.enableControl('nextTrack', true);
        MusicControl.enableControl('previousTrack', true);
        
        // listen to control callbacks
        MusicControl.on('play', () => this.resume());
        MusicControl.on('pause', () => this.pause());
        MusicControl.on('nextTrack', () => this.onForward());
        MusicControl.on('previousTrack', () => this.onBack());   
    }

    pause()
    {
      this.props.dispatch({type: 'Pause'});
      // Changes the state to paused
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
      })
    }

    resume()
    {
      this.props.dispatch({type: 'Resume'})
      // Changes the state to paused
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING,
      })
    }

    onBack() {
    
      if (this.props.selectedTrackIndex > 0) {
        if(this.props.shuffleOn)
        {
          this.props.dispatch({type: 'NextShuffleTrack'});
        }
        else
        {
          this.props.dispatch({type: 'BackTrack'});
        }
      }
    }
  
    onForward() {
      // const trackLength = this.props.tracks.length;
      // if (this.props.selectedTrackIndex < trackLength-1) {
        if(this.props.shuffleOn)
        {
          this.props.dispatch({type: 'NextShuffleTrack'});
        }
        else
        {
          this.props.dispatch({type: 'NextTrack'});
        }
      // }
  
    }

    setSongPlayer(songPlayer)
    {
      this.props.dispatch({type: 'SetSongPlayer', songPlayer: songPlayer})
    }

    setDuration(data) {
      this.props.dispatch({type: 'SetTotalLength', totalLength: Math.floor(data.duration)})
    }

    setTime(data) {
      this.props.dispatch({type: 'SetCurrentPosition', currentPosition: Math.floor(data.currentTime)})
    }

    onEnd()
    {
      if(!this.props.repeatOn)
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
    }

    render() {

      return (
        // <View style = {styles.container}>
        //   <SongPlayerMinimizer
        //   />
        //   <SongPlayerMaximizer
        //     songPlayer = {this.video.current}
        //   />
          <Video 
            ref = {this.video}
            playInBackground = {true}
            playWhenInactive = {true}
            source={{uri: this.props.selectedTrackURL}} // Can be a URL or a local file.
            paused={this.props.paused}               // Pauses playback entirely.
            resizeMode="cover"           // Fill the whole screen at aspect ratio.
            repeat={this.props.repeatOn}                // Repeat forever.
            onLoadStart={this.loadStart} // Callback when video starts to load
            onLoad={this.setDuration.bind(this)}    // Callback when video loads
            onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
            onEnd={this.onEnd.bind(this)}           // Callback when playback finishes
            onError={this.videoError}    // Callback when video cannot be loaded
            style={styles.audioElement} />
        // </View>
      );
    }
  }


  function mapStateToProps(state)
  {
    return {
      currentPosition: state.songPlayer.currentPosition,
      paused: state.songPlayer.paused,
      repeatOn: state.songPlayer.repeatOn,
      shuffleOn: state.songPlayer.shuffleOn,
      selectedTrackURL: state.songPlayer.selectedTrackURL,
      selectedTrackIndex: state.songPlayer.selectedTrackIndex
    }
  }

  export default connect(mapStateToProps)(SongPlayer);

  const styles = {
    container:{
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width:'100%',
      height: '100%',
    },
    audioElement: {
      height: 0,
      width: 0,
    }
  };