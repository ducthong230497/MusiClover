import React, {Component} from 'react'
import AOfflinePlaylist from './AOfflinePlaylist';
import {AsyncStorage} from 'react-native'

export default class OfflineSongs extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            songs: []
        }
    }

    componentDidMount(){
        this.retrieveData();
    }

    retrieveData = async () => {
        try {
          let songs = await AsyncStorage.getItem('songs');
          console.log(songs)
          if(songs !==null)
          {
            this.setState({songs: JSON.parse(songs)});
          }
         } catch (error) {
            console.log('Something wrong!' + error);
         }
    }

    render(){

        return (
            <AOfflinePlaylist
            navigation = {this.props.navigation}
            songs = {this.state.songs}
            >
            </AOfflinePlaylist>
        )
    }
}



