import React, {Component} from 'react'
import {View,Text, TextInput,Button, StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'

export default class PlaylistCreateView extends Component{


    render(){
        return (
            this.props.isVisible?
            (    
            <View style={styles.overlay}>
                <View style={[styles.overlay, styles.transparentBackground]}></View>
                <View style={styles.subContainer}>
                    <Text style={styles.header}>CREATE PLAYLIST</Text>
                    <TextInput
                    style={styles.textField}
                    placeholder="Enter playlist name..."
                    onChangeText={this.props.onChangeText}
                    />
                    <View style={styles.button}>
                        <Button
                        onPress={this.props.onCancelButtonPress}
                        title="Cancel"
                        color="#841584"
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                        onPress={this.props.onCreateButtonPress}
                        title="Create"
                        color="#841584"
                        />
                    </View>
                    {this.props.showError?(<Text style={styles.error}>The playlist has already existed</Text>):null}
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