import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {getTop100, getListArtist} from '../../connector/connector'

class ArtistScene extends Component {

    constructor(props){
        super(props);
        this.state = {
            listArtist: [],
            topPlaylists: [
                {
                    name : 'Top 100 Nhạc Trẻ Việt',
                    imgUrl : 'https://media.giphy.com/media/QyOI0WGW3vY2s/giphy.gif',
                    link: 'https://www.nhaccuatui.com/playlist/top-100-nhac-tre-hay-nhat-va.m3liaiy6vVsF.html?st=1'
                },
                {
                    name : 'Top 100 Pop USUK',
                    imgUrl : 'https://media.giphy.com/media/QyOI0WGW3vY2s/giphy.gif',
                    link: 'https://www.nhaccuatui.com/playlist/top-100-pop-usuk-hay-nhat-va.zE23R7bc8e9X.html?st=1'
                },
                {
                    name : 'Top 100 Electronica/Dance USUK',
                    imgUrl : 'https://media.giphy.com/media/QyOI0WGW3vY2s/giphy.gif',
                    link: 'https://www.nhaccuatui.com/playlist/top-100-electronicadance-hay-nhat-va.ippIsiqacmnE.html?st=1'
                },
                {
                    name : 'Top 100 Nhạc Hàn',
                    imgUrl : 'https://media.giphy.com/media/QyOI0WGW3vY2s/giphy.gif',
                    link: 'https://www.nhaccuatui.com/playlist/top-100-nhac-han-hay-nhat-va.iciV0mD8L9Ed.html?st=1'
                },
                {
                    name : 'Top 100 Nhạc Hoa',
                    imgUrl : 'https://media.giphy.com/media/QyOI0WGW3vY2s/giphy.gif',
                    link: 'https://www.nhaccuatui.com/playlist/top-100-nhac-hoa-hay-nhat-va.g4Y7NTPP9exf.html?st=1'
                },
                {
                    name : 'Top 100 Nhạc Nhật',
                    imgUrl : 'https://media.giphy.com/media/QyOI0WGW3vY2s/giphy.gif',
                    link: 'https://www.nhaccuatui.com/playlist/top-100-nhac-nhat-hay-nhat-va.aOokfjySrloy.html?st=1'
                },
                {
                    name : 'Top 100 Nhạc Không Lời',
                    imgUrl : 'https://media.giphy.com/media/QyOI0WGW3vY2s/giphy.gif',
                    link: 'https://www.nhaccuatui.com/top100/top-100-khong-loi.kr9KYNtkzmnA.html'
                },
            ]
        };
        
    }

    componentDidMount() {
        getListArtist().then(result => {
            //this.setState({listArtist: result})
            //console.log(result)
        })
    }

    renderArtist = ({item}) => (
        <Text style = {styles.title}>{item.name}</Text>
    )

    render() {
        console.log(this.state.topPlaylists.length)
        return (
            <View style = {styles.container}>
                <Text style = {styles.title}>ASDASDLASJDLKASJD</Text>
                <FlatList
                    data = {this.state.topPlaylists}
                    renderItem = {this.renderArtist.bind(this)}
                    keyExtractor = {item => item.name}
                />
            </View>
        )
    }
}

export default ArtistScene;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(4,4,4)',
        flex: 1
      },
      title:{
        fontSize: 12,
        marginTop: 5,
        marginBottom: 2,
        color: 'white',
    }
})
