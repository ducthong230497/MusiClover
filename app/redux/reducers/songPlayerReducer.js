import {Platform} from 'react-native'
import {getXmlURL, getDataFromXmlURL, getEncryptKey, getDataFromKeyEncrypt, typeEnum} from '../../connector/connector'
import store from '../store'
import MusicControl from 'react-native-music-control';
//Bad performance
//Recommendation: put tracks (since tracks can be very large) into another reducer 
const initialState = {
    songPlayer: null,
    tracks: [],
    selectedTrackIndex: 0,
    selectedTrackURL: 'https://aredir.nixcdn.com/dummy.mp3',
    selectedTrackImage: 'https://media.giphy.com/media/QyOI0WGW3vY2s/giphy.gif',
    selectedLyric: null,
    loadNewLyric: false,
    totalLength: 1,
    currentPosition: 0,
    paused: false,
    repeatOn: false,
    shuffleOn: false,
    isMaximizerVisible: false,
    isMinimizerVisible: false,
}

export default (state=initialState, action) => {
    switch (action.type) {
        case 'SetSongPlayer' :
        return {
            ...state,
            songPlayer: action.songPlayer,
        }
        case 'Start':
        getSongData(action.selectedTrackIndex, action.tracks);
        return {
            ...state,
            tracks: action.tracks,
            selectedTrackIndex: action.selectedTrackIndex,
            isMaximizerVisible: true,
            isMinimizerVisible: false,
            paused: false,
        }
        case 'SetTrackList' :
        return {
            ...state,
            tracks: action.tracks,
        }
        case 'SetSelectedTrackIndex' :
        return {
            ...state,
            selectedTrackIndex: action.selectedTrackIndex
        }
        case 'SetSelectedTrackInfo' :
        return {
            ...state,
            selectedTrackURL: action.selectedTrackURL,
            selectedTrackImage: action.selectedTrackImage,
            selectedLyric: action.selectedLyric,
            loadNewLyric: action.loadNewLyric,
        }
        case 'LoadNewLyricFalse':
        return {
            ...state,
            loadNewLyric: false,
        }
        case 'Pause':
        return {
            ...state,
            paused : true
        }
        case 'Resume':
        return {
            ...state,
            paused : false
        }
        case 'SetTotalLength':
        setupMusicControl(state.tracks[state.selectedTrackIndex],action.totalLength);
        return {
            ...state,
            totalLength: action.totalLength
        }
        case 'SetCurrentPosition':
        return {
            ...state,
            currentPosition: action.currentPosition
        }
        case 'NextTrack':
        getSongData(state.selectedTrackIndex+1, state.tracks);
        return {
            ...state,
            currentPosition: 0, 
            paused: false, 
            totalLength: 1, 
            selectedTrackIndex: state.selectedTrackIndex + 1
        }
        case 'NextShuffleTrack':
        let randomTrackIndex = Math.floor(Math.random() * state.tracks.length);
        getSongData(randomTrackIndex, state.tracks);
        return {
            ...state,
            currentPosition: 0, 
            paused: false, 
            totalLength: 1, 
            selectedTrackIndex: randomTrackIndex
        }
        case 'BackTrack':
        getSongData(state.selectedTrackIndex-1, state.tracks);
        return {
            ...state,
            currentPosition: 0, 
            paused: false, 
            totalLength: 1, 
            selectedTrackIndex: state.selectedTrackIndex - 1
        }
        case 'PlayTrack':
        getSongData(action.trackIndex, state.tracks);
        return {
            ...state,
            currentPosition: 0, 
            paused: false, 
            totalLength: 1, 
            selectedTrackIndex: action.trackIndex
        }
        case 'ToggleRepeat':
        return {
            ...state,
            repeatOn: !state.repeatOn
        }
        case 'ToggleShuffle':
        return {
            ...state,
            shuffleOn: !state.shuffleOn
        }
        case 'ShowMinimizer':
        return {
            ...state,
            isMaximizerVisible: false,
            isMinimizerVisible: true
        }
        case 'ShowMaximizer':
        return {
            ...state,
            isMaximizerVisible: true,
            isMinimizerVisible: false
        }
        case 'HideInterface':
        return {
            ...state,
            isMaximizerVisible: false,
            isMinimizerVisible: false
        }
        default:
            return state
    }
}

function getSongData(index,tracks)
{
    //offine
    if(tracks[index].URL && tracks[index].img)
    {
        setTimeout(() => {
            store.dispatch({
                type: 'SetSelectedTrackInfo', 
                selectedTrackURL: tracks[index].URL, 
                selectedTrackImage: Platform.OS === 'android' ? 'file://' + tracks[index].img: tracks[index].img
            })
        }, 1); //set time out to avoid a weird redux's error
    }
    else //online
    {
        console.log("asdsadadasdadadadasdasd")
        //alert(JSON.stringify(tracks[index]))
        if (tracks[index].songURL != null)
        {
            //console.log("songURL")
            getXmlURL(tracks[index].songURL).then(xmlUrl=> {
                getDataFromXmlURL(xmlUrl).then(data => {
    
                    store.dispatch({
                        type: 'SetSelectedTrackInfo', 
                        selectedTrackURL: data.URL, 
                        selectedTrackImage: data.img
                    })
    
                });
            });
        }
        else if (tracks[index].url != null){
            //console.log("link")
            getEncryptKey(tracks[index].url).then(result => {
                //console.log("encrypkey: " + result)
                getDataFromKeyEncrypt(result, typeEnum.SONG).then(data => {
                    console.log("json data: " + data.lyric)
                    //alert(JSON.stringify(data))
                    store.dispatch({
                        type: 'SetSelectedTrackInfo',
                        selectedTrackURL: data.location,
                        selectedTrackImage: data.thumb,
                        selectedLyric: data.lyric,
                        loadNewLyric: true,
                    })
                })
            })
        }
    }
}

function setupMusicControl(track, length)
{
    MusicControl.setNowPlaying({
        title: track.songName,
        // artwork: 'https://i.imgur.com/e1cpwdo.png',
        artist: track.artist,
        duration: length, // (Seconds)
        color: 0xFFFFFF, // Notification Color - Android Only
      })

      // Changes the state to paused
    MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING,
    })
}
