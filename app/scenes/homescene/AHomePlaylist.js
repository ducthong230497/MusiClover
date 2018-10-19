import React, {Component} from 'react'
import {View,Text, TouchableHighlight, StyleSheet, FlatList} from 'react-native'
import {Icon} from 'react-native-elements'
import {connect} from 'react-redux'
import {getXmlURL, getDataFromXmlURL} from '../../connector/connector'
import Firebase from 'react-native-firebase'
import Toast from 'react-native-easy-toast'

import SongButton from '../_components/SongButton'
import SongAddView from '../_components/SongAddView'
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

    onPlaylistButtonPress(playlist)
    {
        //get song image as playlist image
        if(playlist.songCount==0)
        {
            getXmlURL(this.state.selectedSongURL).then(xmlUrl=> {
                getDataFromXmlURL(xmlUrl).then(data => {
                    //store playlist image to firebase
                    Firebase.firestore().collection(this.props.user.email).doc('OnlineData').collection('Playlists').doc(playlist.name).set({
                        imgUrl: data.img,
                    }, { merge: true })
                });
            });
        }

        //store new song to firebase
        Firebase.firestore().collection(this.props.user.email).doc('OnlineData').collection('Playlists').doc(playlist.name).set({
            songCount: playlist.songCount + 1,
            songs: playlist.songs.concat([{
                songName: this.state.selectedSongName,
                artist: this.state.selectedArtist,
                songURL: this.state.selectedSongURL,
            }])
        }, { merge: true })

        //hide
        this.setState({isAddToPlaylistViewVisible:false, isSongMoreViewVisible: false});

        //toast
        this.toast.current.show('Added to playlist');
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
        console.log(this.props.playlists);
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.playlist}
                    renderItem={this.renderSongs.bind(this)}
                    keyExtractor = {(item, index)=>index.toString()}>
                </FlatList>
                <SongMoreView
                    isVisible = {this.state.isSongMoreViewVisible}
                    playlist = {false}
                    songName = {this.state.selectedSongName}
                    artist = {this.state.selectedArtist}
                    onAddToPlaylistButtonPress = {this.onAddToPlaylistButtonPress.bind(this)}
                    onCloseButtonPress = {this.onCloseSongMoreViewButtonPress.bind(this)}
                />
                <AddToPlaylistView
                    isVisible = {this.state.isAddToPlaylistViewVisible}
                    onCloseButtonPress = {this.onCloseAddToPlaylistButtonPress.bind(this)}
                    onPlaylistButtonPress = {this.onPlaylistButtonPress.bind(this)}
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


