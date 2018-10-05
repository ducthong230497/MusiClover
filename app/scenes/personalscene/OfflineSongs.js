import React, {Component} from 'react'
import {View,FlatList,StyleSheet} from 'react-native'
import SongButton from '../_components/SongButton'

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

    onSongButtonPress()
    {

    }

    renderSongs = ({item}) => (
        <SongButton 
            imgUrl = {item.imgUrl}
            songName = {item.songName}
            artistName = {item.artistName}
            onSongButtonPress = {this.onSongButtonPress.bind(this)}
            onDeleteButtonPress = {() => this.setState({isDeleteSongViewVisible: true, deletedSong: item.songName})}>
        </SongButton>
    );

    render(){

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.songs}
                    renderItem={this.renderSongs.bind(this)}
                    keyExtractor = {(item)=>item.songName}>
                </FlatList>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(4,4,4)'
    },
    
});


