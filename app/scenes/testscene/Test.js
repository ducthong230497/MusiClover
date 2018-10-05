import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { black } from 'ansi-colors';

export default class Search extends Component {

    componentDidMount() {
        return fetch('https://www.nhaccuatui.com/playlist/top-100-nhac-tre-hay-nhat-va.m3liaiy6vVsF.html').then((response) => {
                let re = /<ul class="list_song_in_album">([\s\S]*?)<\/ul>/ig;
                
                let result = response._bodyInit.match(re)
                //console.log(result[0])

                let regexListSong = /<li([\s\S]*?)<\/li>/ig
                let listItemSong = result[0].toString().match(regexListSong)
                console.log(listItemSong[0])

                let regexSongItem = /<meta content="(.*?)"/ig

                var listSong = []
                listItemSong.forEach(element => {
                    //let singer = element.toString().match(/titleplay="(.*?)"/ig)
                    let singerName = /titleplay="(.*?)"/ig.exec(element.toString())[1].toString().split("-")[1].trim()
                    //console.log(singer)
                    
                    let match = element.toString().match(regexSongItem)
                    let songName = match[0].toString().replace("<meta content=\"", "").replace("\"", "")
                    let songURL = match[1].toString().replace("<meta content=\"", "").replace("\"", "")
                    
                    let songInfo = {song: songName, singer: singerName, URL: songURL}
                    listSong.push(songInfo)
                });
                //console.log(listSong)
            }).catch((error) => {
                console.error(error);
            });

        // return axios.get('https://www.nhaccuatui.com/bai-hat/buon-khong-em-dat-g.3cd1fD5Rd2bQ.html')
        // .then((response) => {
        //     console.log(response.data)
        //})
    }

    render() {
        console.log(123)
        return (
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }} >
                <View style={styles.topleftContainer}>

                </View>

                <View style={styles.topContainer}>

                </View>
                <View style={styles.toprightContainer}>

                </View>

                <View style={styles.topleftContainer}>

                </View>

                <View style={styles.topContainer}>

                </View>
                <View style={styles.toprightContainer}>

                </View>
            </View>


        )

    }

}

const styles = StyleSheet.create({
    topleftContainer: {
        flexDirection: 'row',
        width: 100,
        height: 100,
        backgroundColor: 'black',
        marginTop: 15,
        marginLeft: 15,
    },
    topContainer: {
        flexDirection: 'row',
        width: 100,
        height: 100,
        backgroundColor: 'black',
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    toprightContainer: {
        flexDirection: 'row',
        width: 100,
        height: 100,
        backgroundColor: 'black',
        marginTop: 15,
        marginRight: 15,
    }
})
