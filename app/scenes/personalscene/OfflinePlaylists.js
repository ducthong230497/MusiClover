import React, {Component} from 'react'
import {View,Text, TouchableHighlight, StyleSheet, FlatList} from 'react-native'
import {Icon} from 'react-native-elements'
import Playlist from './Playlists';

export default class OfflinePlaylists extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            playlists: [
                {
                    url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    name: 'MyPlaylist',
                    songCount: 2
                },
                {
                    url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    name: 'MyPlaylist2',
                    songCount: 5
                }
            ]
        };
    }

    onAddPlaylistButtonPress()
    {

    }

    _renderPlaylist = ({item}) => (
        <Playlist 
            url = {item.url}
            name = {item.name}
            songCount = {item.songCount}>
        </Playlist>
    );

    render(){

        let playlists = this.state.playlists.map((playlist, index)=>{
            return(
            <li key ={index}>
                <Playlist 
                    url = {playlist.url}
                    name = {playlist.name}
                    songCount = {playlist.songCount}>
                </Playlist>)
            </li>
            )
        });

        return (
            <View style={styles.container}>
                <TouchableHighlight underlayColor = 'rgb(150,150,150)'  onPress = {this.props.onPress}>
                    <View style = {styles.button}>
                        <Icon name = 'add-circle' size = {24} color = 'white' containerStyle={{paddingRight:5}}></Icon>
                        <Text style = {styles.buttonText}>Create Playlist</Text>
                    </View>
                </TouchableHighlight>
                <FlatList
                    data={this.state.playlists}
                    renderItem={this._renderPlaylist}
                    keyExtractor = {(item,index)=>index}
                />
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
    },
    button:{
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,102,128,255)',
        paddingLeft: 20
    },
    buttonText:{
        fontSize: 20,
        color: 'white',
    }
});


