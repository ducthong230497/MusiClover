import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {connect} from 'react-redux'

class OnlinePlaylists extends Component {

    render() {
        return (
            <View style={styles.container}>

            </View>
        )

    }
}


export default connect()(OnlinePlaylists);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
    },

});


