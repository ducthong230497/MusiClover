import React, {Component} from 'react'
import Songs from './children/Songs'
import LoginButton from './children/LoginButton'

import {connect} from 'react-redux'
import Firebase from 'react-native-firebase'

class OnlineSongs extends Component{

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

        if(this.props.user===null)
        {
            return (
                <LoginButton navigation = {this.props.navigation}></LoginButton>
            )
        }

        return (
            <Songs
                songs = {this.state.songs}
                onSongButtonPress = {this.onSongButtonPress.bind(this)}
            >
            </Songs>
        )
    }
}

function mapStateToProps(state)
{
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(OnlineSongs);



