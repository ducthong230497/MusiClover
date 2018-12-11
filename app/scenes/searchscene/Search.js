import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import SearchBar from 'react-native-searchbar'
import { Icon, List, ListItem } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation'
import SearchResult from "./SearchResult"
import {AsyncStorage} from 'react-native'
import ASearchPlaylist from './ASearchPlaylist'

export class Search extends Component{

    constructor(props)
    {
        super(props);
        this.state= {
            searchHistory: []
        }
        this.searchBar = React.createRef();
    }

    componentDidMount()
    {
        this.retrieveData('history').then(result=>{
            if(result !=null)
            {
                this.setState({searchHistory: result});
            }
        })
    }

  

    onSearchPress(text)
    {
        this.searchBar.current.setValue(text);
        this.handleSearching(text);
    }

    renderSearchHistory = ({item}) => (
        <ListItem
            title={item} 
            titleStyle={{color: 'white'}}
            containerStyle={{borderBottomWidth: 0, backgroundColor: 'black'}}
            onPress = {this.onSearchPress.bind(this, item)}
        />
    )

    handleSearching(overrideText=null){
        let text = overrideText==null?this.searchBar.current.getValue():overrideText;

        let history = this.state.searchHistory.concat([text]);
        this.setState({searchHistory: history});

        this.storeData('history', JSON.stringify(history));

        this.props.navigation.navigate('SearchResult', {searchText: text});
    }
    

    storeData = async (name, value) => {
        try {
          await AsyncStorage.setItem(name, value);
        } catch (error) {
          console.log('Something went wrong!');
        }
    }

    
    retrieveData = async (name) => {
        try {
            let data = await AsyncStorage.getItem(name);
            if(data !==null)
            {
                return JSON.parse(data);
            }
        } catch (error) {
            console.log('Something wrong!' + error);
        }
    }

    render(){
        return (
            <View style={{backgroundColor:'black', flex: 1}}>
                <SearchBar         
                    backgroundColor='black'                                     
                    placeholder="Nhập từ khóa"
                    placeholderTextColor='white'
                    fontSize={14}
                    heightAdjust={-20}
                    backCloseSize={20}
                    textColor='white'
                    iconColor='white'
                    
                    onBack={() => this.props.navigation.goBack()}

                    ref = {this.searchBar}                        
                    onSubmitEditing={this.handleSearching.bind(this)}

                    showOnLoad
                />
                <View style={{paddingTop: 60, paddingLeft: 10}}>
                    <Text style={styles.titleText}>LỊCH SỬ TÌM KIẾM</Text>
            
                    <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
                        <FlatList
                            data = {this.state.searchHistory.reverse()}
                            renderItem = {this.renderSearchHistory.bind(this)}
                            keyExtractor = {(item,index) => index.toString()}
                        />
                    </List>
                </View>
                
            </View> 
            
        )
    }
}

export default StackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: ()=>({
            header:null,      
        })
    },
    SearchResult: {
        screen: SearchResult,
        navigationOptions: ()=>({
            header: null,     
        })
    }
});

const styles = StyleSheet.create({
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        paddingBottom: 10,
      },
    container: {
        borderWidth: 0.8,
        borderColor: 'lightgray',    
        backgroundColor: 'white',
        borderRadius: 20,
        height: 40,
    },
    label: {
        color: '#2facf9',
        fontSize: 14,
    },
    containerSelected: {
        backgroundColor: 'lightskyblue',
    },
    labelSelected: {
        color: '#2facf9',
    },
});