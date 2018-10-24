import React, {Component} from 'react'
import {AsyncStorage} from 'react-native'
import {connect} from 'react-redux'

import AOfflinePlaylist from './AOfflinePlaylist';

class OfflineSongs extends Component{

    componentDidMount(){
        this.props.dispatch({type: 'AddPlaylist', name: 'Personal', playlist: this.props.offlineSongs})
    }

    render(){

        return (
            <AOfflinePlaylist
            navigation = {this.props.navigation}
            >
            </AOfflinePlaylist>
        )
    }
}

function mapStateToProps(state){
    return {
        offlineSongs: state.user.offlineSongs
    }
}

export default connect(mapStateToProps)(OfflineSongs);



