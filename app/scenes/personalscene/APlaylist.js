import React, {Component} from 'react'
import {View,Text, TouchableHighlight, StyleSheet, FlatList} from 'react-native'
import {Icon} from 'react-native-elements'
import SongAddView from './components/SongAddView'
import SongButton from './components/SongButton'

export default class APlaylist extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            isAddSongViewVisisble: false,
            isDeleteSongViewVisible: false,
            deletedSong: '',
            songs: [
                {
                    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songName: "FirstSong",
                    artistName: "Adele"
                },
                {
                    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                    songName: "SecondSong",
                    artistName: "Super"
                },
            ]
        }
    }

    componentDidMount()
    {
        //Load all playlist's songs
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

    onSongButtonPress()
    {
        this.props.navigation.navigate('SongPlayer');
    }

    renderSongs = ({item}) => (
        <SongButton 
            imgUrl = {item.imgUrl}
            songName = {item.songName}
            artistName = {item.artistName}
            onSongButtonPress = {this.onSongButtonPress.bind(this)}
            onDeleteButtonPress = {() => this.setState({isDeleteSongViewVisible: true, deletedSong: item.songName})}>
        </SongButton>
    );

    render(){
        return (
            <View style={styles.container}>
                <TouchableHighlight underlayColor = 'rgb(150,150,150)' onPress = {this.onOpenAddSongViewButtonPress.bind(this)}>
                    <View style = {styles.button}>
                        <Icon name = 'add-circle' size = {24} color = 'white' containerStyle={{paddingRight:5}}></Icon>
                        <Text style = {styles.buttonText}>Add Songs</Text>
                    </View>
                </TouchableHighlight>
                <FlatList
                    data={this.state.songs}
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


