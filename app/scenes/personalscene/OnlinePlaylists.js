import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import SongButton from './components/SongButton'
import {getTop100NhacTre} from '../connector/connector'

export default class OnlinePlaylists extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            listSong: getTop100NhacTre()
        }
    }

    componentDidMount() {
        
    }

    onSongButtonPress(songURL)
    {
        this.props.navigation.navigate('SongPlayer');
    }

    

    renderPlaylist = ({item}) => (
        <SongButton 
        imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        songName = {item.song}
        artistName = {item.singer}
        onSongButtonPress = {this.onSongButtonPress.bind(this)}
        onDeleteButtonPress = {() => this.setState({isDeleteSongViewVisible: true, deletedSong: item.songName})}>
        </SongButton>
    );
    

    render() {
        // use the variable listSong to render song
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.listSong}
                    renderItem={this.renderPlaylist.bind(this)}
                    keyExtractor = {(item)=>item.URL}>
                </FlatList>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
    },

});


