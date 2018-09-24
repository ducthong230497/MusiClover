import React, {Component} from 'react'
import {View,Text, TouchableHighlight, StyleSheet, FlatList} from 'react-native'
import {Icon} from 'react-native-elements'
import Playlist from './Playlist';
import PlaylistCreateView from './PlaylistCreateView';

export default class OfflinePlaylists extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            isCreateViewVisible: false,
            showError: false,
            newPlaylistName: '',
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
        this.setState({isCreateViewVisible: true});
    }

    _renderPlaylist = ({item}) => (
        <Playlist 
            url = {item.url}
            name = {item.name}
            songCount = {item.songCount}>
        </Playlist>
    );

    onCreatePlaylistPress()
    {
        if(this.state.playlists.findIndex(playlist=>playlist.name === this.state.newPlaylistName.trim()) === -1 && /\S/.test(this.state.newPlaylistName))
        {
            this.setState({
                playlists: [...this.state.playlists,{
                    url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    name: this.state.newPlaylistName.trim(),
                    songCount: 0
                }],
                isCreateViewVisible: false
            });
        }
        else
        {
            this.setState({showError: true})
            setTimeout(() => {
                this.setState({showError: false})
            }, 2000);
        }
    }
    onCancelCreatingPlaylistPress()
    {
        this.setState({isCreateViewVisible: false});
    }

    render(){

        return (
            <View style={styles.container}>
                <TouchableHighlight underlayColor = 'rgb(150,150,150)'  onPress = {this.onAddPlaylistButtonPress.bind(this)}>
                    <View style = {styles.button}>
                        <Icon name = 'add-circle' size = {24} color = 'white' containerStyle={{paddingRight:5}}></Icon>
                        <Text style = {styles.buttonText}>Create Playlist</Text>
                    </View>
                </TouchableHighlight>
                <FlatList
                    data={this.state.playlists}
                    renderItem={this._renderPlaylist}
                    keyExtractor = {(item)=>item.name}>
                </FlatList>
                <PlaylistCreateView 
                    isVisible = {this.state.isCreateViewVisible} 
                    showError ={this.state.showError}
                    onCancelButtonPress ={this.onCancelCreatingPlaylistPress.bind(this)} 
                    onCreateButtonPress = {this.onCreatePlaylistPress.bind(this)}
                    onChangeText = {(text) => this.setState({newPlaylistName: text})}>
                </PlaylistCreateView>
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


