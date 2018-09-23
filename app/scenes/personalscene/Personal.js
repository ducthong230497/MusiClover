import React, {Component} from 'react'
import {View,Text,StyleSheet,StatusBar} from 'react-native'
import CategoryButton from './CategoryButton.js'

export default class Personal extends Component{

    render(){

        return (
            <View style = {styles.container} >
                <View style ={styles.subcontainer}>
                    <Text style = {styles.header}>ONLINE MUSIC</Text>
                    <CategoryButton text = 'Playlists' iconName = 'queue-music'></CategoryButton>
                    <CategoryButton text = 'Songs' iconName = 'music-note'></CategoryButton>
                </View>
                <View style ={styles.subcontainer}>
                    <Text style = {styles.header}>OFFLINE MUSIC</Text>
                    <CategoryButton text = 'Playlists' iconName = 'queue-music'></CategoryButton>
                    <CategoryButton text = 'Songs' iconName = 'music-note'></CategoryButton>
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
        justifyContent: 'flex-start',
    },
    header:{
        textAlign: 'left',
        color: 'rgba(255, 255, 255, 255)',
        fontWeight: 'bold',
        fontSize: 40,
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 0.4,
    }
});


