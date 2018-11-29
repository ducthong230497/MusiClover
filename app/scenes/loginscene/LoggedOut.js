import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableHighlight } from 'react-native'
import Firebase from 'react-native-firebase';
//import { LoginButton, AccessToken, LoginManager  } from 'react-native-fbsdk';

export default class LoggedOut extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: "",
            email: "",
            showError: false
        }
    }


    onLoginButtonPress() {
        const { email, password } = this.state;

        if (!(/\S/.test(email)) || !(/\S/.test(password))) {
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

    showError() {
        this.setState({ showError: true });
        setTimeout(() => {
            this.setState({ showError: false });
        }, 2000);
    }

    onFacebookButtonPress() {
        // var provider = new Firebase.auth.FacebookAuthProvider();
        // provider.addScope('user_birthday');
        // Firebase.auth().signInWithPopup(provider).then(function (result) {
        //     // This gives you a Facebook Access Token.
        //     var token = result.credential.accessToken;
        //     // The signed-in user info.
        //     var user = result.user;
        // });

        // Attempt a login using the Facebook login dialog asking for default permissions.
        //LoginManager.logInWithReadPermissions(["public_profile"])
    }

    onGoogleButtonPress() {

    }


    render() {

        return (
            <View style={styles.container}>
                <View style={styles.container} >
                    <TextInput
                        style={styles.textField}
                        placeholder="Email..."
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                    <TextInput
                        style={styles.textField}
                        placeholder="Password..."
                        onChangeText={(text) => this.setState({ password: text })}
                        secureTextEntry={true}
                    />
                    {this.state.showError ?
                        <Text style={styles.errorText}>Invalid email or password</Text>
                        : null
                    }
                    <TouchableHighlight style={styles.loginButton} onPress={this.onLoginButtonPress.bind(this)}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableHighlight>

                    {/* <TouchableHighlight style={styles.facebookButton} onPress={this.onFacebookButtonPress.bind(this)}>
                        <Text style={styles.text}>Login With Facebook</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.googleButton} onPress={this.onGoogleButtonPress.bind(this)}>
                        <Text style={styles.text}>Login With Google</Text>
                    </TouchableHighlight> */}
                </View>
                <TouchableHighlight style={styles.registerButton} onPress={this.props.onRegisterButtonPress}
                >
                    <Text style={styles.text}>Register</Text>
                </TouchableHighlight>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    textField: {
        height: 50,
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10
    },
    text: {
        color: "white",
        fontWeight: "bold",
    },
    loginButton: {
        height: 40,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        backgroundColor: "#841584",
        alignItems: "center",
        justifyContent: "center"
    },
    googleButton: {
        height: 40,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#d62d20",
        alignItems: "center",
        justifyContent: "center"
    },
    facebookButton: {
        height: 40,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#3b5998",
        alignItems: "center",
        justifyContent: "center"
    },
    registerButton: {
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        backgroundColor: "#157f63",
        alignItems: "center",
        justifyContent: "center"
    },
    errorText: {
        alignSelf: "center",
        color: "red"
    }
});