import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {getDataForSearching, getXmlURL, getDataFromXmlURL} from '../../connector/connector'
import { Icon, List, ListItem } from 'react-native-elements'
import {getTop100, getListArtist, getArtistInfo} from '../../connector/connector'
import {connect} from 'react-redux'

class SingerTab extends Component{
    static navigationOptions={
        tabBarLabel: 'Ca sĩ'
    }

    constructor(props)
    {
        super(props);

        this.state = {
            singers: [],
            strNotFound: false
        }
    }
    componentDidMount()
    {
        getDataForSearching(this.props.screenProps.searchString).then(result =>{
            this.setState({singers: result.singer});
            if(result.singer.length == 0){
                this.setState({strNotFound: true})
            }
            else {
                this.setState({strNotFound: false})
            }
        });
    }
    onArtistPress(link){
        console.log(link)

        getArtistInfo(link).then(result => {
            console.log(result.listSongs.length)
            this.props.dispatch({type: 'SetSinger', singerInfo: result})
        })

        this.props.screenProps.parentNavigation.navigate('ArtistInfo')
    }
    renderSingers = ({item}) => (
        <ListItem
            roundAvatar
            title={item.name} 
            titleStyle={{color: 'white'}}
            avatar={{uri: item.img}}
            containerStyle={{borderBottomWidth: 0, backgroundColor: 'black'}}
            onPress = {this.onArtistPress.bind(this, item.url)}
        />
    )

    render(){
        return (
            <View style={styles.container}>
                <Text style={this.state.strNotFound ? styles.title : styles.titleMinus}>Không có dữ liệu</Text>
                {!this.state.strNotFound?<List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
                    <FlatList
                        data = {this.state.singers}
                        renderItem = {this.renderSingers.bind(this)}
                        keyExtractor = {(item,index) => index.toString()}
                    />
                </List>:null}
            </View>
        )
    }
}

export default connect()(SingerTab);

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