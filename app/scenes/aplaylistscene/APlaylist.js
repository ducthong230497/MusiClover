import React, {Component} from 'react'
import {View,Text, TouchableHighlight, StyleSheet, FlatList} from 'react-native'
import {Icon} from 'react-native-elements'
import SongAddView from './SongAddView'
import SongButton from '../_components/SongButton'
import {connect} from 'react-redux'

class APlaylist extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            isAddSongViewVisisble: false,
            isDeleteSongViewVisible: false,
            deletedSong: ''
        }
    }
  
    
    onOpenAddSongViewButtonPress()
    {
        this.setState({isAddSongViewVisisble: true});
    }

    onCancelAddingSongPress()
    {
        this.setState({isAddSongViewVisisble: false});
    }

    onAddSongButtonPress()
    {
        
    }

    onSongButtonPress(trackIndex)
    {
        this.props.dispatch({type: 'SetupTrackList', tracks: null,initialTrackIndex: trackIndex})
        this.props.navigation.navigate('SongPlayer');
    }

    renderSongs = ({index, item}) => (
        <SongButton 
            imgUrl = {item.albumArtUrl}
            songName = {item.songName}
            artistName = {item.artist}
            songIndex = {index}
            onSongButtonPress = {this.onSongButtonPress.bind(this)}
            onDeleteButtonPress = {() => this.setState({isDeleteSongViewVisible: true, deletedSong: item.songName})}>
        </SongButton>
    );

    render(){

        const songs = this.props.navigation.getParam('songs');

        return (
            <View style={styles.container}>
                {
                    this.props.navigation.getParam('canAddSong')?
                    (<TouchableHighlight underlayColor = 'rgb(150,150,150)' onPress = {this.onOpenAddSongViewButtonPress.bind(this)}>
                        <View style = {styles.button}>
                            <Icon name = 'add-circle' size = {24} color = 'white' containerStyle={{paddingRight:5}}></Icon>
                            <Text style = {styles.buttonText}>Add Songs</Text>
                        </View>
                    </TouchableHighlight>)
                    :null
                }
                <FlatList
                    data={songs}
                    renderItem={this.renderSongs.bind(this)}
                    keyExtractor = {(item)=>item.songName}>
                </FlatList>
                <SongAddView
                    isVisible = {this.state.isAddSongViewVisisble}
                    onAddSongButtonPress = {this.onAddSongButtonPress.bind(this)}
                    onCancelButtonPress = {this.onCancelAddingSongPress.bind(this)} 
                ></SongAddView>
            </View>
        )

    }
}

export default connect()(APlaylist);

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


