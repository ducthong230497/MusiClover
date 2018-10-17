import React, {Component} from 'react'
import {View,Text, FlatList, StyleSheet} from 'react-native'
import PlaylistButton from '../_components/PlaylistButton'


export default class SongAddView extends Component{

    renderPlaylist = ({item}) => (
        <PlaylistButton 
            imgUrl = {item.imgUrl}
            name = {item.name}
            songCount = {item.songCount}
        />
    );

    render(){
        return (
            this.props.isVisible?
            (    
            <View style={styles.overlay}>
                <View style={styles.subContainer}>
                    <Text style = {styles.header}>Select Online Playlist</Text>
                </View>
                <FlatList
                    data={this.props.playlists} //PROPS
                    renderItem={this.renderPlaylist.bind(this)}
                    keyExtractor = {(item)=>item.name}>
                </FlatList>
            </View>    
            ):null
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgb(4,4,4)'
    },
    header:{
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        marginTop: 20
    }
});