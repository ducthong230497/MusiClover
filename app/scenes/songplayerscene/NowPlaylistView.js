import React, {Component} from 'react'
import {View,Text, FlatList, StyleSheet, Button} from 'react-native'
import SongButton from '../_components/SongButton'
import {Divider} from 'react-native-elements'

export default class NowPlaylistView extends Component{

    renderSongs = ({index, item}) => (
        <SongButton 
            hideMoreButton = {true}
            songName = {item.songName}
            artistName = {item.artist}
            songIndex = {index}
            onSongButtonPress = {()=>this.props.onSongButtonPress(index)}>
        </SongButton>
    );

    render(){
        return (
        this.props.isVisible?
            <View style = {styles.overlay}>
                <View style={[styles.overlay, styles.transparentBackground]}></View>
                <View style = {styles.subContainer}>
                    <Divider style = {styles.divider}></Divider>
                    <Text style = {styles.header}>Now Playing</Text>
                    <Divider style = {styles.divider}></Divider>
                    <FlatList
                            data={this.props.songs}
                            renderItem={this.renderSongs.bind(this)}
                            keyExtractor = {(item, index)=>index.toString()}>
                    </FlatList>
                    <Button title = 'Close' color = '#841584' onPress = {this.props.onCloseButtonPress}/>
                </View>
            </View>
        :null
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        width:'100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'stretch'
    },
    transparentBackground:{
        backgroundColor: 'black',
        opacity: 0.5
    },
    subContainer:{
        height: '50%',
        backgroundColor: 'rgb(4,4,4)',
    },
    header:{
        color: "white",
        alignSelf: "center",
        margin: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    divider:{
        backgroundColor: "rgb(100,100,100)"
    }
});