import React, {Component} from 'react'
import {View,Text,TouchableHighlight,Button, StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'

export default class SongActionView extends Component{
    render(){
        return (
            this.props.isVisible?
            (    
            <View style={styles.overlay}>
                <View style={[styles.overlay, styles.transparentBackground]}></View>
                <View style={styles.subContainer}>
                    <Text style={styles.songName}>{this.props.songName}</Text>
                    <Text style={styles.artist}>{this.props.artist}</Text>
                    <TouchableHighlight underlayColor = 'rgb(230,230,230)' onPress = {this.props.onDownloadButtonPress}>
                        <View style = {styles.button}>
                            <Icon name = 'arrow-downward' size = {35}></Icon>
                            <Text style = {styles.text}>Download</Text>              
                        </View>
                    </TouchableHighlight>
                    <Button title = 'Close' color = '#841584' onPress = {this.props.onCloseButtonPress}>
                    </Button>
                </View>
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
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    transparentBackground:{
        backgroundColor: 'black',
        opacity: 0.5
    },
    subContainer:{
        width: '100%',
        backgroundColor: 'white'
    },
    songName: {
        color: 'black',
        fontSize: 25,
        marginTop: 10,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    artist: {
        color: 'black',
        fontSize: 15,
        marginTop: 5,
        marginBottom: 15,
        alignSelf: 'center'
    },
    button:{
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        marginLeft: 5,
        fontSize: 18,
        color: 'black'
    }  
});