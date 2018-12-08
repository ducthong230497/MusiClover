import React, { Component } from 'react';
import { View, StatusBar, ScrollView, Text, FlatList } from 'react-native';
import Toast from 'react-native-easy-toast'
import RNFetchBlob from 'rn-fetch-blob'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { getXmlURL, getDataFromXmlURL } from '../../connector/connector'
import Swiper from 'react-native-swiper';
import {LyricText} from './LyricText'

import Header from './Header';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';
import SongActionView from './SongActionView';
import NowPlaylistView from './NowPlaylistView';
import RNFS from 'react-native-fs'

class SongPlayerMaximizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSongActionViewVisible: false,
      isAddToPlaylistViewVisible: false,
      isNowPlaylistViewVisible: false
    }
    this.songLyric=''
    this.listLyricTime = []
    this.listLyric  = []
    this.listLyricAndTime = []
    this.toast = React.createRef();
    this.downlyric = true
  }

  onSeek(position) {
    console.log("onseek")
    this.props.songPlayer.current.seek(position)
    this.props.dispatch({ type: 'SetCurrentPosition', currentPosition: Math.floor(position) })
    console.log(position)
    console.log(this.props.totalLength)
  }

  onBack() {

    if (this.props.selectedTrackIndex > 0) {
      if (this.props.shuffleOn) {
        this.props.dispatch({ type: 'NextShuffleTrack' });
      }
      else {
        this.props.dispatch({ type: 'BackTrack' });
      }
    } else {
      //   this.video.current.seek(0);
      //   this.setState({
      //     currentPosition: 0,
      //   });
    }
  }

  onForward() {
    const trackLength = this.props.tracks.length;
    if (this.props.selectedTrackIndex < trackLength - 1) {
      if (this.props.shuffleOn) {
        this.props.dispatch({ type: 'NextShuffleTrack' });
      }
      else {
        this.props.dispatch({ type: 'NextTrack' });
      }
    }

  }

  onHideButtonPress() {
    this.props.dispatch({ type: 'ShowMinimizer' });
  }

  onMoreButtonPress() {
    this.setState({ isSongActionViewVisible: true });
  }

  onCloseSongActionView() {
    this.setState({ isSongActionViewVisible: false });
  }

  onAddToPlaylistButtonPress() {
    this.setState({ isAddToPlaylistViewVisible: true })
  }

  onCloseAddToPlaylistButtonPress() {
    this.setState({ isAddToPlaylistViewVisible: false })
  }

  onDownloadButtonPress(track) {
    //get track data
    getXmlURL(track.songURL).then(xmlUrl => {
      getDataFromXmlURL(xmlUrl).then(data => {
        let URL = data.URL;
        let img = data.img;

        //add to downloading list
        let downloadingSong = {
          songName: track.songName,
          artist: track.artist,
          URL: URL,
          progress: 0
        }

        //add to downloading songs
        this.props.dispatch({ type: "AddDownloadingSong", downloadingSong: downloadingSong });

        //download song
        this.downloadData(URL, 'mp3', true).then(trackPath => {

          //download img
          this.downloadData(img, 'png', false).then(imgPath => {

            let offlineSongs = this.props.offlineSongs.concat([{
              songName: track.songName,
              artist: track.artist,
              URL: trackPath,
              img: imgPath,
            }])

            //toast
            this.toast.current.show(track.songName + ' Downloaded completely');

            //store info to local
            this.storeData('songs', JSON.stringify(offlineSongs));

            this.props.dispatch({ type: 'SetOfflineSongs', offlineSongs: offlineSongs });
            this.props.dispatch({ type: 'FinishProgress', oldURL: URL, newURL: trackPath, imgURL: imgPath });
          })

        })
      });
    });

    //hide
    this.setState({ isSongActionViewVisible: false });
    //toast
    this.toast.current.show('Downloading the song');

  }

  storeData = async (name, value) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.log('Something went wrong!');
    }
  }

  retrieveData = async (name) => {
    try {
      let data = await AsyncStorage.getItem(name);
      if (data !== null) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.log('Something wrong!' + error);
    }
  }

  downloadData = async (url, appendExt, trackProgress) => {
    let path = null;
    console.log("lyric url: " + url)
    await RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      // by adding this option, the temp files will have a file extension
      appendExt: appendExt
    })
      .fetch('GET', url, {
        //some headers ..
      })
      // listen to download progress event
      .progress((received, total) => {
        if (trackProgress) {
          let progress = received / total;
          this.props.dispatch({ type: 'UpdateProgress', url: url, progress: progress });
        }
      })
      .then((res) => {
        path = res.path();
      })

    return path;
  }

  onNowPlaylistViewClose() {
    this.setState({ isNowPlaylistViewVisible: false })
  }

  onNowPlaylistButtonPress() {
    this.setState({ isNowPlaylistViewVisible: true })
  }

  onSongButtonPress(index) {
    this.props.dispatch({
      type: 'PlayTrack',
      trackIndex: index
    });

    this.setState({ isNowPlaylistViewVisible: false });
  }

  hexStringToByteArray(hexString){
    let result = [];
    while (hexString.length >= 2) { 
        result.push(parseInt(hexString.substring(0, 2), 16));

        hexString = hexString.substring(2, hexString.length);
    }
    console.log("hex string: " + result)
    return result;
  }

  keyStringToByteArray(keyString){
    let result = []
    for (let i = 0; i < keyString.length; i++){
      result.push(keyString.charCodeAt(i))
    }
    console.log(result)
    return result
  }

  Decode(key, data){
  let cipher = []
  let S = []
  let K = []
  console.log(key)
  for (let i = 0; i < 256; i++)
  {
     S.push(i);
     console.log(key[i % key.length])
     K.push(key[i % key.length]);
  }
  let j = 0
  for (let i = 0; i < 256; i++) {
    j = (j + S[i] + K[i]) % 256; // Formular
    console.log("i: " + i + " ,j: " + j + " S[i]: " + S[i] + " K[i]: " + K[i])
    let tmp = S[i];
    S[i] = S[j];
    S[j] = tmp;
    // swap(ref S[i], ref S[j]);
  }
  console.log(S)
  // 2. Find Gramma
  let Q1 = 0
  let Q2 = 0
  let T = 0
  
  // Algorithm
  for (let i = 0; i < data.length; i++)
  {
      Q1++;
      Q1 = (Q1) % 256;
      Q2 = (Q2 + S[Q1]) % 256;

      let tmp = S[Q1];
      S[Q1] = S[Q2];
      S[Q2] = tmp;
      // swap(ref S[Q1], ref S[Q2]);

      T = (S[Q1] + S[Q2]) % 256;

      let Gamma = S[T];
      let temp = data[i] ^ Gamma
      //console.log("temp : " + temp)
      cipher.push((data[i] ^ Gamma))
  }
  console.log(cipher)
  return cipher
  }

  getLyric(cipher){
  let result = ''

  for(let i = 0;i < cipher.length; i++){
    result += ( String.fromCharCode(parseInt(cipher[i])))
    
  }
  return result
  }

  splitLyric(lyric){
  let listLyricWithTime = lyric.split('\n')
  this.listLyricTime = []
  this.listLyric = []
  this.listLyricAndTime = []
  for(let i = 0; i < listLyricWithTime.length; i++){
    //console.log(listLyricWithTime[i].substring(1, 9))
    let listTime = listLyricWithTime[i].substring(1, 9).split(':')
    let timeInSecond = parseFloat(listTime[0]) * 60 + parseFloat(listTime[1])
    this.listLyricTime.push(timeInSecond)
    this.listLyric.push(listLyricWithTime[i].substring(10))

    let lyricAndTime = {
      lyric: listLyricWithTime[i].substring(10),
      time: timeInSecond
    }
    this.listLyricAndTime.push(lyricAndTime)
  }
  }

  renderLyric= ({item}) => (
  //<Text style = {styles.title}>"aaa"</Text>
  <LyricText
      text= {item.lyric}
      time= {item.timeInSecond}
  />
  )
  render() {

    if (!this.props.isMaximizerVisible) return null;
    if (this.props.selectedLyric != null && this.props.loadNewLyric == true) {
      this.props.dispatch({ type: 'LoadNewLyricFalse' }) 
      console.log(this.props.loadNewLyric)
      console.log("Lyric: " + this.props.selectedLyric)
      if(this.props.selectedLyric == ""){
        this.listLyricTime = []
        this.listLyric = []
        this.listLyricAndTime = []
        return null
      }
      this.downloadData(this.props.selectedLyric, 'lrc', false).then(result => {
        console.log("download path: " + result)
        RNFS.readFile(result, 'utf8').then(content => {
          //console.log("download content: " + content) //Lyr1cjust4nct U2FsdGVkX19M0EUVPECEA2SWxq0wc/s=
          
          // let encrypt = CryptoJS.RC4.encrypt('testString', 'testKey')
          // console.log("encrypt: " + encrypt)
          // let decrypt = CryptoJS.RC4.decrypt(encrypt, 'testKey')
          // console.log("decrypt: " + decrypt)
          // let str = CryptoJS.enc.Utf8.stringify(decrypt)
          //===============================
          // let decrypt = CryptoJS.RC4.decrypt('BF24AA05A1C1BB9E3EBAC6AFCEE077A0F2A9018E', 'Lyr1cjust4nct')
          // console.log(decrypt)
          // let lyric = CryptoJS.enc.Utf8.stringify(decrypt)
          // console.log(lyric)
          //================ BF24AA05A1C1BB9E3EBAC6AFCEE077A0F2A9018E
          let data = this.hexStringToByteArray(content)
          let key = this.keyStringToByteArray('Lyr1cjust4nct')
          let bytes = this.Decode(key, data)
          let lyric = this.getLyric(bytes)
          this.songLyric = lyric
          this.splitLyric(lyric)
          //console.log(lyric)
        })
      })
    }
    else console.log("lyric null")
    const track = this.props.tracks[this.props.selectedTrackIndex];

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Header
          message="Playing From Playlist"
          onHideButtonPress={this.onHideButtonPress.bind(this)}
          onNowPlaylistButtonPress={this.onNowPlaylistButtonPress.bind(this)} />
        <View style={styles.swiperContainer}>
          <Swiper style={styles.swiper}>
            <AlbumArt url={this.props.selectedTrackImage} />
            <ScrollView>
            <FlatList
                    data = {this.listLyricAndTime}
                    renderItem={this.renderLyric.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView>
          </Swiper>
        </View>
        {/* <AlbumArt url={this.props.selectedTrackImage} /> */}
        <TrackDetails
          title={track.songName}
          artist={track.artist}
          onMoreButtonPress={this.onMoreButtonPress.bind(this)} />
        <SeekBar
          onSeek={this.onSeek.bind(this)}
          trackLength={this.props.totalLength}
          onSlidingStart={() => this.props.dispatch({ type: 'Pause' })}
          currentPosition={this.props.currentPosition} />
        <Controls
          onPressRepeat={() => this.props.dispatch({ type: 'ToggleRepeat' })}
          repeatOn={this.props.repeatOn}
          shuffleOn={this.props.shuffleOn}
          forwardDisabled={this.props.selectedTrackIndex == this.props.tracks.length - 1}
          onPressShuffle={() => this.props.dispatch({ type: 'ToggleShuffle' })}
          onPressPlay={() => this.props.dispatch({ type: 'Resume' })}
          onPressPause={() => this.props.dispatch({ type: 'Pause' })}
          onBack={this.onBack.bind(this)}
          onForward={this.onForward.bind(this)}
          paused={this.props.paused} />

        <SongActionView
          canDownload={true}
          isVisible={this.state.isSongActionViewVisible}
          songName={track.songName}
          artist={track.artist}
          onCloseButtonPress={this.onCloseSongActionView.bind(this)}
          onDownloadButtonPress={this.onDownloadButtonPress.bind(this, track)}
        />

        <NowPlaylistView
          songs={this.props.tracks}
          isVisible={this.state.isNowPlaylistViewVisible}
          onCloseButtonPress={this.onNowPlaylistViewClose.bind(this)}
          onSongButtonPress={this.onSongButtonPress.bind(this)}
        />

        <Toast
          ref={this.toast}
          style={{ backgroundColor: 'white' }}
          position='bottom'
          textStyle={{ color: 'black' }}
          positionValue={200}
        />

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    songPlayer: state.songPlayer.songPlayer,
    tracks: state.songPlayer.tracks,
    selectedTrackIndex: state.songPlayer.selectedTrackIndex,
    selectedTrackImage: state.songPlayer.selectedTrackImage,
    selectedLyric: state.songPlayer.selectedLyric,
    loadNewLyric: state.songPlayer.loadNewLyric,
    totalLength: state.songPlayer.totalLength,
    currentPosition: state.songPlayer.currentPosition,
    paused: state.songPlayer.paused,
    repeatOn: state.songPlayer.repeatOn,
    shuffleOn: state.songPlayer.shuffleOn,
    isMaximizerVisible: state.songPlayer.isMaximizerVisible,
    onlinePlaylists: state.user.onlinePlaylists,
    offlineSongs: state.user.offlineSongs,
    downloadSongs: state.download.downloadSongs
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
    width: '100%',
    height: '100%',
  },
  swiper: {
    flex: 3,
  },
  swiperContainer: {
    flex: 10,

  },
  title:{
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
  highlightText:{
    fontSize: 15,
    textAlign: 'center',
    color: '#D269FF',
  }

};