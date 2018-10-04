import React, {Component} from 'react'
import {View,Text,StyleSheet, ScrollView, FlatList} from 'react-native'
import {connect} from 'react-redux'

import TopPlaylistButton from './TopPlaylistButton'
import {getTop100NhacTre} from '../../connector/connector'

class Home extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            topPlaylists: [
                {
                    name : 'Top 100 Nhạc Trẻ',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    playlistFetcher: () => getTop100NhacTre()
                },
                {
                    name : 'Top 100 Nhạc Trẻ',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    playlistFetcher: () => getTop100NhacTre()
                },
                {
                    name : 'Top 100 Nhạc Trẻ',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    playlistFetcher: () => getTop100NhacTre()
                },
                {
                    name : 'Top 100 Nhạc Trẻ',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    playlistFetcher: () => getTop100NhacTre()
                },
                {
                    name : 'Top 100 Nhạc Trẻ',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    playlistFetcher: () => getTop100NhacTre()
                },
            ]
        }
    }

    onTopPlaylistPress(playlistFetcher)
    {
        const playList = playlistFetcher()
    }

    renderTopPlaylists = ({item}) => (
        <TopPlaylistButton
            name = {item.name}
            imgUrl = {item.imgUrl}
            playlistFetcher = {item.playlistFetcher}
            onPress = {this.onTopPlaylistPress.bind(this)}
        />
    )
    
    render(){
        
        return (
            <View style = {styles.container}>
                <FlatList
                    data = {this.state.topPlaylists}
                    renderItem = {this.renderTopPlaylists.bind(this)}
                    keyExtractor = {item => item.name}
                    numColumns={2}
                />
            </View>
        )

    }
}

function mapStateToProps(state)
{
    return {

    }
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgb(4,4,4)',
        flex: 1
    },
    
});


