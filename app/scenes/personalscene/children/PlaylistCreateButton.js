import React, {Component} from 'react'
import {View,Text, TouchableHighlight, StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'

export default class PlaylistCreateButton extends Component{

    render(){
        return (
            <TouchableHighlight underlayColor = 'rgb(150,150,150)'  onPress = {this.props.onPress}>
                <View style = {styles.button}>
                    <Icon name = 'add-circle' size = {24} color = 'white' containerStyle={{paddingRight:5}}></Icon>
                    <Text style = {styles.buttonText}>Create Playlist</Text>
                </View>
            </TouchableHighlight>
        )

    }
}

const styles = StyleSheet.create({
    button:{
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,102,128,255)',
        paddingLeft: 20
    },
    buttonText:{
        fontSize: 20,
        color: 'white',
    }
});


