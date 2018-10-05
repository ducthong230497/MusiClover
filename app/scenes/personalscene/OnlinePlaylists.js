import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Playlists from './children/Playlists'

export default class OnlinePlaylists extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            playlists: []
        };

    }

    //callback 
    componentDidMount()
    {
        //retrieve all online playlists here
    }

    onCreatePlaylistPress(newPlaylistName)
    {

    }

    onDeletePlaylistPress(deletedPlaylistName)
    {

    }

    onPlaylistButtonPress(playlist)
    {
        this.props.navigation.navigate('APlaylist', {canAddSong: true, songs: []})
    }

    render() {
        return (
            <Playlists
                playlists = {this.state.playlists}
                onCreatePlaylistPress = {this.onCreatePlaylistPress.bind(this)}
                onDeletePlaylistPress = {this.onDeletePlaylistPress.bind(this)}
                onPlaylistButtonPress = {this.onPlaylistButtonPress.bind(this)}
            >
            </Playlists>
        )

    }
}



