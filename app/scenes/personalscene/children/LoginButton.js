import React, {Component} from 'react'
import {View,Text,StyleSheet,TouchableHighlight} from 'react-native'

export default class LoginButton extends Component{

    onPress()
    {
        this.props.navigation.navigate("Account")
    }

    render(){
        return (
            <View style = {styles.container}>
                <TouchableHighlight style={styles.loginButton} onPress={this.onPress.bind(this)}>
                        <Text style = {styles.text}>Login</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    text:{
        color: "white",
        fontWeight: "bold",
    },
    loginButton:{  
        height: 40,    
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        backgroundColor:"#841584",
        alignItems: "center",
        justifyContent: "center" 
    },
});


