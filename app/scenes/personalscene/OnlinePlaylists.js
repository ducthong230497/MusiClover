import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Playlists from './children/Playlists'
import LoginButton from './children/LoginButton'

import {connect} from 'react-redux'
import Firebase from 'react-native-firebase'

class OnlinePlaylists extends Component {

    constructor(props)
    {
        super(props);

        this.userCollection = null;
    }

    getUserCollection()
    {
        this.userCollection = Firebase.firestore().collection(this.props.user.email);
    }

    onCreatePlaylistPress(newPlaylistName)
    {

        if(this.props.onlinePlaylists.findIndex(playlist=>playlist.name === newPlaylistName.trim()) === -1 && /\S/.test(newPlaylistName))
        {
            this.userCollection.doc("OnlineData").collection('Playlists').doc(newPlaylistName.trim()).set({
                name: newPlaylistName.trim(),
                imgUrl: 'http://www.kensap.org/wp-content/uploads/empty-photo.jpg',
                songCount: 0,
                songs: []
            })

            return true;
        }
        else
        {
            return false;
        }

    }

    onDeletePlaylistPress(deletedPlaylistName)
    {
        this.userCollection.doc("OnlineData").collection('Playlists').doc(deletedPlaylistName).delete();

        return true;
    }

    onPlaylistButtonPress(playlist)
    {
        this.props.dispatch({type: 'AddPlaylist', name: 'Personal', playlist: playlist.songs})
        this.props.navigation.navigate('APlaylist', {canAddSong: false, playlistName: 'Personal'})
    }


    render() {
        
        if(this.props.user===null)
        {
            return (
                <LoginButton navigation = {this.props.navigation}></LoginButton>
            )
        }

        if(this.userCollection===null)
        {
            this.getUserCollection();
        }

        return (
            <View style = {styles.container}>
                <Playlists
                    playlists = {this.props.onlinePlaylists}
                    onCreatePlaylistPress = {this.onCreatePlaylistPress.bind(this)}
                    onDeletePlaylistPress = {this.onDeletePlaylistPress.bind(this)}
                    onPlaylistButtonPress = {this.onPlaylistButtonPress.bind(this)}
                >
                </Playlists>
            </View>
        )

    }
}

function mapStateToProps(state)
{
    return {
        user: state.user.user,
        onlinePlaylists: state.user.onlinePlaylists
    }
}

export default connect(mapStateToProps)(OnlinePlaylists);


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(4,4,4)'
    },
    
});

