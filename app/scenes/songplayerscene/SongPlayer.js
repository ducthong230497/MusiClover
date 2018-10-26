  import React, { Component } from 'react';
  import Video from 'react-native-video';
  import {connect} from 'react-redux'

  const DUMMYTRACKS = [
    {
      songName: 'Stressed Out',
      artist: 'Twenty One Pilots',
      albumArtUrl: "http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg",
      audioUrl: "https://aredir.nixcdn.com/NhacCuaTui968/CoAySeKhongYeuAnhNhuEm-ThuMinh-5662334.mp3?st=0VXfsGDoDfGZC0ueE5-DZQ&e=1537547254",
    },
    {
      songName: 'Love Yourself',
      artist: 'Justin Bieber',
      albumArtUrl: "http://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
      audioUrl: 'http://srv2.dnupload.com/Music/Album/Justin%20Bieber%20-%20Purpose%20(Deluxe%20Version)%20(320)/Justin%20Bieber%20-%20Purpose%20(Deluxe%20Version)%20128/05%20Love%20Yourself.mp3',
    },
    {
      songName: 'Hotline Bling',
      artist: 'Drake',
      albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
      audioUrl: 'http://dl2.shirazsong.org/dl/music/94-10/CD%201%20-%20Best%20of%202015%20-%20Top%20Downloads/03.%20Drake%20-%20Hotline%20Bling%20.mp3',
    },
  ];

  class SongPlayer extends Component {
    constructor(props)
    {
      super(props);
      this.video = React.createRef();
      this.setSongPlayer(this.video);
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