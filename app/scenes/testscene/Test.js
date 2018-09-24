import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { black } from 'ansi-colors';

export default class Search extends Component {

    componentDidMount() {
        return fetch('https://www.nhaccuatui.com/flash/xml?html5=true&key1=1086ec88341c5050fc515be71ec1b844')
            .then((response) => {
                console.log(response._bodyInit)
                let re = /<location>\n\s\s\s\s\s\s\s\s(.*)\n\s\s\s\s<\/location>/ig;

                let result = response._bodyInit.match(re);
                console.log(result[0])

                let regexString = /(<([^>]+)>)/ig;

                let cdataURL = result[0].match(regexString)
                console.log(cdataURL[1])

                let url = cdataURL[1].toString().replace("<![CDATA[", "").replace("]]>", "")
                console.log(url)
            }).catch((error) => {
                console.error(error);
            });
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
