import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import SearchBar from 'react-native-searchbar'
import { black } from 'ansi-colors';
import {getTop100} from '../../connector/connector'
import SongButton from '../_components/SongButton'
import { Button } from 'react-native-elements';

class ArtistScene extends Component {

    constructor(props){
        super(props);
        this.state = {listArtist: []};
        
    }

    componentDidMount() {
        getTop100('https://www.nhaccuatui.com/playlist/top-100-pop-usuk-hay-nhat-va.zE23R7bc8e9X.html?st=1').then(result => {
            this.setState({listArtist: result})
            console.log(result)
        })
    }

    renderArtist = ({item}) => {
        <Text style = {styles.title}>{item.songName}</Text>
    }

    render() {
        return (
            <View style = {styles.container}>
                <FlatList
                    data = {this.state.listArtist}
                    renderItem = {this.renderArtist.bind(this)}
                    keyExtractor = {item => item.songName}
             
                />
            </View>
        )
    }
}

export default ArtistScene;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
      },
      title:{
        fontSize: 12,
        marginTop: 5,
        marginBottom: 2,
        color: 'white',
    }
})
