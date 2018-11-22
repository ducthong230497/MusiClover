import React, {Component} from 'react'
import {AsyncStorage} from 'react-native'
import {connect} from 'react-redux'

import Playlists from './children/Playlists'

class OfflinePlaylists extends Component{

    storeData = async (name, value) => {
        try {
          await AsyncStorage.setItem(name, value);
        } catch (error) {
          console.log('Something went wrong!');
        }
    }

    onCreatePlaylistPress(newPlaylistName)
    {
        if(this.props.offlinePlaylists.findIndex(playlist=>playlist.name === newPlaylistName.trim()) === -1 && /\S/.test(newPlaylistName))
        {
            let newPlaylists = [...this.props.offlinePlaylists,{
                imgUrl: 'http://www.kensap.org/wp-content/uploads/empty-photo.jpg',
                name: newPlaylistName.trim(),
                songCount: 0,
                songs: []
            }];

            //save to redux
            this.props.dispatch({type: 'SetOfflinePlaylists', offlinePlaylists: newPlaylists});

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
        let deletedIndex = this.props.offlinePlaylists.findIndex(playlist=>playlist.name === deletedPlaylistName);
        if(deletedIndex !== -1)
        {
            let newPlaylists = [...this.props.offlinePlaylists];
            newPlaylists.splice(deletedIndex,1);
            if(newPlaylists.length === 0) newPlaylists = [];
            
            //save to redux
            this.props.dispatch({type: 'SetOfflinePlaylists', offlinePlaylists: newPlaylists});

            //save new playlist to local
            this.storeData('playlists', JSON.stringify(newPlaylists));
        }

        return true;
    }

    onPlaylistButtonPress(playlist)
    {
        this.props.dispatch({type: 'AddPlaylist', name: 'Personal', playlist: playlist.songs})
        this.props.navigation.navigate('AOfflinePlaylist', {currentPlaylist: playlist})
    }

    render(){
        return (
            <Playlists
                playlists = {this.props.offlinePlaylists}
                onCreatePlaylistPress = {this.onCreatePlaylistPress.bind(this)}
                onDeletePlaylistPress = {this.onDeletePlaylistPress.bind(this)}
                onPlaylistButtonPress = {this.onPlaylistButtonPress.bind(this)}
            ></Playlists>
        )

    }
}

function mapStateToProps(state)
{
    return {
        offlinePlaylists: state.user.offlinePlaylists
    }
}

export default connect(mapStateToProps)(OfflinePlaylists);


