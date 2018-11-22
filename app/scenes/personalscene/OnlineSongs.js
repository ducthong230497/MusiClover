import React, {Component} from 'react'
import Songs from './children/Songs'
import LoginButton from './children/LoginButton'
import AOnlinePlaylist from './AOnlinePlaylist'

import {connect} from 'react-redux'

class OnlineSongs extends Component{

    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        this.props.dispatch({type: 'AddPlaylist', name: 'Personal', playlist: this.props.onlineSongs})
    }

    render(){

        if(this.props.user===null)
        {
            return (
                <LoginButton navigation = {this.props.navigation}></LoginButton>
            )
        }

        return (
            <AOnlinePlaylist 
            navigation = {this.props.navigation}
            canRemoveFromOnlineSongs = {true}
            disableRemoveFromPlaylist = {true}
            disableAddToOnlineSongs = {true}
            ></AOnlinePlaylist>
        )
    }
}

function mapStateToProps(state)
{
    return {
        user: state.user.user,
        onlineSongs: state.user.onlineSongs
    }
}

export default connect(mapStateToProps)(OnlineSongs);



