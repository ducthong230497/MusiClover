import React, {Component} from 'react'
import {View,Text, TextInput,Button, StyleSheet} from 'react-native'

export default class SongAddView extends Component{
    render(){
        return (
            this.props.isVisible?
            (    
            <View style={styles.overlay}>
                <View style={[styles.overlay, styles.transparentBackground]}></View>
                <View style={styles.subContainer}>
                    <Text>Add to playlist</Text>
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    transparentBackground:{
        backgroundColor: 'black',
        opacity: 0.5
    },
    subContainer:{
        width: '80%',
        backgroundColor: 'white'
    },
    textField:{
        paddingLeft: 10,
        paddingRight: 10,
    },
    header: {
        color: 'black',
        fontSize: 17,
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'center'
    },
    error:{
        color: 'red',
        fontSize: 15,
        alignSelf: 'center',
        paddingBottom: 5
    },
    button:{
        padding: 5
    }  
});