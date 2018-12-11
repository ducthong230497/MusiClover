import React, {Component} from 'react'
import {View,Text, TouchableHighlight,TouchableOpacity, StyleSheet, Image} from 'react-native'
import {Icon} from 'react-native-elements'

export default class SongButton extends Component{

    onPress()
    {
        this.props.onSongButtonPress(this.props.songIndex);
    }
    
    onMoreButtonPress()
    {
        this.props.onMoreButtonPress(this.props.songIndex);
    }

    render(){
        return (
            <View style={styles.container}>
                <TouchableHighlight underlayColor = 'rgb(150,150,150)'  onPress = {this.onPress.bind(this)}>
                    <View style = {styles.songButton}>
                        {this.props.imgUrl==null?<Text style = {styles.songIndex}>{this.props.songIndex + 1}</Text>:
                        <Image source={{uri: this.props.imgUrl}} style={styles.image}></Image>}
                        <View style = {styles.songInfo}>
                            <Text style = {styles.songName}>{this.props.songName}</Text>
                            <Text style = {styles.artistName}>{this.props.artistName}</Text>
                        </View>
                        {this.props.additionalRender}
                        {this.props.hideMoreButton?null:
                        <TouchableOpacity  style = {styles.settingButton} onPress ={this.onMoreButtonPress.bind(this)}>
                            <Icon name ='more-horiz' size = {20} color ='white' ></Icon>
                        </TouchableOpacity>}
                    </View>
                </TouchableHighlight>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 10
    },
    image:{
        width: 70,
        height: 70
    },
    songButton:{
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
    },
    songInfo:{
        flexDirection: "column",
        justifyContent: "center",
        flex: 1
    },
    songName:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 20,
        flex:1
    },
    songIndex:{
        fontSize: 15,
        color: 'white',
    },
    artistName:{
        fontSize: 15,
        color: 'white',
        paddingLeft: 20,
        flex: 1
    },
    settingButton: {
        paddingRight: 5
    }
});


