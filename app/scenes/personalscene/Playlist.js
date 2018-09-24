import React, {Component} from 'react'
import {View,Text, TouchableHighlight, StyleSheet, Image} from 'react-native'
import {Icon} from 'react-native-elements'

export default class Playlist extends Component{
    render(){

        return (
            <View style={styles.container}>
                <TouchableHighlight underlayColor = 'rgb(150,150,150)'  onPress = {this.props.onPress}>
                    <View style = {styles.button}>
                        <Image source={{uri: this.props.url}} style={styles.image}></Image>
                        <Text style = {styles.playlistName}>{this.props.name}</Text>
                        <Text style = {styles.songCountText}>{this.props.songCount} songs</Text>
                        <Icon name ='keyboard-arrow-right' size = {30} color ='gray' ></Icon>
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
    button:{
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
    }
});


