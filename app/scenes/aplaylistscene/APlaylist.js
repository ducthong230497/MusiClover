import React, {Component} from 'react'
import {View,Text, TouchableHighlight, StyleSheet, FlatList} from 'react-native'
import {Icon} from 'react-native-elements'
import {connect} from 'react-redux'

import SongAddView from './SongAddView'
import SongButton from '../_components/SongButton'
import SongMoreView from './SongMoreView'

class APlaylist extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            isAddSongViewVisisble: false,
            isSongMoreViewVisible: false,
            selectedSongName: '',
            selectedArtist: ''
        }

        this.playlist = [];
    }
  
    
    onOpenAddSongViewButtonPress()
    {
        this.setState({isAddSongViewVisisble: true});
    }

    onCancelAddingSongPress()
    {
        this.setState({isAddSongViewVisisble: false});
    }

    onAddSongButtonPress()
    {
        
    }

    onSongButtonPress(index)
    {
        this.props.dispatch({type: 'SetTrackList', tracks: this.playlist})
        this.props.dispatch({type: 'SetSelectedTrackIndex', selectedTrackIndex: index})
        this.props.dispatch({type: 'ShowMaximizer'});

        this.props.navigation.navigate('SongPlayer');
    }

    onMoreButtonPress(index)
    {
        currentSong = this.playlist[index];
        this.setState({selectedSongName:currentSong.songName, selectedArtist: currentSong.artist, isSongMoreViewVisible: true});
    }

    onCloseSongMoreViewButtonPress()
    {
        this.setState({isSongMoreViewVisible:false});
    }

    onAddToPlaylistButtonPress()
    {
        
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

        let playlist = this.props.playlists.find(playlist => playlist.name === this.props.navigation.getParam('playlistName'))
        if(playlist != null)
        {
            this.playlist = Object.values(playlist)
            this.playlist.pop() //pop the final item which is the variable 'name' we have put to playlist (see playlistsReducer)
        }
        console.log(this.props.playlists);
        return (
            <View style={styles.container}>
                {
                    this.props.navigation.getParam('canAddSong')?
                    (<TouchableHighlight underlayColor = 'rgb(150,150,150)' onPress = {this.onOpenAddSongViewButtonPress.bind(this)}>
                        <View style = {styles.button}>
                            <Icon name = 'add-circle' size = {24} color = 'white' containerStyle={{paddingRight:5}}></Icon>
                            <Text style = {styles.buttonText}>Add Songs</Text>
                        </View>
                    </TouchableHighlight>)
                    :null
                }
                <FlatList
                    data={this.playlist}
                    renderItem={this.renderSongs.bind(this)}
                    keyExtractor = {(item, index)=>index.toString()}>
                </FlatList>
                <SongAddView
                    isVisible = {this.state.isAddSongViewVisisble}
                    onAddSongButtonPress = {this.onAddSongButtonPress.bind(this)}
                    onCancelButtonPress = {this.onCancelAddingSongPress.bind(this)} 
                />
                <SongMoreView
                    isVisible = {this.state.isSongMoreViewVisible}
                    playlist = {false}
                    songName = {this.state.selectedSongName}
                    artist = {this.state.selectedArtist}
                    onAddToPlaylistButtonPress = {this.onAddToPlaylistButtonPress.bind(this)}
                    onCloseButtonPress = {this.onCloseSongMoreViewButtonPress.bind(this)}
                />
            </View>
        )

    }
}

function mapStateToProps(state)
{
    return {
        playlists: state.playlists.playlists
    }
}

export default connect(mapStateToProps)(APlaylist);

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


