import React, {Component} from 'react'
import {View,FlatList,StyleSheet} from 'react-native'
import SongButton from '../../_components/SongButton'

export default class Songs extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            isDeleteSongViewVisible: false,
            deletedSong: ''
        }
    }

    renderSongs = ({index, item}) => (
        <SongButton 
            imgUrl = {item.imgUrl}
            songName = {item.songName}
            artistName = {item.artistName}
            onSongButtonPress = {()=>this.props.onSongButtonPress(index)} //PROPS
            onDeleteButtonPress = {() => this.setState({isDeleteSongViewVisible: true, deletedSong: item.songName})}>
        </SongButton>
    );

    render(){

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.songs}
                    renderItem={this.renderSongs.bind(this)}
                    keyExtractor = {(item)=>item.songName}>
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(4,4,4)'
    },
    
});


