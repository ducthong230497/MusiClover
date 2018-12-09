import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {getDataForSearching, getXmlURL, getDataFromXmlURL} from '../../connector/connector'
import { Icon, List, ListItem } from 'react-native-elements'

export default class SongTab extends Component{
    static navigationOptions = {
        tabBarLabel: 'Bài hát',

    }
    
    constructor(props)
    {
        super(props);

        this.state = {
            songs: [],
           
        }
    }
    componentDidMount()
    {
        getDataForSearching(this.props.screenProps.searchString).then(result =>{
            this.setState({songs: result.song});
        });
    }

    renderSongs = ({item}) => (
        <ListItem
            title={item.name} 
            titleStyle={{color: 'white'}}
            subtitle={item.singer}
            //avatar={{uri: <link_image>}}
            containerStyle={{borderBottomWidth: 0, backgroundColor: 'black'}}
        />
    )

    render(){
        return (
            <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
                <FlatList
                    data = {this.state.songs}
                    renderItem = {this.renderSongs.bind(this)}
                    keyExtractor = {(item,index) => index.toString()}
                />
            </List>
        )
    }
}