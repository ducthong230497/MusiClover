import React, {Component} from 'react'
import {View,Text,StyleSheet, TextInput, Button} from 'react-native'
import Firebase from 'react-native-firebase';

export default class LoggedOut extends Component{

    constructor(props)
    {
        super(props);

        this.state = {
            password: "",
            email: "",
            showError: false
        }
    }


    onLoginButtonPress()
    {      
        const { email, password } = this.state;

        if(!(/\S/.test(email)) || !(/\S/.test(password))) 
        {
            this.showError();
            return;
        }
        
        Firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {

        })
        .catch((error) => {
        const { code, message } = error;
            this.showError();
        });
    }

    showError()
    {
        this.setState({showError: true});
            setTimeout(() => {
                this.setState({showError: false});
        }, 2000);
    }

    onFacebookButtonPress()
    {

    }

    onGoogleButtonPress()
    {

    }


    render(){

        return (
            <View style = {styles.container}>
                <View style = {styles.container} >
                    <TextInput
                        style={styles.textField}
                        placeholder="Email..."
                        onChangeText={(text)=> this.setState({email: text})}
                    />
                    <TextInput
                        style={styles.textField}
                        placeholder="Password..."
                        onChangeText={(text)=> this.setState({password: text})}
                        secureTextEntry={true}
                    />
                    {this.state.showError?
                    <Text style = {styles.errorText}>Invalid email or password</Text>
                    :null
                    }
                    <View style={styles.loginButton}>
                        <Button
                        onPress={this.onLoginButtonPress.bind(this)}
                        title="Login"
                        color="#841584"
                        />
                    </View>
                    <View style={styles.facebookButton}>
                        <Button
                        onPress={this.onFacebookButtonPress.bind(this)}
                        title="Login with facebook"
                        color="#3b5998"
                        />
                    </View>         
                    <View style={styles.googleButton}>
                        <Button
                        onPress={this.onGoogleButtonPress.bind(this)}
                        title="Login with google"
                        color= "#d62d20"
                        />
                    </View>      
                </View>
                <View style={styles.registerButton}>
                        <Button
                            onPress={this.props.onRegisterButtonPress}
                            title="Register"
                            color="#157f63"
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
    },
    registerButton: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    },
    errorText:{
        alignSelf: "center",
        color: "red"
    }
});