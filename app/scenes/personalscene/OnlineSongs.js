import React, {Component} from 'react'

import Songs from './children/Songs'

export default class OnlineSongs extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            songs: [
               
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



