import React, {Component} from 'react'
import {View,Text,StyleSheet, TextInput, Button} from 'react-native'
import Firebase from 'react-native-firebase';
import {connect} from 'react-redux'

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

    render(){

        

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
    text:{
        color: 'white'
    },
});