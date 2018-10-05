import React, {Component} from 'react'
import {View,Text,StyleSheet, TextInput, Button} from 'react-native'

export default class Login extends Component{

    onLoginButtonPress()
    {

    }


    render(){

        return (
            <View style = {styles.container} >
                <TextInput
                    style={styles.textField}
                    placeholder="Username..."
                    onChangeText={this.props.onChangeText}
                />
                <TextInput
                    style={styles.textField}
                    placeholder="Password..."
                    onChangeText={this.props.onChangeText}
                />
                <View style={styles.loginButton}>
                    <Button
                    onPress={this.onLoginButtonPress.bind(this)}
                    title="Login"
                    color="#841584"
                    />
                </View>
                <View style={styles.facebookButton}>
                    <Button
                    onPress={this.onLoginButtonPress.bind(this)}
                    title="Login with facebook"
                    color="#3b5998"
                    />
                </View>         
                <View style={styles.googleButton}>
                    <Button
                    onPress={this.onLoginButtonPress.bind(this)}
                    title="Login with google"
                    color= "#d62d20"
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
    loginButton:{      
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    googleButton: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    facebookButton:{
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
    }
});