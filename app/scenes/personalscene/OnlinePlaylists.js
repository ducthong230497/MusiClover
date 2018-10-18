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

    componentDidMount() {
        
    }
  
    componentWillUnmount() {
        this.unsubscribe();
    }

    getUserCollection()
    {
        this.userCollection = Firebase.firestore().collection(this.props.user.email);

        this.unsubscribe = this.userCollection.doc("OnlineData").collection('Playlists').onSnapshot((querySnapshot)=>{
            const playlists = [];
            querySnapshot.forEach((doc) => {             
                const { name, imgUrl, songCount,songs } = doc.data();
                playlists.push({
                    name: name,
                    imgUrl: imgUrl,
                    songCount: songCount,
                    songs: songs
                });
            });

            this.props.dispatch({type: 'SetOnlinePlaylists', onlinePlaylists: playlists})
        }) 
    }

    onCreatePlaylistPress(newPlaylistName)
    {

        if(this.props.onlinePlaylists.findIndex(playlist=>playlist.name === newPlaylistName.trim()) === -1 && /\S/.test(newPlaylistName))
        {
            this.userCollection.doc("OnlineData").collection('Playlists').doc(newPlaylistName.trim()).set({
                name: newPlaylistName.trim(),
                imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
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
        this.userCollection.doc(deletedPlaylistName).delete();

        return true;
    }

    onPlaylistButtonPress(playlist)
    {
        this.props.navigation.navigate('APlaylist', {canAddSong: false, songs: playlist.songs})
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
            <Playlists
                playlists = {this.props.onlinePlaylists}
                onCreatePlaylistPress = {this.onCreatePlaylistPress.bind(this)}
                onDeletePlaylistPress = {this.onDeletePlaylistPress.bind(this)}
                onPlaylistButtonPress = {this.onPlaylistButtonPress.bind(this)}
            >
            </Playlists>
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



