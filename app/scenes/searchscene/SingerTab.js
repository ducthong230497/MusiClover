import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {getDataForSearching, getXmlURL, getDataFromXmlURL} from '../../connector/connector'
import { Icon, List, ListItem } from 'react-native-elements'

export default class SingerTab extends Component{
    static navigationOptions={
        tabBarLabel: 'Ca sĩ'
    }

    constructor(props)
    {
        super(props);

        this.state = {
            singers: [],
           
        }
    }
    componentDidMount()
    {
        getDataForSearching(this.props.screenProps.searchString).then(result =>{
            this.setState({singers: result.singer});
        });
    }

    renderSingers = ({item}) => (
        <ListItem
            roundAvatar
            title={item.name} 
            titleStyle={{color: 'white'}}
            avatar={{uri: item.img}}
            containerStyle={{borderBottomWidth: 0, backgroundColor: 'black'}}
        />
    )

    render(){
        return (
            <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
                <FlatList
                    data = {this.state.singers}
                    renderItem = {this.renderSingers.bind(this)}
                    keyExtractor = {(item,index) => index.toString()}
                />
            </List>
        )
    }
}