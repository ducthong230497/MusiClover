import React, {Component} from 'react'
import {View,Text,StyleSheet, TextInput, Button} from 'react-native'
import Firebase from 'react-native-firebase';

export default class LoggedIn extends Component{


    onLogoutButtonPress()
    {
        
    }

    render(){

        return (

            <View style = {styles.container} >
                <View style={styles.logoutButton}>
                    <Button
                    onPress={this.onLogoutButtonPress.bind(this)}
                    title="Login"
                    color="#841584"
                    />
                </View>    
            </View>

        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    textField:{
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight:20,
        marginBottom: 10
    },
    logoutButton:{      
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    errorText:{
        alignSelf: "center",
        color: "red"
    }
   
});