import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import SearchBar from 'react-native-searchbar'
import { Icon, List, ListItem } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation'
import { TagSelect } from 'react-native-tag-select'
import {getDataForSearching, getXmlURL, getDataFromXmlURL} from '../../connector/connector'
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
    //Ê, cái lịch sử cập nhật lại lúc đã search rồi hiện lên luôn
    //Bỏ vô chỗ cho lấy dữ liệu 1 lần có đúng hông ?
    //Chua hieu y ba lam, doi tui noi xong cai nay

    componentDidMount()
    {
        //lay du lieu da luu tu local 
        this.retrieveData('history').then(result=>{

            if(result !=null)
            {
                //nen luu cai searchHistory nay vao state vi chut nua xuong duoi ba se render no
                //co le ba se nghi la dung this.searchHistory duoc khong? cung duoc nhung ma gia su chut ba cap nhat
                //cai this.searchHistory nay lai vi du nhu them mot cai ket qua vo thi no khong tu dong goi render lai
                //dung state thi chut cap nhat no se tu render
                //doi ten de tranh ba nham lan 
                //the la lay duoc du lieu da luu roi, gio chi can render cai this.state.searchHistory thoi
                this.setState({searchHistory: result});


            }


        })
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
        ///////////////////////////r
    }

    onSearchPress(text)
    {
        this.searchBar.current.value = text;
        this.forceUpdate();
    }

    renderSearchHistory = ({item}) => (
        <ListItem
            title={item} 
            titleStyle={{color: 'white'}}
            containerStyle={{borderBottomWidth: 0, backgroundColor: 'black'}}
            onPress = {this.onSearchPress.bind(this, item)}
        />
    )

    handleSearching(){
        // console.log("RESULT " + this.inputSearch.current.getValue());
        // getDataForSearching(this.inputSearch.current.getValue()).then(result =>{
        //     console.log(result);
        //     this.setState({songs: result.song});
        //     // this.getSongInfo(this.state.songs[0].url);
        // })
        let text = this.searchBar.current.getValue();

        //luu xuong local
        //value phai la kieu dang string (co le)
        //quay lai van de o day, neu ba set cai history = [text] nhu nay thoi thi no luu xuong cai local moi cai [text] thoi
        //chu no khong tu them vao may cai ba da luu truoc do. vay nen truoc khi luu thi phai noi ket qua truoc do voi cai text moi nay
        //dung ham concat
        //roi noi chung la het roi do
        //a quen nho cap nhat lai cai searchHistory nua de cai render no render them cai moi nua
        let history = this.state.searchHistory.concat([text]);
        this.setState({searchHistory: history});

        //roi xong roi do
        //Ờ, t làm tiếp :))
        //uk lam di, chut tinh tiep

        //JSON.stringtify de doi object thanh dang chuoi
        //roi the la save duoc data xong local (tuy nhien can phai chinh mot chut, cho ti)
        this.storeData('history', JSON.stringify(history));

        this.props.navigation.navigate('SearchResult', {searchText: text});
    }
    
    //ham de save xuong 
    storeData = async (name, value) => {
        try {
          await AsyncStorage.setItem(name, value);
        } catch (error) {
          console.log('Something went wrong!');
        }
    }

      //lay du lieu
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
                    {/* <TagSelect
                        data={data}
                        max={3}
                        itemStyle={styles.container}
                        itemLabelStyle={styles.label}
                        itemStyleSelected={styles.containerSelected}
                        itemLabelStyleSelected={styles.labelSelected}
                    /> */}
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