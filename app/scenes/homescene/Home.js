import React, {Component} from 'react'
import {View,Text,StyleSheet, ScrollView, FlatList} from 'react-native'
import {connect} from 'react-redux'
import {createStackNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements'

import {getTop100NhacTre} from '../../connector/connector'
import TopPlaylistButton from './TopPlaylistButton'
import APlaylist from '../aplaylistscene/APlaylist'

class Home extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            topPlaylists: [
                {
                    name : 'Top 100 Nhạc Trẻ',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songsFetcher: () => getTop100NhacTre()
                },
                {
                    name : 'Top 100 Nhạc Trẻ',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songsFetcher: () => getTop100NhacTre()
                },
                {
                    name : 'Top 100 Nhạc Trẻ',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songsFetcher: () => getTop100NhacTre()
                },
                {
                    name : 'Top 100 Nhạc Trẻ',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songsFetcher: () => getTop100NhacTre()
                },
                {
                    name : 'Top 100 Nhạc Trẻ',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songsFetcher: () => getTop100NhacTre()
                },
            ]
        }
    }

    onTopPlaylistPress(songsFetcher)
    {
        const songs = songsFetcher()
        this.props.navigation.navigate('APlaylist', {canAddSong: false, songs: songs});
    }

    renderTopPlaylists = ({item}) => (
        <TopPlaylistButton
            name = {item.name}
            imgUrl = {item.imgUrl}
            songsFetcher = {item.songsFetcher}
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

const HomeScene =  connect(mapStateToProps)(Home);

export default StackNavigator = createStackNavigator({
    Main: {
        screen: HomeScene,
        navigationOptions: ()=>({
            header:null,      

        })
    },
    APlaylist:{
        screen: APlaylist,
        navigationOptions: ()=>({
            headerTitle:'Playlist',     
        })
    }
},
{ //router config
    navigationOptions:{
        headerTitleStyle:{
            color: 'white'
        },
        headerStyle:{
            backgroundColor: 'rgba(30,30,30,255)',
        },
        headerBackImage: () => (
            <Icon name = 'keyboard-arrow-left' color = 'white'></Icon>
          )     
    },
    headerLayoutPreset: 'center' 
}
);

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgb(4,4,4)',
        flex: 1
    },
    
});


