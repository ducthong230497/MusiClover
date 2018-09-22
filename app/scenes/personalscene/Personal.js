import React, {Component} from 'react'
import {View,Text ,StatusBar} from 'react-native'


export default class Personal extends Component{

    render(){

        return (
            <View style = {{flex: 1,alignItems: 'center', justifyContent: 'center' }} >
               <Text>this is PERSONAL scene</Text>
            </View>


        )

    }

}
