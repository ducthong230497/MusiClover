import React, {Component} from 'react'
import {View,Text, TouchableHighlight, StyleSheet, FlatList} from 'react-native'
import {Icon} from 'react-native-elements'
import {connect} from 'react-redux'
import Toast from 'react-native-easy-toast'
import RNFetchBlob from 'rn-fetch-blob'
import {AsyncStorage} from 'react-native'

import SongButton from '../_components/SongButton'
import SongAddView from '../_components/SongAddView'
import SongMoreView from '../_components/SongMoreView'
import AddToPlaylistView from '../_components/AddToPlaylistView'

class AOfflinePlaylist extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            isAddSongViewVisisble: false,
            isSongMoreViewVisible: false,
            isAddToPlaylistViewVisible: false,
            selectedSongName: '',
            selectedArtist: '',
            URL: '',
            img: '',
        }

        this.songs = [];
        this.toast = React.createRef();
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
        this.props.dispatch({
            type: 'Start', 
            tracks: this.songs, 
            selectedTrackIndex: index
        })

        this.props.navigation.navigate('SongPlayer');
     
    }

    onMoreButtonPress(index)
    {
        currentSong = this.songs[index];
        this.setState({
            selectedSongName:currentSong.songName, 
            selectedArtist: currentSong.artist, 
            URL: currentSong.URL,
            img: currentSong.img,
            isSongMoreViewVisible: true
        });
        
    }

    onCloseSongMoreViewButtonPress()
    {
        this.setState({isSongMoreViewVisible:false});
    }

    onAddToPlaylistButtonPress()
    {
        this.setState({isAddToPlaylistViewVisible: true});
    }

    onCloseAddToPlaylistButtonPress()
    {
        this.setState({isAddToPlaylistViewVisible: false});
    }

    onDoneAddToPlaylistButtonPress(playlist)
    {
        

        //hide
        this.setState({isAddToPlaylistViewVisible:false, isSongMoreViewVisible: false});

        //toast
        this.toast.current.show('Added to playlist');
    }

    onRemoveFromOfflineSongsButtonPress()
    {
        // remove song
        RNFetchBlob.fs.unlink(this.state.URL).then(() => {
            console.log('remove successfully');
        })
        //remove img
        RNFetchBlob.fs.unlink(this.state.img).then(() => {
            console.log('remove successfully');
        })

        //remove from song list
        songs = [...this.songs];
        let indexToRemove = songs.findIndex(song => song.URL === this.state.URL)
        songs.splice(indexToRemove, 1);
        this.storeData('songs', JSON.stringify(songs));

        //update redux
        this.props.dispatch({type: 'AddPlaylist', name: 'Personal', playlist: songs})

        //hide
        this.setState({isSongMoreViewVisible: false});

        //toast
        this.toast.current.show('Removed from offline songs');
    }

    storeData = async (name, value) => {
        try {
          await AsyncStorage.setItem(name, value);
        } catch (error) {
          console.log('Something went wrong!');
        }
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

        let songs = this.props.playlists.find(playlist => playlist.name === 'Personal')
        if(songs != null)
        {
            this.songs = Object.values(songs)
            this.songs.pop() //pop the final item which is the variable 'name' we have put to playlist (see playlistsReducer)
        }

        return (
            <View style={styles.container}>
                {this.props.isAddSongButtonVisible?
                (<TouchableHighlight underlayColor = 'rgb(150,150,150)' onPress = {this.onOpenAddSongViewButtonPress.bind(this)}>
                    <View style = {styles.button}>
                        <Icon name = 'add-circle' size = {24} color = 'white' containerStyle={{paddingRight:5}}></Icon>
                        <Text style = {styles.buttonText}>Add Songs</Text>
                    </View>
                </TouchableHighlight>)
                :null}
                <FlatList
                    data={this.songs}
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
                    canRemoveFromOfflineSongs = {true}
                    songName = {this.state.selectedSongName}
                    artist = {this.state.selectedArtist}
                    onRemoveFromOfflineSongsButtonPress = {this.onRemoveFromOfflineSongsButtonPress.bind(this)}
                    onAddToPlaylistButtonPress = {this.onAddToPlaylistButtonPress.bind(this)}
                    onCloseButtonPress = {this.onCloseSongMoreViewButtonPress.bind(this)}
                />
                <AddToPlaylistView
                    isVisible = {this.state.isAddToPlaylistViewVisible}
                    onCloseButtonPress = {this.onCloseAddToPlaylistButtonPress.bind(this)}
                    onPlaylistButtonPress = {this.onDoneAddToPlaylistButtonPress.bind(this)}
                    playlists = {this.props.offlinePlaylists}
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
        offlinePlaylists: state.user.offlinePlaylists
    }
}

export default connect(mapStateToProps)(AOfflinePlaylist);

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


