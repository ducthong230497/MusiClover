import React, {Component} from 'react'
import {View,Text, TouchableHighlight,TouchableOpacity, StyleSheet, Image} from 'react-native'
import {Icon} from 'react-native-elements'

export default class PlaylistButton extends Component{

    render(){
        return (
            <View style={styles.container}>
                <TouchableHighlight underlayColor = 'rgb(150,150,150)'  onPress = {this.props.onPlaylistButtonPress}>
                    <View style = {styles.playlistButton}>
                        <Image source={{uri: this.props.url}} style={styles.image}></Image>
                        <Text style = {styles.playlistName}>{this.props.name}</Text>
                        <Text style = {styles.songCountText}>{this.props.songCount} songs</Text>
                        <TouchableOpacity  style = {styles.settingButton} onPress ={this.props.onDeleteButtonPress}>
                            <Icon name ='delete-forever' size = {20} color ='gray' ></Icon>
                        </TouchableOpacity>
                    </View>
                </TouchableHighlight>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        paddingLeft: 20,
        paddingTop: 20
    },
    image:{
        width: 70,
        height: 70
    },
    playlistButton:{
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
    },
    playlistName:{
        fontSize: 20,
        color: 'white',
        paddingLeft: 20,
        flex:1
    },
    songCountText:{
        fontSize: 15,
        color: 'white',
        paddingLeft: 20,
        flex: 1
    },
    settingButton: {
        paddingRight: 5
    }
});


