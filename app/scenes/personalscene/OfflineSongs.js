import React, {Component} from 'react'
import {StyleSheet} from 'react-native'

import Songs from './children/Songs'

export default class OfflineSongs extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            songs: [
                {
                    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songName: "FirstSong",
                    artistName: "Adele"
                },
                {
                    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songName: "SecondSong",
                    artistName: "Super"
                },
            ]
        }
    }

    onSongButtonPress(trackIndex)
    {
        this.props.dispatch({type: 'SetupTrackList', tracks: null,initialTrackIndex: trackIndex})
        this.props.navigation.navigate('SongPlayer');
    }

    render(){

        return (
            <Songs
                songs = {this.state.songs}
                onSongButtonPress = {this.onSongButtonPress.bind(this)}
            >
            </Songs>
        )
    }
}



