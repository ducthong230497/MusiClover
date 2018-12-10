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
            strNotFound: false
        }
    }
    componentDidMount()
    {
        getDataForSearching(this.props.screenProps.searchString).then(result =>{
            this.setState({videos: result.video});
            if(result.video.length == 0){
                this.setState({strNotFound: true})
            }
            else {
                this.setState({strNotFound: false})
            }
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
            <View style={styles.container}>
                <Text style={this.state.strNotFound ? styles.title : styles.titleMinus}>Không có dữ liệu</Text>
                <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
                    <FlatList
                        data = {this.state.videos}
                        renderItem = {this.renderVideos.bind(this)}
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
        marginTop: 5,
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