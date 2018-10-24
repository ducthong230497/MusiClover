import React, {Component} from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import {connect} from 'react-redux'
import {getXmlURL, getDataFromXmlURL} from '../../connector/connector'
import Firebase from 'react-native-firebase'
import Toast from 'react-native-easy-toast'

import SongButton from '../_components/SongButton'
import SongMoreView from '../_components/SongMoreView'
import AddToPlaylistView from '../_components/AddToPlaylistView'

class AOnlinePlaylist extends Component{
    
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
        this.props.dispatch({
            type: 'Start', 
            tracks: this.playlist, 
            selectedTrackIndex: index
        })

        this.props.navigation.navigate('SongPlayer');
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
        }]);

        //store new song to firebase
        userCollection.collection('Playlists').doc(playlist.name).set({
            songCount: playlist.songCount + 1,
            songs: songs
        }, { merge: true })

        //hide
        this.setState({isAddToPlaylistViewVisible:false, isSongMoreViewVisible: false});
        // //update redux
        // this.props.dispatch({type: 'AddPlaylist', name: 'Personal', playlist: songs})
        //toast
        this.toast.current.show('Added to playlist');
    }

    onRemoveFromPlaylistButtonPress()
    {
        let currentPlaylist = this.props.navigation.getParam('currentPlaylist');
        let currentSongs = currentPlaylist.songs;
        let indexToRemove = currentSongs.findIndex(song => song.songURL === this.state.selectedSongURL);
        currentSongs.splice(indexToRemove, 1);
  
        //store new song to firebase
        Firebase.firestore().collection(this.props.user.email).doc('OnlineData').collection('Playlists').doc(currentPlaylist.name).set({
            songCount: currentSongs.length,
            songs: currentSongs
        }, { merge: true })

        //hide
        this.setState({isSongMoreViewVisible: false});
        //update redux
        this.props.dispatch({type: 'AddPlaylist', name: 'Personal', playlist: currentSongs})
        //toast
        this.toast.current.show('Removed from playlist');
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

    onRemoveFromOnlineSongsButtonPress()
    {
        let userCollection = Firebase.firestore().collection(this.props.user.email).doc('OnlineData');

        let songs = [...this.props.onlineSongs];
        let indexToRemove = songs.findIndex(song => song.songURL === this.state.selectedSongURL);
        songs.splice(indexToRemove,1);

        userCollection.set({
            songs: songs
        })

        //hide
        this.setState({isSongMoreViewVisible: false});
        //update redux
        this.props.dispatch({type: 'AddPlaylist', name: 'Personal', playlist: songs})
        //toast
        this.toast.current.show('Removed from online songs');
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
        let playlist = this.props.playlists.find(playlist => playlist.name === 'Personal')
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
                    canRemoveFromPlaylist = {!this.props.disableRemoveFromPlaylist}
                    canRemoveFromOnlineSongs = {this.props.canRemoveFromOnlineSongs}
                    canAddToOnlineSongs = {!this.props.disableAddToOnlineSongs}
                    songName = {this.state.selectedSongName}
                    artist = {this.state.selectedArtist}
                    onAddToPlaylistButtonPress = {this.onAddToPlaylistButtonPress.bind(this)}
                    onRemoveFromPlaylistButtonPress = {this.onRemoveFromPlaylistButtonPress.bind(this)}
                    onAddToOnlineSongsButtonPress = {this.onAddToOnlineSongsButtonPress.bind(this)}
                    onRemoveFromOnlineSongsButtonPress = {this.onRemoveFromOnlineSongsButtonPress.bind(this)}
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
        onlineSongs: state.user.onlineSongs,
    }
}

export default connect(mapStateToProps)(AOnlinePlaylist);

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


