import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {getDataForSearching, getXmlURL, getDataFromXmlURL, typeEnum} from '../../connector/connector'
import { Icon, List, ListItem } from 'react-native-elements'
import {getEncryptKey, getDataFromKeyEncrypt} from '../../connector/connector'

export default class SongTab extends Component{
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
            console.log(result.length)
            this.setState({songs: [...result]})
        })
    }

    async InitSongs(){
        let listTemp = []
        await getDataForSearching(this.props.screenProps.searchString).then(async(result) =>{
            //this.setState({songs: result.song});
            if(result.song.length == 0){
                this.setState({strNotFound: true})
            }
            else {
                this.setState({strNotFound: false})
            }
            console.log(result.song.length)
            for (let item of result.song){
                console.log(item.url)
                await getEncryptKey(item.url).then(async(key) => {
                    console.log(key)
                    await getDataFromKeyEncrypt(key, typeEnum.SONG).then(data => {
                        //console.log(data)
                        listTemp.push(data)
                    })
                })
            }
            
        });
        return listTemp
    }

    renderSongs = ({item}) => (
        <ListItem
            title={item.title} 
            titleStyle={{color: 'white'}}
            subtitle={item.singerTitle}
            avatar={{uri: item.thumb}}
            containerStyle={{borderBottomWidth: 0, backgroundColor: 'black'}}
        />
    )

    render(){
        return (
            <View style={styles.container}>
                <Text style={this.state.strNotFound ? styles.title : styles.titleMinus}>Không có dữ liệu</Text>
                <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
                    <FlatList
                        data = {this.state.songs}
                        renderItem = {this.renderSongs.bind(this)}
                        keyExtractor = {(item,index) => index.toString()}
                    />
                </List>
            </View>
        )
    }
}

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