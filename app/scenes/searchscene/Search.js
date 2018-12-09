import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import SearchBar from 'react-native-searchbar'
import { Icon } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation'
import { TagSelect } from 'react-native-tag-select'
import {getDataForSearching, getXmlURL, getDataFromXmlURL} from '../../connector/connector'
import SearchResult from "./SearchResult"

export class Search extends Component{

    constructor(props)
    {
        super(props);
        this.searchBar = React.createRef();
    }

    // componentDidMount()
    // {
    //     getDataForSearching(this.state.inputSearchBar).then(result =>{
    //         this.setState({songs: result.song});
    //         this.getSongInfo(this.state.songs[0].url);
    //     })
    // }

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

    // renderSongs = ({item}) => (
    //     <View>
    //         <Text>{item.singer}</Text>
    //         <Text>{item.name}</Text>
    //     </View>
    // )

    handleSearching(){
        // console.log("RESULT " + this.inputSearch.current.getValue());
        // getDataForSearching(this.inputSearch.current.getValue()).then(result =>{
        //     console.log(result);
        //     this.setState({songs: result.song});
        //     // this.getSongInfo(this.state.songs[0].url);
        // })
        let text = this.searchBar.current.getValue();
        this.props.navigation.navigate('SearchResult', {searchText: text});
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
                    {/* <TagSelect
                        data={data}
                        max={3}
                        itemStyle={styles.container}
                        itemLabelStyle={styles.label}
                        itemStyleSelected={styles.containerSelected}
                        itemLabelStyleSelected={styles.labelSelected}
                    /> */}
                </View>
                {/* <FlatList
                    data = {this.state.songs}
                    renderItem = {this.renderSongs.bind(this)}
                    keyExtractor = {(item,index) => index.toString()}
                /> */}
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
    },
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