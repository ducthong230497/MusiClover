import React, {Component} from 'react'
import {View,Text, TouchableHighlight, StyleSheet, FlatList} from 'react-native'
import {Icon} from 'react-native-elements'
import {AsyncStorage} from 'react-native'

import PlaylistButton from '../_components/PlaylistButton';
import PlaylistCreateView from '../_components/PlaylistCreateView';
import PlaylistDeleteView from '../_components/PlaylistDeleteView';

export default class OfflinePlaylists extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            isCreatePlaylistViewVisible: false,
            isDeletePlaylistViewVisible: false,
            deletedPlaylistName: '',
            showError: false,
            newPlaylistName: '',
            playlists: []
        };

    }

    //callback 
    componentDidMount()
    {
        this.retrieveData();
    }

    storeData = async (name, value) => {
        try {
          await AsyncStorage.setItem(name, value);
        } catch (error) {
          console.log('Something went wrong!');
        }
    }
    removeData = async (name) => {
        try {
          await AsyncStorage.removeItem(name);
        } catch (error) {
          console.log('Something went wrong!');
        }
    }
    retrieveData = async () => {
        try {
          let playlists = await AsyncStorage.getItem('playlists');
          if(playlists !==null)
          {
            this.setState({playlists: JSON.parse(playlists)});
          }
         } catch (error) {
            console.log('Something went wrong!');
         }
    }

    onAddPlaylistButtonPress()
    {
        this.setState({isCreatePlaylistViewVisible: true});
    }

    onCreatePlaylistPress()
    {
        if(this.state.playlists.findIndex(playlist=>playlist.name === this.state.newPlaylistName.trim()) === -1 && /\S/.test(this.state.newPlaylistName))
        {
            let newPlaylists = [...this.state.playlists,{
                imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                name: this.state.newPlaylistName.trim(),
                songCount: 0
            }];
            //create new playlist
            this.setState({
                playlists: newPlaylists,
                isCreatePlaylistViewVisible: false
            });

            //save new playlist to local
            this.storeData('playlists', JSON.stringify(newPlaylists));
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
        this.setState({isCreatePlaylistViewVisible: false});
    }

    onDeletePlaylistPress()
    {
        let deletedIndex = this.state.playlists.findIndex(playlist=>playlist.name === this.state.deletedPlaylistName);
        if(deletedIndex !== -1)
        {
            let newPlaylists = this.state.playlists;
            newPlaylists.splice(deletedIndex,1);
            if(newPlaylists.length === 0) newPlaylists = [];
            //create new playlist
            this.setState({
                playlists: newPlaylists,
                isDeletePlaylistViewVisible: false,
                deletedPlaylistName: ''
            });

            //save new playlist to local
            this.storeData('playlists', JSON.stringify(newPlaylists));
        }
    }

    onCancelDeletingPlaylistPress()
    {
        this.setState({isDeletePlaylistViewVisible: false, deletedPlaylistName: ''});
    }

    onPlaylistButtonPress()
    {
        this.props.navigation.navigate('APlaylist')
    }
 
    renderPlaylist = ({item}) => (
        <PlaylistButton 
            imgUrl = {item.imgUrl}
            name = {item.name}
            songCount = {item.songCount}
            onPlaylistButtonPress = {this.onPlaylistButtonPress.bind(this)}
            onDeleteButtonPress = {() => this.setState({isDeletePlaylistViewVisible: true, deletedPlaylistName: item.name})}>
        </PlaylistButton>
    );

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
                    renderItem={this.renderPlaylist.bind(this)}
                    keyExtractor = {(item)=>item.name}>
                </FlatList>
                <PlaylistCreateView 
                    isVisible = {this.state.isCreatePlaylistViewVisible} 
                    showError ={this.state.showError}
                    onCancelButtonPress ={this.onCancelCreatingPlaylistPress.bind(this)} 
                    onCreateButtonPress = {this.onCreatePlaylistPress.bind(this)}
                    onChangeText = {(text) => this.setState({newPlaylistName: text})}>
                </PlaylistCreateView>
                <PlaylistDeleteView
                    name = {this.state.deletedPlaylistName}
                    isVisible = {this.state.isDeletePlaylistViewVisible} 
                    onCancelButtonPress ={this.onCancelDeletingPlaylistPress.bind(this)} 
                    onDeleteButtonPress = {this.onDeletePlaylistPress.bind(this)}
                ></PlaylistDeleteView>
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


