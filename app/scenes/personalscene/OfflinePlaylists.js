import React, {Component} from 'react'
import {AsyncStorage} from 'react-native'

import Playlists from './children/Playlists'

export default class OfflinePlaylists extends Component{
    
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
        this.retrieveData();
    }

    storeData = async (name, value) => {
        try {
          await AsyncStorage.setItem(name, value);
        } catch (error) {
          console.log('Something went wrong!');
        }
    }
    removeData = async (name) => {
        try {
          await AsyncStorage.removeItem(name);
        } catch (error) {
          console.log('Something went wrong!');
        }
    }
    retrieveData = async () => {
        try {
          let playlists = await AsyncStorage.getItem('playlists');
          if(playlists !==null)
          {
            this.setState({playlists: JSON.parse(playlists)});
          }
         } catch (error) {
            console.log('Something went wrong!');
         }
    }

    onCreatePlaylistPress(newPlaylistName)
    {
        if(this.state.playlists.findIndex(playlist=>playlist.name === newPlaylistName.trim()) === -1 && /\S/.test(newPlaylistName))
        {
            let newPlaylists = [...this.state.playlists,{
                imgUrl: 'http://www.kensap.org/wp-content/uploads/empty-photo.jpg',
                name: newPlaylistName.trim(),
                songCount: 0
            }];
            //create new playlist
            this.setState({
                playlists: newPlaylists,
            });

            //save new playlist to local
            this.storeData('playlists', JSON.stringify(newPlaylists));

            return true;
        }
        else
        {
            return false;
        }
    }

    onDeletePlaylistPress(deletedPlaylistName)
    {
        let deletedIndex = this.state.playlists.findIndex(playlist=>playlist.name === deletedPlaylistName);
        if(deletedIndex !== -1)
        {
            let newPlaylists = this.state.playlists;
            newPlaylists.splice(deletedIndex,1);
            if(newPlaylists.length === 0) newPlaylists = [];
            //create new playlist
            this.setState({
                playlists: newPlaylists,
            });

            //save new playlist to local
            this.storeData('playlists', JSON.stringify(newPlaylists));
        }

        return true;
    }

    onPlaylistButtonPress(playlist)
    {
        this.props.navigation.navigate('AOfflinePlaylist', {canAddSong: true, songs: []})
    }

    render(){
        return (
            <Playlists
                playlists = {this.state.playlists}
                onCreatePlaylistPress = {this.onCreatePlaylistPress.bind(this)}
                onDeletePlaylistPress = {this.onDeletePlaylistPress.bind(this)}
                onPlaylistButtonPress = {this.onPlaylistButtonPress.bind(this)}
            ></Playlists>
        )

    }
}


