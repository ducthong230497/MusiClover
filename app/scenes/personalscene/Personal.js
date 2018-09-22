import React, {Component} from 'react'
import {View,Text,StyleSheet,TouchableHighlight ,StatusBar} from 'react-native'


export default class Personal extends Component{

    render(){

        return (
            <View style = {styles.container} >
                <View style ={styles.subcontainer}>
                    <Text style = {styles.header}>Online</Text>
                    <TouchableHighlight>
                        <Text style = {styles.subheader}>Playlists</Text>
                    </TouchableHighlight>
                </View>
                <View style ={styles.subcontainer}>
                    <Text style = {styles.header}>Offline</Text>
                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(4,4,4)'
    },
    subcontainer:{
        flex: 1,
        justifyContent: 'flex-start',
    },
    header:{
        textAlign: 'left',
        color: 'rgba(255, 255, 255, 255)',
        fontWeight: 'bold',
        fontSize: 40,
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 20
    },
    subheader:{
        textAlign: 'left',
        color: 'rgba(255, 255, 255, 150)',
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 25
    }
});


