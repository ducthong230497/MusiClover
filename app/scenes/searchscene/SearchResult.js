import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import SearchBar from 'react-native-searchbar'
import { Icon } from 'react-native-elements'
import { createStackNavigator, TabNavigator } from 'react-navigation'
import { TagSelect } from 'react-native-tag-select'
import {getDataForSearching, getXmlURL, getDataFromXmlURL} from '../../connector/connector'
import SongTab from './SongTab'
import VideoTab from './VideoTab'
import PlaylistTab from './PlaylistTab'
import SingerTab from './SingerTab'


var MainScreenNavigator = TabNavigator(
    {
        Tab1: {screen: SongTab},
        Tab2: {screen: VideoTab},
        Tab3: {screen: PlaylistTab},
        Tab4: {screen: SingerTab}
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: 'white',            
            inactiveTintColor: 'grey',
            indicatorStyle: {
                backgroundColor: 'green',
                height: 3,
            },
            labelStyle: {
                fontSize: 12,
                fontWeight: 'bold'
            },
            style: {
                backgroundColor: 'black',
            },
        }
    }
);

export default class SearchResult extends Component{

    constructor(props)
    {
        super(props);

        this.state = {
            searchString: [],
        }

        this.searchBar = React.createRef();

        this.titleResult="Kết quả tìm kiếm của '" + this.props.navigation.getParam('searchText') +"'";
    }

    getSongInfo(url)
    {
        console.log(url)
        //chỗ này ko dùng hàm này
        // getXmlURL(url).then(xmlUrl=> {
        //     getDataFromXmlURL(xmlUrl).then(data => {
        //         // data.URL;
        //         // data.img;

        //         this.setState({img: data.img});

        //     });
        // });
        ///////////////////////////
        // dùng hàm getEncryptKey(url)
        // rồi sau khi có encryptKey thì gọi hàm getDataFromKeyEncrypt(encrypt, 1)
        // hàm này sẽ trả về json data có 'singerTitle' 'avatar' 'title'
        ///////////////////////////
    }

    renderSongs = ({item}) => (
        <View>
            <Text>{item.singer}</Text>
            <Text>{item.name}</Text>
        </View>
    )

    handleSearching(){
        getDataForSearching(this.props.navigation.getParam('searchText')).then(result =>{
            this.setState({songs: result.song});
            // this.getSongInfo(this.state.songs[0].url);
        })
    }

    render(){
        const data = [
            { id: 1, label: 'Sơn Tùng M-TP' },
            { id: 2, label: 'bảng xếp hạng' },
            { id: 3, label: 'có ai thương em như anh' },
            { id: 4, label: 'way back home' },
            { id: 5, label: 'the show' },
        ];
        return (
            
            <View style={{backgroundColor:'black', flex: 1}}>   
                <View style = {{height: 40}}>
                    <SearchBar                                              
                        placeholder={this.titleResult}
                        placeholderTextColor='white'
                        fontSize={14}
                        //height = {40}
                        heightAdjust={-20}
                        backCloseSize={20}
                        textColor='white'
                        iconColor='white'
                        onBack={() => this.props.navigation.goBack()}
                        backgroundColor='black'

                        // ref = {this.searchBar}
                        
                        showOnLoad
                    />
                </View>
                <MainScreenNavigator screenProps={{ searchString: this.props.navigation.getParam('searchText')}} />
                
                
                

            </View> 
        )
    }
}

