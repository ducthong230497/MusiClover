import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, FlatList } from 'react-native'
import ArtistScene from './Artist';
import SongButton from '../_components/SongButton'
import { connect } from "react-redux"
import {getListBaiHat} from '../../connector/connector'

class ArtistInfo extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            songs: [],
        }
    }

    componentDidMount(){
        
    }
    onSongButtonPress(index)
    {
        this.props.dispatch({
            type: 'Start', 
            tracks: this.props.singer.listSongs, 
            selectedTrackIndex: index
        })

        //this.props.navigation.navigate('SongPlayer');
    }

    onMoreButtonPress(index)
    {
        //console.log("more song button press index: " + index)
        // currentSong = this.playlist[index];
        // this.setState({
        //     selectedSongName:currentSong.songName, 
        //     selectedArtist: currentSong.artist, 
        //     selectedSongURL: currentSong.songURL,
        //     isSongMoreViewVisible: true
        // });
        
    }

    formatSongName(songName){
        formattedSongName=''
        console.log(songName + " :" + songName.length)
        if(songName.length > 25){
            return songName.substring(0, 23) + "..."
        }
        else{
            return songName
        }
    }

    renderSongs = ({index, item}) => (
        <SongButton 
            //imgUrl = {item.songImage}
            songName = {this.formatSongName(item.songName)}
            artistName = {item.artist}
            songIndex = {index}
            hideMoreButton = {true}
            onSongButtonPress = {this.onSongButtonPress.bind(this)}
            onMoreButtonPress = {this.onMoreButtonPress.bind(this)}>
        </SongButton>
    )

    render() {
        let singer = this.props.singer
        return (
            <View style={styles.container}>
                <View style={styles.coverContainer}>
                    <Image
                        resizeMode="contain"
                        //source={{ uri: 'https://avatar-nct.nixcdn.com/singer/cover/2017/07/31/c/d/3/d/1501520180697.jpg' }}
                        source={{ uri: this.props.singer ? this.props.singer.coverImage : 'https://stc-m.nixcdn.com/touch_v2/images/default-avatar-200.jpg' }}
                        style={styles.coverImage} />
                </View>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatarImage} source={{ uri: this.props.singer ? this.props.singer.avatarImage : 'https://stc-m.nixcdn.com/touch_v2/images/default-avatar-200.jpg' }} />
                </View>
                <View style={styles.infoContainer}>
                    <ScrollView style={styles.scrollViewContainer}>
                        <Text style={styles.text}>Tên: {this.props.singer ? this.props.singer.name : ""}</Text>
                        <Text style={styles.text}>Tên thật: {this.props.singer ? this.props.singer.realName : ""}</Text>
                        <Text style={styles.text}>Ngày sinh: {this.props.singer ? this.props.singer.DoB : ""}</Text>
                        <Text style={styles.text}>Quốc gia: {this.props.singer ? this.props.singer.nationality : ""}</Text>
                        <Text style={styles.text}>Tiểu sử</Text>
                        <Text style={styles.text}>{this.props.singer ? this.props.singer.story : ""}</Text>
                        <Text style={styles.text}>Bài hát:</Text>
                        <FlatList
                            data = {this.props.singer ? this.props.singer.listSongs : this.state.songs}
                            renderItem = {this.renderSongs.bind(this)}
                            keyExtractor = {(item, index)=>index.toString()}
                        />
                    </ScrollView>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        singer: state.singer.singer
    }
}

export default connect(mapStateToProps)(ArtistInfo);

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
    },
    avatarContainer: {
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
    scrollViewContainer:{
        marginTop: -30,
    },
    text: {
        fontSize: 16,
        color: 'white',
        marginBottom: 15,
    },
    coverContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
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