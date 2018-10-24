import React, {Component} from 'react'
import {View,Text, TouchableHighlight, StyleSheet, FlatList} from 'react-native'
import {Icon} from 'react-native-elements'
import {connect} from 'react-redux'
import Toast from 'react-native-easy-toast'

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
            selectedSongURL: '',
        }

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
        this.props.dispatch({type: 'SetTrackList', tracks: this.props.songs})
        this.props.dispatch({type: 'SetSelectedTrackIndex', selectedTrackIndex: index})
        this.props.dispatch({type: 'ShowMaximizer'});
        this.props.dispatch({type: 'Resume'});
        this.props.navigation.navigate('SongPlayer');

        this.props.dispatch({
            type: 'SetSelectedTrackInfo', 
            selectedTrackURL: this.props.songs[index].songUrl, 
            selectedTrackImage: this.props.songs[index].imgUrl
        })
        
    }

    onMoreButtonPress(index)
    {
        currentSong = this.props.songs[index];
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


        return (
            <View style={styles.container}>
                {
                    this.props.isAddSongButtonVisible?
                    (<TouchableHighlight underlayColor = 'rgb(150,150,150)' onPress = {this.onOpenAddSongViewButtonPress.bind(this)}>
                        <View style = {styles.button}>
                            <Icon name = 'add-circle' size = {24} color = 'white' containerStyle={{paddingRight:5}}></Icon>
                            <Text style = {styles.buttonText}>Add Songs</Text>
                        </View>
                    </TouchableHighlight>)
                    :null
                }
                <FlatList
                    data={this.props.songs}
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
                <AddToPlaylistView
                    isVisible = {this.state.isAddToPlaylistViewVisible}
                    onCloseButtonPress = {this.onCloseAddToPlaylistButtonPress.bind(this)}
                    onPlaylistButtonPress = {this.onDoneAddToPlaylistButtonPress.bind(this)}
                    playlists = {this.props.playlists}
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
       
    }
}

export default connect()(AOfflinePlaylist);

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


