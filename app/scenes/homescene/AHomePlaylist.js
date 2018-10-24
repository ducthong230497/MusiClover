import React, {Component} from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import {connect} from 'react-redux'
import {getXmlURL, getDataFromXmlURL} from '../../connector/connector'
import Firebase from 'react-native-firebase'
import Toast from 'react-native-easy-toast'
import RNFetchBlob from 'rn-fetch-blob'
import {AsyncStorage} from 'react-native'

import SongButton from '../_components/SongButton'
import SongMoreView from '../_components/SongMoreView'
import AddToPlaylistView from '../_components/AddToPlaylistView'

class AHomePlaylist extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            isSongMoreViewVisible: false,
            isAddToPlaylistViewVisible: false,
            selectedSongName: '',
            selectedArtist: '',
            selectedSongURL: ''
        }

        this.playlist = [];
        this.toast = React.createRef();
    }

    onSongButtonPress(index)
    {
        this.props.dispatch({type: 'SetTrackList', tracks: this.playlist})
        this.props.dispatch({type: 'SetSelectedTrackIndex', selectedTrackIndex: index})
        this.props.dispatch({type: 'ShowMaximizer'});
        this.props.dispatch({type: 'Resume'});
        this.props.navigation.navigate('SongPlayer');

        //get track data
        getXmlURL(this.playlist[index].songURL).then(xmlUrl=> {
            getDataFromXmlURL(xmlUrl).then(data => {
                this.props.dispatch({type: 'SetSelectedTrackInfo', selectedTrackURL: data.URL, selectedTrackImage: data.img})
            });
        });
    }

    onMoreButtonPress(index)
    {
        currentSong = this.playlist[index];
        this.setState({
            selectedSongName:currentSong.songName, 
            selectedArtist: currentSong.artist, 
            selectedSongURL: currentSong.songURL,
            isSongMoreViewVisible: true
        });
        
    }

    onCloseSongMoreViewButtonPress()
    {
        this.setState({isSongMoreViewVisible:false});
    }

    onAddToPlaylistButtonPress()
    {

        if(!this.props.user) 
        {
            this.props.navigation.navigate('Account');
        }
        else
        {
            this.setState({isAddToPlaylistViewVisible: true});
        }
    }

    onCloseAddToPlaylistButtonPress()
    {
        this.setState({isAddToPlaylistViewVisible: false});
    }

    onDoneAddToPlaylistButtonPress(playlist)
    {
        let userCollection = Firebase.firestore().collection(this.props.user.email).doc('OnlineData');

        //get song image as playlist image
        if(playlist.songCount==0)
        {
            getXmlURL(this.state.selectedSongURL).then(xmlUrl=> {
                getDataFromXmlURL(xmlUrl).then(data => {
                    //store playlist image to firebase
                    userCollection.collection('Playlists').doc(playlist.name).set({
                        imgUrl: data.img,
                    }, { merge: true })
                });
            });
        }

        let songs = playlist.songs.concat([{
            songName: this.state.selectedSongName,
            artist: this.state.selectedArtist,
            songURL: this.state.selectedSongURL,
        }])

        //store new song to firebase
        userCollection.collection('Playlists').doc(playlist.name).set({
            songCount: playlist.songCount + 1,
            songs: songs
        }, { merge: true })

        userCollection.set({
            songs: this.props.onlineSongs.concat([{
                songName: this.state.selectedSongName,
                artist: this.state.selectedArtist,
                songURL: this.state.selectedSongURL,
            }])
        })

        //hide
        this.setState({isAddToPlaylistViewVisible:false, isSongMoreViewVisible: false});
        // //update redux
        // this.props.dispatch({type: 'AddPlaylist', name: 'Personal', playlist: songs})
        //toast
        this.toast.current.show('Added to playlist');
    }

    onAddToOnlineSongsButtonPress(){
        let userCollection = Firebase.firestore().collection(this.props.user.email).doc('OnlineData');
        userCollection.set({
            songs: this.props.onlineSongs.concat([{
                songName: this.state.selectedSongName,
                artist: this.state.selectedArtist,
                songURL: this.state.selectedSongURL,
            }])
        })

        //hide
        this.setState({isSongMoreViewVisible: false});
        // //update redux
        // this.props.dispatch({type: 'AddPlaylist', name: 'Personal', playlist: this.props.onlineSongs})
        //toast
        this.toast.current.show('Added to online songs');
    }

    onDownloadButtonPress()
    {

        //get track data
        getXmlURL(this.state.selectedSongURL).then(xmlUrl=> {
            getDataFromXmlURL(xmlUrl).then(data => {
                let selectedTrackURL = data.URL;
                let selectedTrackImage = data.img;

                //download song
                this.downloadData(selectedTrackURL, 'mp3').then(trackPath=>{

                    //download img
                    this.downloadData(selectedTrackImage, 'png').then(imgPath=>{

                        let song = [{
                            songName: this.state.selectedSongName,
                            artist: this.state.selectedArtist,
                            songUrl: trackPath,
                            imgUrl: imgPath,
                        }]

                        console.log(song);

                        //store info to local
                        this.storeData('songs', JSON.stringify(song));
                    })

                })
            });
        }); 

        //hide
        this.setState({isSongMoreViewVisible: false});
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

    downloadData = async(url, appendExt) =>{
        let path = null;

        await RNFetchBlob.config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            fileCache : true,
            // by adding this option, the temp files will have a file extension
            appendExt : appendExt
        })
        .fetch('GET', url, {
            //some headers ..
        })
        .then((res) => {
            path = res.path();
        })

        return path;
    }

    renderSongs = ({index, item}) => (
        <SongButton 
            // imgUrl = {item.albumArtUrl}
            songName = {item.songName}
            artistName = {item.artist}
            songIndex = {index}
            onSongButtonPress = {this.onSongButtonPress.bind(this)}
            onMoreButtonPress = {this.onMoreButtonPress.bind(this)}>
        </SongButton>
    );

    render(){

        let playlist = this.props.playlists.find(playlist => playlist.name === 'Home')
        if(playlist != null)
        {
            this.playlist = Object.values(playlist)
            this.playlist.pop() //pop the final item which is the variable 'name' we have put to playlist (see playlistsReducer)
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.playlist}
                    renderItem={this.renderSongs.bind(this)}
                    keyExtractor = {(item, index)=>index.toString()}>
                </FlatList>
                <SongMoreView
                    isVisible = {this.state.isSongMoreViewVisible}
                    songName = {this.state.selectedSongName}
                    artist = {this.state.selectedArtist}
                    canDownload = {true}
                    onDownloadButtonPress = {this.onDownloadButtonPress.bind(this)}
                    onAddToPlaylistButtonPress = {this.onAddToPlaylistButtonPress.bind(this)}
                    onAddToOnlineSongsButtonPress = {this.onAddToOnlineSongsButtonPress.bind(this)}
                    onCloseButtonPress = {this.onCloseSongMoreViewButtonPress.bind(this)}
                />
                <AddToPlaylistView
                    isVisible = {this.state.isAddToPlaylistViewVisible}
                    onCloseButtonPress = {this.onCloseAddToPlaylistButtonPress.bind(this)}
                    onPlaylistButtonPress = {this.onDoneAddToPlaylistButtonPress.bind(this)}
                    playlists = {this.props.onlinePlaylists}
                />
                <Toast
                    ref={this.toast}
                    style={{backgroundColor:'white'}}
                    position='bottom'
                    textStyle={{color:'black'}}
                    positionValue={200}
                />
            </View>
        )

    }
}

function mapStateToProps(state)
{
    return {
        playlists: state.playlists.playlists,
        user: state.user.user,
        onlinePlaylists: state.user.onlinePlaylists,
        onlineSongs: state.user.onlineSongs
    }
}

export default connect(mapStateToProps)(AHomePlaylist);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
    },
    button:{
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,102,128,255)',
        paddingLeft: 20
    },
    buttonText:{
        fontSize: 20,
        color: 'white',
    }
});


