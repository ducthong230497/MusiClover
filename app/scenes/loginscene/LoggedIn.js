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
            confirmPassword: ''
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

        if(Firebase.auth().currentUser !== null && 
        Firebase.auth().currentUser.password === currentPassword && 
        password === confirmPassword && (/\S/.test(password)))
        {
            Firebase.auth().currentUser.updatePassword(password)
            .then((data)=>{
                this.setState({isChangePasswordViewVisible: false});
            })
            .catch(error => {
                
            });
        }

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
                    <View style = {styles.subContainer2}>
                        <TextInput
                            style={styles.textField}
                            placeholder="Current Password..."
                            onChangeText={(text)=> this.setState({currentPassword: text})}
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
    textField:{
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight:20,
        marginBottom: 10
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
        height: 30,    
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#841584",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch"
    },
    errorText:{
        alignSelf: "center",
        color: "red"
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
        height: 30,
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight:20,
        marginTop: 10,
    },
   
});