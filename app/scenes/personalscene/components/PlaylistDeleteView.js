import React, {Component} from 'react'
import {View,Text, TextInput,Button, StyleSheet} from 'react-native'

export default class PlaylistDeleteView extends Component{


    render(){
        return (
            this.props.isVisible?
            (    
            <View style={styles.overlay}>
                <View style={[styles.overlay, styles.transparentBackground]}></View>
                <View style={styles.subContainer}>
                    <Text style={styles.header}>Are you sure want to delete {this.props.name} playlist?</Text>
                    <View style={styles.button}>
                        <Button
                        onPress={this.props.onCancelButtonPress}
                        title="Cancel"
                        color="#841584"
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                        onPress={this.props.onDeleteButtonPress}
                        title="Delete"
                        color="#841584"
                        />
                    </View>
                </View>
            </View>    
            ):null
        )
    }
}

const styles = StyleSheet.create({
     overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        width:'100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    transparentBackground:{
        backgroundColor: 'black',
        opacity: 0.5
    },
    subContainer:{
        width: '80%',
        backgroundColor: 'white'
    },
    header: {
        color: 'black',
        fontSize: 17,
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'center'
    },
    button:{
        padding: 5
    }  
});