import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import SongButton from './components/SongButton'
import {connect} from 'react-redux'

import {getTop100NhacTre} from '../../connector/connector'


class OnlinePlaylists extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            tracks: getTop100NhacTre()
        }
    }

    onSongButtonPress(trackIndex)
    {
        console.log("TrackIndex" + trackIndex);
        this.props.dispatch({type: 'SetupTrackList', tracks: this.state.tracks,initialTrackIndex: trackIndex})
        this.props.navigation.navigate('SongPlayer');
    }

    

    renderPlaylist = ({index, item}) => (
        <SongButton 
        imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        songName = {item.songName}
        artistName = {item.artist}
        songIndex = {index}
        onSongButtonPress = {this.onSongButtonPress.bind(this)}
        onDeleteButtonPress = {() => this.setState({isDeleteSongViewVisible: true, deletedSong: item.songName})}>
        </SongButton>
    );
    

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.tracks}
                    renderItem={this.renderPlaylist.bind(this)}
                    keyExtractor = {(item)=>item.audioUrl}>
                </FlatList>
            </View>
        )

    }
}


export default connect()(OnlinePlaylists);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
    },

});


