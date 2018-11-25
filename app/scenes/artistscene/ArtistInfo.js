import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native'
import ArtistScene from './Artist';

export default class ArtistInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: 'a',
            realName: 'b',
            DoB: 'c',
            nationality: 'd',
            story: 'e'
        }
    }

    render() {
        let singer = this.props.singer
        console.log(singer)
        return (
            <View style={styles.container}>
                <View style={styles.coverContainer}>
                    <Image
                        resizeMode="contain"
                        source={{ uri: 'https://avatar-nct.nixcdn.com/singer/cover/2017/07/31/c/d/3/d/1501520180697.jpg' }}
                        style={styles.coverImage} />
                </View>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatarImage} source={{ uri: 'https://avatar-nct.nixcdn.com/singer/avatar/2018/05/29/3/6/8/8/1527560526533.jpg' }} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>Tên: {this.state.name}</Text>
                    <Text style={styles.text}>Tên thật: {this.state.realName}</Text>
                    <Text style={styles.text}>Ngày sinh: {this.state.DoB}</Text>
                    <Text style={styles.text}>Quốc gia: {this.state.nationality}</Text>
                    <Text style={styles.text}>Tiểu sử</Text>
                    <Text style={styles.text}>{this.state.story}</Text>
                    <Text style={styles.text}>Playlist</Text>
                </View>
            </View>
        )
    }
}

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(4,4,4)',
        flex: 1
    },
    infoContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FF5CFF',
    },
    avatarContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: 12,
        marginTop: 5,
        marginBottom: 2,
        color: 'white',
    },
    text:{
        fontSize: 16,
        marginTop: -10,
        color: 'white',
        marginBottom: 15,
    },
    coverContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        alignItems: 'stretch',
        position: 'relative',
      },
      coverImage: {
          resizeMode: 'stretch',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
    avatarImage: {
        width: SCREEN_WIDTH / 2 - 30,
        height: SCREEN_WIDTH / 2 - 30,
        borderRadius: SCREEN_WIDTH / 2 - 30,
        marginTop: -60,
    },
})