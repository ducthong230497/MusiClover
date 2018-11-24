import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import ArtistScene from './Artist';

export default class ArtistInfo extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style = {styles.container}>
                <Text style = {styles.title}>ASDASDADASDASDASD</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(4,4,4)',
        flex: 1
      },
      title:{
        fontSize: 12,
        marginTop: 5,
        marginBottom: 2,
        color: 'white',
    }
})