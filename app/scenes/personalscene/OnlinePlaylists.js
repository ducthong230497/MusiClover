import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

var listSong = []
export default class OnlinePlaylists extends Component {
    componentDidMount() {
        fetch('https://www.nhaccuatui.com/playlist/top-100-nhac-tre-hay-nhat-va.m3liaiy6vVsF.html').then((response) => {
            let re = /<ul class="list_song_in_album">([\s\S]*?)<\/ul>/ig;

            let result = response._bodyInit.match(re)
            //console.log(result[0])

            let regexListSong = /<li([\s\S]*?)<\/li>/ig
            let listItemSong = result[0].toString().match(regexListSong)
            console.log(listItemSong[0])

            let regexSongItem = /<meta content="(.*?)"/ig

            listItemSong.forEach(element => {
                //let singer = element.toString().match(/titleplay="(.*?)"/ig)
                let singerName = /titleplay="(.*?)"/ig.exec(element.toString())[1].toString().split("-")[1].trim()
                //console.log(singer)

                let match = element.toString().match(regexSongItem)
                let songName = match[0].toString().replace("<meta content=\"", "").replace("\"", "")
                let songURL = match[1].toString().replace("<meta content=\"", "").replace("\"", "")

                let songInfo = { song: songName, singer: singerName, URL: songURL }
                listSong.push(songInfo)
            });
            console.log(listSong)
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        // use the variable listSong to render song
        return (
            <View style={styles.container}>
                <Text style={{ color: 'white' }}>This is ONLINEPLAYLISTS scene</Text>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
        alignItems: 'center',
        justifyContent: 'center'
    },

});


