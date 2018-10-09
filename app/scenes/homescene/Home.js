import React, {Component} from 'react'
import {View,Text,StyleSheet, ScrollView, FlatList} from 'react-native'
import {connect} from 'react-redux'
import {createStackNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements'

import {getTop100, getTop100Avatar} from '../../connector/connector'
import TopPlaylistButton from './TopPlaylistButton'
import APlaylist from '../aplaylistscene/APlaylist'

class Home extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            topPlaylists: [
                {
                    name : 'Top 100 Nhạc Trẻ Việt',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songsFetcher: () => getTop100('https://www.nhaccuatui.com/playlist/top-100-nhac-tre-hay-nhat-va.m3liaiy6vVsF.html?st=1')
                },
                {
                    name : 'Top 100 Pop USUK',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songsFetcher: () => getTop100('https://www.nhaccuatui.com/playlist/top-100-pop-usuk-hay-nhat-va.zE23R7bc8e9X.html?st=1')
                },
                {
                    name : 'Top 100 Electronica/Dance USUK',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songsFetcher: () => getTop100('https://www.nhaccuatui.com/playlist/top-100-electronicadance-hay-nhat-va.ippIsiqacmnE.html?st=1')
                },
                {
                    name : 'Top 100 Nhạc Hàn',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songsFetcher: () => getTop100('https://www.nhaccuatui.com/playlist/top-100-nhac-han-hay-nhat-va.iciV0mD8L9Ed.html?st=1')
                },
                {
                    name : 'Top 100 Nhạc Hoa',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songsFetcher: () => getTop100('https://www.nhaccuatui.com/playlist/top-100-nhac-hoa-hay-nhat-va.g4Y7NTPP9exf.html?st=1')
                },
                {
                    name : 'Top 100 Nhạc Nhật',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songsFetcher: () => getTop100('https://www.nhaccuatui.com/playlist/top-100-nhac-nhat-hay-nhat-va.aOokfjySrloy.html?st=1')
                },
                {
                    name : 'Top 100 Nhạc Không Lời',
                    imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songsFetcher: () => getTop100('https://www.nhaccuatui.com/top100/top-100-khong-loi.kr9KYNtkzmnA.html')
                },
            ]
        }
    }

    componentDidMount()
    {
        let newTopPlaylists = [...this.state.topPlaylists];

         newTopPlaylists.map(item=> {
            getTop100Avatar('https://www.nhaccuatui.com/playlist/top-100-nhac-tre-hay-nhat-va.m3liaiy6vVsF.html?st=1').then(result=>{
            console.log(result)    
            item.imgUrl = result;
           
           });

        })

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


