import React, {Component} from 'react'
import {View,Text,TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native'
import {Icon} from 'react-native-elements'

export default class TopPlaylist extends Component{

    constructor(props)
    {
        super(props);     
        this.playlistFetcher = this.props.playlistFetcher;
    }

    onPress()
    {
        this.props.onPress(this.playlistFetcher);
    }
    

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress = {this.onPress.bind(this)}>
                    <Image source={{uri: this.props.imgUrl}} style={styles.image}></Image>
                </TouchableOpacity>
                <Text style = {styles.title}>{this.props.name}</Text>          
            </View>
        )

    }
}

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const styles = StyleSheet.create({
    container:{
        paddingTop: 20,
        paddingRight: 10,
        paddingLeft: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        width: SCREEN_WIDTH/2 - 40,
        height: SCREEN_WIDTH/2 -40
    },
    title:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
});


