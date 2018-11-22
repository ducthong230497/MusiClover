import React, {Component} from 'react'
import {View,Text,TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native'
import {Icon} from 'react-native-elements'

export default class TopPlaylist extends Component{

    onPress()
    {
        this.props.onPress(this.props.link);
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH/2,
        height: SCREEN_WIDTH/2,
    },
    image:{
        width: SCREEN_WIDTH/2 - 30,
        height: SCREEN_WIDTH/2 -30,
        borderRadius: 10
    },
    title:{
        fontSize: 12,
        marginTop: 5,
        marginBottom: 2,
        color: 'white',
    },
});


