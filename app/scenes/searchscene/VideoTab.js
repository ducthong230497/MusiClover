import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {getDataForSearching, getXmlURL, getDataFromXmlURL} from '../../connector/connector'
import { Icon, List, ListItem } from 'react-native-elements'

export default class VideoTab extends Component{
    static navigationOptions={
        tabBarLabel: 'MV'
    }
    constructor(props)
    {
        super(props);

        this.state = {
            videos: [],
           
        }
    }
    componentDidMount()
    {
        getDataForSearching(this.props.screenProps.searchString).then(result =>{
            this.setState({videos: result.video});
        });
    }

    renderVideos = ({item}) => (
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
                    data = {this.state.videos}
                    renderItem = {this.renderVideos.bind(this)}
                    keyExtractor = {(item,index) => index.toString()}
                />
            </List>
        )
    }
}