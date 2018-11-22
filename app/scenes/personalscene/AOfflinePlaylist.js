import React, {Component} from 'react'
import {View,Text, TouchableHighlight, StyleSheet, FlatList, Platform, SectionList} from 'react-native'
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
        //add new song to playlist     
        playlist.imgUrl = Platform.OS === 'android' ? 'file://' + this.state.img : this.state.img;
        playlist.songCount = playlist.songCount + 1;
        playlist.songs.push({
            songName: this.state.selectedSongName,
            artist: this.state.selectedArtist,
            URL: this.state.URL,
            img: this.state.img
        })

        //add new playlist to playlists
        let newOfflinePlaylists = [...this.props.offlinePlaylists]
        let indexToChange = this.props.offlinePlaylists.findIndex(p => p.name == playlist.name);
        newOfflinePlaylists.splice(indexToChange,1,playlist);

        //save to local
        this.storeData('playlists',JSON.stringify(newOfflinePlaylists));

        //save to redux
        this.props.dispatch({type: 'SetOfflinePlaylists', offlinePlaylists: newOfflinePlaylists});

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

    onRemoveFromPlaylistButtonPress()
    {
        let playlist = this.props.navigation.getParam('currentPlaylist');
        playlist.songCount = playlist.songCount - 1;
        let indexToRemove = playlist.songs.findIndex(song => song.URL === this.state.URL);
        playlist.songs.splice(indexToRemove,1);

        //add new playlist to playlists
        let newOfflinePlaylists = [...this.props.offlinePlaylists]
        let indexToChange = this.props.offlinePlaylists.findIndex(p => p.name == playlist.name);
        newOfflinePlaylists.splice(indexToChange,1,playlist);

        //save to local
        this.storeData('playlists',JSON.stringify(newOfflinePlaylists));

        //update redux
        this.props.dispatch({type: 'SetOfflinePlaylists', offlinePlaylists: newOfflinePlaylists});
        this.props.dispatch({type: 'AddPlaylist', name: 'Personal', playlist: playlist.songs})

        //hide
        this.setState({isSongMoreViewVisible: false});

        //toast
        this.toast.current.show('Removed from playlist');
    }

    storeData = async (name, value) => {
        try {
          await AsyncStorage.setItem(name, value);
        } catch (error) {
          console.log('Something went wrong!');
        }
    }

    convertToStandardEnglish = (str) =>
    {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
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

    renderSectionSongs = ({index, section, item}) => (
        <SongButton 
            // imgUrl = {item.albumArtUrl}
            songName = {item.songName}
            artistName = {item.artist}
            songIndex = {index + section.index}
            onSongButtonPress = {this.onSongButtonPress.bind(this)}
            onMoreButtonPress = {this.onMoreButtonPress.bind(this)}>
        </SongButton>
    );

    getSongList(){
        this.sectionList = [];
        this.songs = [];

        let songs = this.props.playlists.find(playlist => playlist.name === 'Personal');

        if(songs != null)
        {
            songs = Object.values(songs)
            songs.pop() //pop the final item which is the variable 'name' we have put to playlist (see playlistsReducer)

            //convert to section list
            let sectionList = []
            songs.forEach(song => {
                let sectionHeader = this.convertToStandardEnglish(song.songName[0]);
                if(sectionHeader.charCodeAt(0)<97 || sectionHeader.charCodeAt(0) > 122){
                    sectionHeader = "#";
                }
                let section = sectionList.find(section=>section.title === sectionHeader);
                if(section)
                {
                    section.data.push(song);
                }
                else
                {
                    let newSection = {title: sectionHeader, data: [song]}
                    sectionList.push(newSection);
                }
            });

            //sort according to alphabet
            sectionList.sort(function(a, b){return a.title.charCodeAt(0) - b.title.charCodeAt(0)})
            //set to sectionList to render later
            this.sectionList = sectionList;
            //set to song list
            let index = 0;
            sectionList.forEach(section => {
                this.songs = this.songs.concat(section.data);
                section.index = index;
                index +=section.data.length;
            });
        }
    }

    render(){

        this.getSongList();

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
                {/* <FlatList
                    data={this.songs}
                    renderItem={this.renderSongs.bind(this)}
                    keyExtractor = {(item, index)=>index.toString()}>
                </FlatList> */}
                <SectionList
                    sections = {this.sectionList}
                    renderItem = {this.renderSectionSongs.bind(this)}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title.toUpperCase()}</Text>}
                    keyExtractor={(item, index) => index}>
                </SectionList>
                <SongAddView
                    isVisible = {this.state.isAddSongViewVisisble}
                    onAddSongButtonPress = {this.onAddSongButtonPress.bind(this)}
                    onCancelButtonPress = {this.onCancelAddingSongPress.bind(this)} 
                />
                <SongMoreView
                    isVisible = {this.state.isSongMoreViewVisible}
                    canRemoveFromOfflineSongs = {this.props.canRemoveFromOfflineSongs}
                    canRemoveFromPlaylist = {!this.props.disableRemoveFromPlaylist}
                    songName = {this.state.selectedSongName}
                    artist = {this.state.selectedArtist}
                    onRemoveFromOfflineSongsButtonPress = {this.onRemoveFromOfflineSongsButtonPress.bind(this)}
                    onRemoveFromPlaylistButtonPress = {this.onRemoveFromPlaylistButtonPress.bind(this)}
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
    },
    sectionHeader: {
        paddingTop: 5,
        paddingLeft: 20,
        paddingBottom: 2,
        fontSize: 15,
        color: "white",
        fontWeight: 'bold',
        backgroundColor: 'rgb(20,20,20)',
    }
});


