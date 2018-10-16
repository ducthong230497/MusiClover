import React, {Component} from 'react'
import {View,Text,StyleSheet, TextInput, Button} from 'react-native'
import Firebase from 'react-native-firebase';
import {connect} from 'react-redux'

import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

class Account extends Component{

    constructor() {
        super();
        this.state = {
          loading: true,
        };
    }

    /**
     * When the App component mounts, we listen for any authentication
     * state changes in Firebase.
     * Once subscribed, the 'user' parameter will either be null 
     * (logged out) or an Object (logged in)
     */
    componentDidMount() {
        this.authSubscription = Firebase.auth().onAuthStateChanged((user) => {

            this.setState({loading: false});
            this.props.dispatch({type: 'SetUser', user: user});

        });
    }

    /**
     * Don't forget to stop listening for authentication state changes
     * when the component unmounts.
     */
    componentWillUnmount() {
        this.authSubscription();
    }

    onRegisterButtonPress()
    {
        this.props.navigation.navigate('Register');
    }

    render(){

        // The application is initialising
        if (this.state.loading) return null;

        // The user is an Object, so they're logged in
        if (this.props.user) return <LoggedIn />;

        // The user is null, so they're logged out
        return <LoggedOut onRegisterButtonPress = {this.onRegisterButtonPress.bind(this)}/>;

    }
}

function mapStateToProps(state)
{
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(Account);

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
    }
});