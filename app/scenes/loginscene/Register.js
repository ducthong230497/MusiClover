import React, {Component} from 'react'
import {View,StyleSheet, TextInput, Button} from 'react-native'

export default class Register extends Component{

    onRegisterButtonPress()
    {
        
    }


    render(){

        return (
            <View style = {styles.container}>
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
                    <TextInput
                        style={styles.textField}
                        placeholder="Confirm password..."
                        onChangeText={this.props.onChangeText}
                    />
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
    }
});