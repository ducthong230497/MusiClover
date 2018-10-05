import React, {Component} from 'react'
import {View, StyleSheet, FlatList} from 'react-native'

import PlaylistButton from './PlaylistButton';
import PlaylistCreateButton from './PlaylistCreateButton'
import PlaylistCreateView from './PlaylistCreateView';
import PlaylistDeleteView from './PlaylistDeleteView';

export default class Playlists extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            isCreatePlaylistViewVisible: false,
            isDeletePlaylistViewVisible: false,
            deletedPlaylistName: '',
            newPlaylistName: '',
            showError: false
        };

    }

    onAddPlaylistButtonPress()
    {
        this.setState({isCreatePlaylistViewVisible: true});
    }

    onCancelCreatingPlaylistPress()
    {
        this.setState({isCreatePlaylistViewVisible: false});
    }

    onCancelDeletingPlaylistPress()
    {
        this.setState({isDeletePlaylistViewVisible: false, deletedPlaylistName: ''});
    }


    renderPlaylist = ({item}) => (
        <PlaylistButton 
            imgUrl = {item.imgUrl}
            name = {item.name}
            songCount = {item.songCount}
            onPlaylistButtonPress = {() => this.props.onPlaylistButtonPress(item)} //PROPS
            onDeleteButtonPress = {() => this.setState({isDeletePlaylistViewVisible: true, deletedPlaylistName: item.name})}>
        </PlaylistButton>
    );
    
    onCreatePlaylistPress()
    {
        if(this.props.onCreatePlaylistPress(this.state.newPlaylistName) === true)
        {
            this.setState({isCreatePlaylistViewVisible: false});
        }
        else
        {
            this.setState({showError: true})
            setTimeout(() => {
                this.setState({showError: false})
            }, 2000);
        }
    }

    onDeletePlaylistPress()
    {
        if(this.props.onDeletePlaylistPress(this.state.deletedPlaylistName) === true)
        {
            this.setState({isDeletePlaylistViewVisible: false});
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <PlaylistCreateButton
                    onPress = {this.onAddPlaylistButtonPress.bind(this)}
                >
                </PlaylistCreateButton>
                <FlatList
                    data={this.props.playlists} //PROPS
                    renderItem={this.renderPlaylist.bind(this)}
                    keyExtractor = {(item)=>item.name}>
                </FlatList>
                <PlaylistCreateView 
                    isVisible = {this.state.isCreatePlaylistViewVisible} 
                    showError ={this.state.showError}
                    onCancelButtonPress ={this.onCancelCreatingPlaylistPress.bind(this)} 
                    onCreateButtonPress = {this.onCreatePlaylistPress.bind(this)} //PROPS
                    onChangeText = {(text) => this.setState({newPlaylistName: text})}>
                </PlaylistCreateView>
                <PlaylistDeleteView
                    name = {this.state.deletedPlaylistName}
                    isVisible = {this.state.isDeletePlaylistViewVisible} 
                    onCancelButtonPress ={this.onCancelDeletingPlaylistPress.bind(this)} 
                    onDeleteButtonPress = {this.onDeletePlaylistPress.bind(this)} //PROPS
                ></PlaylistDeleteView>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
    }
});


