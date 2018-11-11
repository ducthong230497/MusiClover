import React, {Component} from 'react'
import {View, StyleSheet, FlatList, Text, SectionList} from 'react-native'
import {connect} from 'react-redux'
import {getXmlURL, getDataFromXmlURL} from '../../connector/connector'
import Firebase from 'react-native-firebase'
import Toast from 'react-native-easy-toast'

import SongButton from '../_components/SongButton'
import SongMoreView from '../_components/SongMoreView'
import AddToPlaylistView from '../_components/AddToPlaylistView'

class AOnlinePlaylist extends Component{
    
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
        this.props.dispatch({
            type: 'Start', 
            tracks: this.playlist, 
            selectedTrackIndex: index
        })

        this.props.navigation.navigate('SongPlayer');
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

    onDoneAddToPlaylistButtonPress(playlist)
    {
        let userCollection = Firebase.firestore().collection(this.props.user.email).doc('OnlineData');

        //get song image as playlist image
        if(playlist.songCount==0)
        {
            getXmlURL(this.state.selectedSongURL).then(xmlUrl=> {
                getDataFromXmlURL(xmlUrl).then(data => {
                    //store playlist image to firebase
                    userCollection.collection('Playlists').doc(playlist.name).set({
                        imgUrl: data.img,
                    }, { merge: true })
                });
            });
        }

        let songs = playlist.songs.concat([{
            songName: this.state.selectedSongName,
            artist: this.state.selectedArtist,
            songURL: this.state.selectedSongURL,
        }]);

        //store new song to firebase
        userCollection.collection('Playlists').doc(playlist.name).set({
            songCount: playlist.songCount + 1,
            songs: songs
        }, { merge: true })

        //hide
        this.setState({isAddToPlaylistViewVisible:false, isSongMoreViewVisible: false});
        // //update redux
        // this.props.dispatch({type: 'AddPlaylist', name: 'Personal', playlist: songs})
        //toast
        this.toast.current.show('Added to playlist');
    }

    onRemoveFromPlaylistButtonPress()
    {
        let currentPlaylist = this.props.navigation.getParam('currentPlaylist');
        let currentSongs = currentPlaylist.songs;
        let indexToRemove = currentSongs.findIndex(song => song.songURL === this.state.selectedSongURL);
        currentSongs.splice(indexToRemove, 1);
  
        //store new song to firebase
        Firebase.firestore().collection(this.props.user.email).doc('OnlineData').collection('Playlists').doc(currentPlaylist.name).set({
            songCount: currentSongs.length,
            songs: currentSongs
        }, { merge: true })

        //hide
        this.setState({isSongMoreViewVisible: false});
        //update redux
        this.props.dispatch({type: 'AddPlaylist', name: 'Personal', playlist: currentSongs})
        //toast
        this.toast.current.show('Removed from playlist');
    }

    onAddToOnlineSongsButtonPress(){
        let userCollection = Firebase.firestore().collection(this.props.user.email).doc('OnlineData');
        userCollection.set({
            songs: this.props.onlineSongs.concat([{
                songName: this.state.selectedSongName,
                artist: this.state.selectedArtist,
                songURL: this.state.selectedSongURL,
            }])
        })

        //hide
        this.setState({isSongMoreViewVisible: false});
        // //update redux
        // this.props.dispatch({type: 'AddPlaylist', name: 'Personal', playlist: this.props.onlineSongs})
        //toast
        this.toast.current.show('Added to online songs');
    }

    onRemoveFromOnlineSongsButtonPress()
    {
        let userCollection = Firebase.firestore().collection(this.props.user.email).doc('OnlineData');

        let songs = [...this.props.onlineSongs];
        let indexToRemove = songs.findIndex(song => song.songURL === this.state.selectedSongURL);
        songs.splice(indexToRemove,1);

        userCollection.set({
            songs: songs
        })

        //hide
        this.setState({isSongMoreViewVisible: false});
        //update redux
        this.props.dispatch({type: 'AddPlaylist', name: 'Personal', playlist: songs})
        //toast
        this.toast.current.show('Removed from online songs');
    }

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

    getSongList(){
        this.sectionList = [];
        this.playlist = [];

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
                this.playlist = this.playlist.concat(section.data);
                section.index = index;
                index +=section.data.length;
            });
        }
    }

    render(){
        this.getSongList();

        return (
            <View style={styles.container}>
                {/* <FlatList
                    data={this.playlist}
                    renderItem={this.renderSongs.bind(this)}
                    keyExtractor = {(item, index)=>index.toString()}>
                </FlatList> */}
                <SectionList
                    sections = {this.sectionList}
                    renderItem = {this.renderSectionSongs.bind(this)}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title.toUpperCase()}</Text>}
                    keyExtractor={(item, index) => index}>
                </SectionList>
                <SongMoreView
                    isVisible = {this.state.isSongMoreViewVisible}
                    canRemoveFromPlaylist = {!this.props.disableRemoveFromPlaylist}
                    canRemoveFromOnlineSongs = {this.props.canRemoveFromOnlineSongs}
                    canAddToOnlineSongs = {!this.props.disableAddToOnlineSongs}
                    songName = {this.state.selectedSongName}
                    artist = {this.state.selectedArtist}
                    onAddToPlaylistButtonPress = {this.onAddToPlaylistButtonPress.bind(this)}
                    onRemoveFromPlaylistButtonPress = {this.onRemoveFromPlaylistButtonPress.bind(this)}
                    onAddToOnlineSongsButtonPress = {this.onAddToOnlineSongsButtonPress.bind(this)}
                    onRemoveFromOnlineSongsButtonPress = {this.onRemoveFromOnlineSongsButtonPress.bind(this)}
                    onCloseButtonPress = {this.onCloseSongMoreViewButtonPress.bind(this)}
                />
                <AddToPlaylistView
                    isVisible = {this.state.isAddToPlaylistViewVisible}
                    onCloseButtonPress = {this.onCloseAddToPlaylistButtonPress.bind(this)}
                    onPlaylistButtonPress = {this.onDoneAddToPlaylistButtonPress.bind(this)}
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
        onlineSongs: state.user.onlineSongs,
    }
}

export default connect(mapStateToProps)(AOnlinePlaylist);

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


