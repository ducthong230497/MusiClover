import React, {Component} from 'react'
import {View,Text,StyleSheet, TouchableHighlight, TextInput} from 'react-native'
import Firebase from 'react-native-firebase';

export default class LoggedIn extends Component{

    constructor(props)
    {
        super(props);

        this.state = {
            isChangePasswordViewVisible: false,
            currentPassword: '',
            password: '',
            confirmPassword: '',
            showError: ''
        }
    }

    onLogoutButtonPress()
    {
        Firebase.auth().signOut();
    }

    onChangePasswordButtonPress()
    {
        this.setState({isChangePasswordViewVisible: true});
    }

    onCloseChangePasswordViewButtonPress()
    {
        this.setState({isChangePasswordViewVisible: false});
    }

    onConfirmChangeButtonPress()
    {
        const {currentPassword, password, confirmPassword} = this.state;

        //reauthenticate
        var cred = Firebase.auth.EmailAuthProvider.credential(Firebase.auth().currentUser.email, currentPassword);
        Firebase.auth().currentUser.reauthenticateWithCredential(cred)
        .then((data)=>{
            //change password
            if(password === confirmPassword && (/\S/.test(password)))
            {
                Firebase.auth().currentUser.updatePassword(password)
                .then((data)=>{
                    this.setState({isChangePasswordViewVisible: false});
                })
                .catch(error => {
                    
                });
            }
            else
            {
                this.showError()
            }
        })
        .catch((error)=>{
            this.showError()
        })

    }

    showError()
    {
        this.setState({showError: true});
            setTimeout(() => {
                this.setState({showError: false});
        }, 2000);
    }

    getUserEmail()
    {
        if(Firebase.auth().currentUser===null)
        {
            return "Your email here"
        }

        return Firebase.auth().currentUser.email;
    }

    render(){

        return (
            <View style = {styles.container}>
                <View style = {styles.subContainer} >
                    <Text style={styles.text}>{this.getUserEmail()}</Text>
                    {!this.state.isChangePasswordViewVisible?
                    <TouchableHighlight style={styles.passwordButton} onPress={this.onChangePasswordButtonPress.bind(this)}>
                        <Text style = {styles.buttonText}>Change Password</Text>
                    </TouchableHighlight>:
                    <View style = {styles.subContainer}>
                        <TextInput
                            style={styles.textField}
                            placeholder="Current Password..."
                            onChangeText={(text)=> this.setState({currentPassword: text})}
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={styles.textField}
                            placeholder="New Password..."
                            onChangeText={(text)=> this.setState({password: text})}
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={styles.textField}
                            placeholder="Confirm Password..."
                            onChangeText={(text)=> this.setState({confirmPassword: text})}
                            secureTextEntry={true}
                        />
                        {this.state.showError?
                        <Text style = {styles.errorText}>Invalid password</Text>
                        :null
                        }
                        <TouchableHighlight style={styles.passwordButton} onPress={this.onConfirmChangeButtonPress.bind(this)}>
                            <Text style = {styles.buttonText}>Confirm Change</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.passwordButton} onPress={this.onCloseChangePasswordViewButtonPress.bind(this)}>
                            <Text style = {styles.buttonText}>Cancel</Text>
                        </TouchableHighlight>
                    </View>
                    }

                </View>
                <TouchableHighlight style={styles.logoutButton} onPress={this.onLogoutButtonPress.bind(this)}>
                    <Text style = {styles.buttonText}>Logout</Text>
                </TouchableHighlight>   
            </View>

        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    subContainer:{
        flex: 1,
        marginTop: 15,
        backgroundColor: 'rgb(4,4,4)',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    logoutButton:{  
        height: 30,    
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        backgroundColor: "#841584",
        justifyContent: "center",
        alignItems: "center"
    },
    passwordButton:{  
        height: 35,    
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#841584",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch"
    },
    errorText:{
        marginTop: 10,
        alignSelf: "center",
        color: "red",
        fontWeight: "bold"
    },
    buttonText:{
        color: "white"
    },
    text:{
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center"
    },
    textField:{
        height: 40,
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight:20,
        marginTop: 10,
    },
   
});