import React, {Component} from 'react'
import {View,Text,StyleSheet} from 'react-native'

export default class OnlinePlaylists extends Component{

    render(){

        return (
            <View style={styles.container}>
                <Text style = {{color: 'white'}}>This is ONLINEPLAYLISTS scene</Text>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
        alignItems:'center',
        justifyContent: 'center'
    },
    
});


