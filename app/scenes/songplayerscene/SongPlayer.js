import React, { Component } from 'react';
import {View, Text, StatusBar} from 'react-native';
import Header from './Header';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';
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

    this.state = {
      totalLength: 1,
      currentPosition: 0,
      paused: false,
      repeatOn: false,
      shuffleOn: false,
      selectedTrack: this.props.initialTrackIndex,
    };

    this.video = React.createRef();

  }


  setDuration(data) {
    // console.log("dsads " + data.duration);
    this.setState({totalLength: Math.floor(data.duration)});
  }

  setTime(data) {
    //console.log(data);
    this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  seek(time) {
    time = Math.round(time);
    this.video.current && this.video.current.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.video.current && this.video.current.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);
    } else {
      this.video.current.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward() {
    const trackLength = this.props.tracks == null? DUMMYTRACKS.length: this.props.tracks.length;
    if (this.state.selectedTrack < trackLength) {
      this.video.current && this.video.current.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: false,
        isChanging: false,
        selectedTrack: this.state.selectedTrack + 1,
      }), 0);
    }
  }

  onHideButtonPress()
  {
      this.props.navigation.pop();
  }

  render() {
    const tracks = this.props.tracks == null? DUMMYTRACKS: this.props.tracks;
    const track = tracks[this.state.selectedTrack];
    const video = this.state.isChanging ? null : (
      <Video source={{uri: track.audioUrl}} // Can be a URL or a local file.
        ref={this.video}
        paused={this.state.paused}               // Pauses playback entirely.
        resizeMode="cover"           // Fill the whole screen at aspect ratio.
        repeat={true}                // Repeat forever.
        onLoadStart={this.loadStart} // Callback when video starts to load
        onLoad={this.setDuration.bind(this)}    // Callback when video loads
        onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
        onEnd={this.onEnd}           // Callback when playback finishes
        onError={this.videoError}    // Callback when video cannot be loaded
        style={styles.audioElement} />
    );

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Header 
          message="Playing From Charts"
          onHideButtonPress = {this.onHideButtonPress.bind(this)} />
        <AlbumArt url={track.albumArtUrl} />
        <TrackDetails title={track.songName} artist={track.artist} />
        <SeekBar
          onSeek={this.seek.bind(this)}
          trackLength={this.state.totalLength}
          onSlidingStart={() => this.setState({paused: true})}
          currentPosition={this.state.currentPosition} />
        <Controls
          onPressRepeat={() => this.setState({repeatOn : !this.state.repeatOn})}
          repeatOn={this.state.repeatOn}
          shuffleOn={this.state.shuffleOn}
          forwardDisabled={this.state.selectedTrack == (this.props.tracks == null?DUMMYTRACKS.length: this.props.tracks.length - 1)}
          onPressShuffle={() => this.setState({shuffleOn: !this.state.shuffleOn})}
          onPressPlay={() => this.setState({paused: false})}
          onPressPause={() => this.setState({paused: true})}
          onBack={this.onBack.bind(this)}
          onForward={this.onForward.bind(this)}
          paused={this.state.paused}/>
        {video}
      </View>
    );
  }
}

function mapStateToProps(state)
{
  return {
    tracks: state.songPlayer.tracks,
    initialTrackIndex: state.songPlayer.initialTrackIndex
  }
}

export default connect(mapStateToProps)(SongPlayer);

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  audioElement: {
    height: 0,
    width: 0,
  }
};