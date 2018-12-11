import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getDataForSearching, getXmlURL, getDataFromXmlURL, getListArtist } from '../../connector/connector'
import { Icon, List, ListItem } from 'react-native-elements'
import {getListBaiHat} from '../../connector/connector'
import {connect} from 'react-redux'

class PlaylistTab extends Component {
    static navigationOptions = {
        tabBarLabel: 'Playlist'
    }
    constructor(props) {
        super(props);

        this.state = {
            playlists: [],
            strNotFound: false
        }
    }
    componentDidMount() {
        getDataForSearching(this.props.screenProps.searchString).then(result => {
            this.setState({ playlists: result.playlist });
            if (result.playlist.length == 0) {
                this.setState({ strNotFound: true })
            }
            else {
                this.setState({ strNotFound: false })
            }
        });
    }

    onPlaylistPress(playlist)
    {
        getListBaiHat(playlist.url).then(result=>{
            this.props.dispatch({type: 'AddPlaylist', name: 'Search', playlist: result})
        })

        // getTop100(link).then(result => {
            
        //     this.props.dispatch({type: 'AddPlaylist', name: 'Home', playlist: result})
        // })

        this.props.screenProps.parentNavigation.navigate('ASearchPlaylist'); 

    }

    renderPlaylists = ({ item }) => (
        <ListItem
            title={item.name}
            titleStyle={{ color: 'white' }}
            subtitle={item.singer}
            onPress = {this.onPlaylistPress.bind(this, item)}
            //avatar={{uri: <link_image>}}
            containerStyle={{ borderBottomWidth: 0, backgroundColor: 'black' }}
        />
    )

    render() {
        return (
            <View style={styles.container}>
                <Text style={this.state.strNotFound ? styles.title : styles.titleMinus}>Không có dữ liệu</Text>
                {!this.state.strNotFound?<List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                    <FlatList
                        data={this.state.playlists}
                        renderItem={this.renderPlaylists.bind(this)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </List>:null}
            </View>
        )
    }
}

export default connect()(PlaylistTab);

// export default StackNavigator = createStackNavigator({
//     PlaylistTab: {
//         screen: PLTab,
//         navigationOptions: ()=>({
//             header:null,      
//         })
//     },
//     ASearchPlaylist: {
//         screen: ASearchPlaylist,
//         navigationOptions: ()=>({
//             header: null,     
//         })
//     },
// });

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(4,4,4)',
        flex: 1,
    },
    space: {
        height: 50
    },
    title: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center'
    },
    titleMinus: {
        fontSize: 12,
        marginTop: -20,
        color: 'white',
        textAlign: 'center'
    },
});