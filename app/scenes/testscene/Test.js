import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { black } from 'ansi-colors';
import axios from 'axios';

export default class Search extends Component {

    componentDidMount() {
        return fetch('https://www.nhaccuatui.com/playlist/top-100-nhac-tre-hay-nhat-va.m3liaiy6vVsF.html', {
            method: 'GET',
            headers: {
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
                'cookie': 'nctads_ck=emxgeukbuj0tta1fss2rhhzp_1537450325038; __utmc=157020004; autoPlayNext=true; NCTNPLP=b8bf04d8cec91305bc45a04b19ccce6a57dbb6f9fffdbaa820e96eb52027c965; NCTNPLV=4b863005abfcc21e01f2ee50f866376b; _ga=GA1.2.557189964.1537450325; WEB_SESSION_ID=rvg9wdkjzb6l7h8dsfe9p52w; __utma=157020004.557189964.1537450325.1538276981.1538279941.8; __utmz=157020004.1538279941.8.3.utmcsr=nhaccuatui.com|utmccn=(referral)|utmcmd=referral|utmcct=/playlist/top-100-nhac-tre-hay-nhat-va.m3liaiy6vVsF.html; NCTNPLS=cf0204479cd10deca12155415c08f427; NCTCRLS=7507d41103e195bb12cf8088507686e1fd52ff172ec82244ef70862d69deddc11e911d0ff86fe2c6b3e5c5c7dc0049e26e5e6ccdd8cacc6fb992be2a746110caa9a053477e3135486f3b03d67aa46c3dcb33c23379edf4fe484c41d7f2151806bc66e65149ebcb99db0dc193d6b1eb95e6fd23dfdff4d4e3fbf8373b6614aa9cd2cb33b05b807b6b97fe979f69429e07655b8d1fa74d0ee7e70965757a93d4b3ecd87c073ac19c0f788b2e8bbbd833a0e0a580e781fd117169a3f18402a0e1697d43bfde51532707f69fd9c52f2a7474a12508e85376852d6a0c8c3d84e8936747a40301a97b0ee19bcd5ff1470a18c6; JSESSIONID=11uhmc0sw5wkyfswrhkaoizf4; __utmb=157020004.9.10.1538279941',
              },
        }).then((response) => {
                console.log(response._bodyInit)
                let re = /<ul class="list_song_in_album">\n\s\s\s\s\s\s\s\s(.*)\n\s\s\s\s<\/ul>/ig;

                // let result = response._bodyInit.match(re); <ul class="list_song_in_album">\s\s\n\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s\s
                // console.log(result[0])

                // let regexString = /(<([^>]+)>)/ig;

                // let cdataURL = result[0].match(regexString)
                // console.log(cdataURL[1])

                // let url = cdataURL[1].toString().replace("<![CDATA[", "").replace("]]>", "")
                // console.log(url)
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
