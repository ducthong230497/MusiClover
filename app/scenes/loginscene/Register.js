import React, {Component} from 'react'
import {View,StyleSheet, TextInput, Button, Text} from 'react-native'
import Firebase from 'react-native-firebase';

export default class Register extends Component{

    constructor(props)
    {
        super(props);

        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            showError: false
        }
    }


    onRegisterButtonPress()
    {
        const { email, password, confirmPassword } = this.state;

        if(password !== confirmPassword || !(/\S/.test(password)) || !(/\S/.test(email))) 
        {
            this.showError();
            return;
        }

        Firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            this.props.navigation.navigate("Account");
            this.login();
        })
        .catch((error) => {
            this.showError();
            console.log(error);
        });
    }

    login() {
        const { email, password } = this.state;
        Firebase.auth().signInWithEmailAndPassword(email, password)
          .then((user) => {
            // If you need to do anything with the user, do it here
            // The user will be logged in automatically by the 
            // `onAuthStateChanged` listener we set up in App.js earlier
          })
          .catch((error) => {
            const { code, message } = error;
            // For details of error codes, see the docs
            // The message contains the default Firebase string
            // representation of the error
          });
      }

    showError()
    {
        this.setState({showError: true});
            setTimeout(() => {
                this.setState({showError: false});
        }, 2000);
    }


    render(){

        return (
            <View style = {styles.container}>
                <View style = {styles.container} >
                    <TextInput
                        style={styles.textField}
                        placeholder="Email..."
                        onChangeText={(text)=>this.setState({email: text})}
                        value = {this.state.email}
                    />
                    <TextInput
                        style={styles.textField}
                        placeholder="Password..."
                        onChangeText={(text)=>this.setState({password: text})}
                        value = {this.state.password}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.textField}
                        placeholder="Confirm password..."
                        onChangeText={(text)=>this.setState({confirmPassword: text})}
                        value = {this.state.confirmPassword}
                        secureTextEntry={true}
                    />
                    {this.state.showError?
                    <Text style = {styles.errorText}>Invalid email or password</Text>
                    :null
                    }
                    <View style={styles.registerButton}>
                        <Button
                            onPress={this.onRegisterButtonPress.bind(this)}
                            title="Register"
                            color="#157f63"
                        />
                    </View>
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
    registerButton: {
        margin: 20
    },
    errorText:{
        alignSelf: "center",
        color: "red"
    }
});