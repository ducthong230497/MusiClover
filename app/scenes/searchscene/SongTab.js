import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {getDataForSearching, getXmlURL, getDataFromXmlURL, typeEnum} from '../../connector/connector'
import { Icon, List, ListItem } from 'react-native-elements'
import {getEncryptKey, getDataFromKeyEncrypt} from '../../connector/connector'
import SongButton from '../_components/SongButton'
import {connect} from 'react-redux'

class SongTab extends Component{
    static navigationOptions = {
        tabBarLabel: 'Bài hát',

    }
    
    constructor(props)
    {
        super(props);

        this.state = {
            songs: [],
            strNotFound: false
           
        }
    }
    componentDidMount()
    {
        this.InitSongs().then(result => {
            this.setState({songs: [...result]})
        })
    }

    async InitSongs(){
        let listTemp = []
        await getDataForSearching(this.props.screenProps.searchString).then(async(result) =>{
            if(result.song.length == 0){
                this.setState({strNotFound: true})
            }
            else {
                this.setState({strNotFound: false})
            }
            for (let item of result.song){
                await getEncryptKey(item.url).then(async(key) => {
                    await getDataFromKeyEncrypt(key, typeEnum.SONG).then(data => {
                        data.url = item.url;
                        listTemp.push(data)
                    })
                })
            }
            
        });
        return listTemp
    }

    onSongButtonPress(index)
    {
        let songList = []
        this.state.songs.forEach(element => {
            let song = {
                songName: element.title,
                artist: element.singerTitle,
                url: element.url,

            }
            songList.push(song);
        });

        this.props.dispatch({
            type: 'Start', 
            tracks: songList, 
            selectedTrackIndex: index
        })
    }

    renderSongs = ({index, item}) => (
        <View style = {{ backgroundColor: 'black'}}>
            <SongButton 
                imgUrl = {item.thumb}
                songName = {item.title}
                artistName = {item.singerTitle}
                songIndex = {index}
                onSongButtonPress = {this.onSongButtonPress.bind(this)}
                hideMoreButton = {true}
                >
            </SongButton>
        </View>
    )

    render(){

        return (
            <View style={styles.container}>
                <Text style={this.state.strNotFound ? styles.title : styles.titleMinus}>Không có dữ liệu</Text>
                {!this.state.strNotFound?<List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
                    <FlatList
                        data = {this.state.songs}
                        renderItem = {this.renderSongs.bind(this)}
                        keyExtractor = {(item,index) => index.toString()}
                    />
                </List>:null}
            </View>
        )
    }
}

export default connect()(SongTab);

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgb(4,4,4)',
        flex: 1,
    },
    space:{
        height: 50
    },
    title:{
        fontSize: 12,
        color: 'white',
        textAlign: 'center'
    },
    titleMinus:{
        fontSize: 12,
        marginTop: -20,
        color: 'white',
        textAlign: 'center'
    },
});