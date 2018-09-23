import React, {Component} from 'react'
import {View,Text,StyleSheet,TouchableHighlight} from 'react-native'
import {Icon} from 'react-native-elements'

export default class OptionButton extends Component{

    onPress()
    {
        console.log("Hello");
    }

    render(){
        return (
            <TouchableHighlight underlayColor = 'rgb(150,150,150)'  onPress = {this.onPress.bind(this)}>
                <View style = {styles.button}>
                    <Icon name = {this.props.iconName} size = {24} color = "white"></Icon>
                    <Text style = {styles.header}>{this.props.text}</Text>
                    <Icon name = 'keyboard-arrow-right' size = {24} color = "gray"></Icon>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(4,4,4)',
        paddingLeft: 20
    },   
    header:{
        color: 'rgba(255, 255, 255, 150)',
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 25,
        flex: 1
    }
});


