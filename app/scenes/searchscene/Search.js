import React, {Component} from 'react'
import {View,Text ,StyleSheet} from 'react-native'


export default class Search extends Component{

    render(){

        return (
            <View style = {styles.container} >
               <Text>this is SEARCH scene</Text>
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
