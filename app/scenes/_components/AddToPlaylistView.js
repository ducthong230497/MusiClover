import React, {Component} from 'react'
import {View,Text, FlatList, StyleSheet, TouchableHighlight} from 'react-native'
import PlaylistButton from './PlaylistButton'


export default class AddToPlaylistView extends Component{


    renderPlaylist = ({item}) => (
        <PlaylistButton 
            imgUrl = {item.imgUrl}
            name = {item.name}
            songCount = {item.songCount}
            onPlaylistButtonPress = {() => this.props.onPlaylistButtonPress(item)}
        />
    );

    render(){
        return (
            this.props.isVisible? //PROPS
            (    
            <View style={styles.overlay}>
                <View style={styles.subContainer}>
                    <Text style = {styles.header}>Select Online Playlist</Text>
                    <FlatList
                        data={this.props.playlists} //PROPS
                        renderItem={this.renderPlaylist.bind(this)}
                        keyExtractor = {(item)=>item.name}>
                    </FlatList>
                </View>
                <TouchableHighlight style={styles.closeButton} onPress={this.props.onCloseButtonPress}>
                    <Text style = {styles.buttonText}>Close</Text>
                </TouchableHighlight>   
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
        alignItems: 'stretch',
        backgroundColor: 'rgb(4,4,4)'
    },
    subContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    header:{
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        marginTop: 20,
        alignSelf: 'center'
    },
    closeButton:{  
        height: 30,    
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        backgroundColor: "#841584",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText:{
        color: "white"
    }
});