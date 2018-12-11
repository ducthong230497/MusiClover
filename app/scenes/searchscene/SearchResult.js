import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import SearchBar from 'react-native-searchbar'
import { Icon } from 'react-native-elements'
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import SongTab from './SongTab'
import PlaylistTab from './PlaylistTab'
import SingerTab from './SingerTab'
import ASearchPlaylist from './ASearchPlaylist'

var MainScreenNavigator = createMaterialTopTabNavigator(
    {
        Tab1: {screen: SongTab},
        Tab2: {screen: PlaylistTab},
        Tab3: {screen: SingerTab}
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

class SearchResult extends Component{

    constructor(props)
    {
        super(props);

        this.state = {
            searchString: [],
        }

        this.searchBar = React.createRef();

        this.titleResult="Kết quả tìm kiếm của '" + this.props.navigation.getParam('searchText') +"'";
    }

    render(){
        return (            
            <View style={{backgroundColor:'black', flex: 1}}>   
                <View style = {{height: 40}}>
                    <SearchBar                                              
                        placeholder={this.titleResult}
                        placeholderTextColor='white'
                        fontSize={14}
                        heightAdjust={-20}
                        backCloseSize={20}
                        textColor='white'
                        iconColor='white'
                        onBack={() => this.props.navigation.pop()}
                        backgroundColor='black'
                        
                        showOnLoad
                    />
                </View>
                <MainScreenNavigator screenProps={{ searchString: this.props.navigation.getParam('searchText'), parentNavigation: this.props.navigation}} />
        
            </View> 
        )
    }
}

export default StackNavigator = createStackNavigator({
    SearchResult: {
        screen: SearchResult,
        navigationOptions: ()=>({
            header:null,      
        })
    },
    ASearchPlaylist: {
        screen: ASearchPlaylist,
        navigationOptions: ()=>({
            headerTitle: "Playlist",     
        })
    }
},
{ //router config
    navigationOptions:{
        headerTitleStyle:{
            color: 'white'
        },
        headerStyle:{
            backgroundColor: 'rgba(30,30,30,255)',
        },
        headerBackImage: () => (
            <Icon name = 'keyboard-arrow-left' color = 'white'></Icon>
          )     
    },
    headerLayoutPreset: 'center' 
});