import React, {Component} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {createStackNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements'

import SettingButton from './SettingButton'

import Login from '../loginscene/Login'
import Register from '../loginscene/Register'


class Settings extends Component{

    onAccountButtonPress()
    {
        this.props.navigation.navigate('Login');
    }

    onVersionButtonPress()
    {
        
    }

    render(){

        return (
            <View style = {styles.container} >
                <View style ={styles.subcontainer}>
                    <Text style = {styles.header}>ACCOUNT</Text>
                    <SettingButton
                        iconName = 'account-circle'
                        text = 'Account'
                        onPress = {this.onAccountButtonPress.bind(this)}
                    />
                </View>
                <View style ={styles.subcontainer}>
                    <Text style = {styles.header}>APPLICATION</Text>
                    <SettingButton
                        iconName = 'info'
                        text = 'Version 1.0'
                        onPress = {this.onVersionButtonPress.bind(this)}
                    />
                </View>
            </View>
        )

    }
}

export default StackNavigator = createStackNavigator({
    SettingsHome: {
        screen: Settings,
        navigationOptions: ()=>({
            header:null,      

        })
    },
    Login: {
        screen: Login,
        navigationOptions: ()=>({
            headerTitle:'Login',     
        })
    },
    Register: {
        screen: Register,
        navigationOptions: ()=>({
            headerTitle:'Register',     
        })
    },
},
{ //router config
    navigationOptions:{
        headerTitleStyle:{
            color: 'white'
        },
        headerStyle:{
            backgroundColor: 'rgba(30,30,30,255)',
        },
        headerBackImage: () => (
            <Icon name = 'keyboard-arrow-left' color = 'white'></Icon>
          )     
    },
    headerLayoutPreset: 'center' 
}
);

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
        fontSize: 30,
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 10,
    }
});