import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SearchBar from 'react-native-searchbar'
import { black } from 'ansi-colors';

class ArtistScene extends Component {

    componentDidMount() {
       
    }

    render() {
        const data = [
            { id: 1, label: 'Sơn Tùng M-TP' },
            { id: 2, label: 'bảng xếp hạng' },
            { id: 3, label: 'có ai thương em như anh' },
            { id: 4, label: 'way back home' },
            { id: 5, label: 'the show' },
        ];
        return (
            <View style={{backgroundColor:'white', flex: 1}}>
                <View>
                    <SearchBar
                        // ref={(ref) => this.searchBar = ref}
                        // data={items}
                        // handleResults={this._handleResults}
                        placeholder="Nhập từ khóa"
                        placeholderTextColor='gray'
                        fontSize={14}
                        heightAdjust={-20}
                        backCloseSize={20}
                        onBack={() => this.props.navigation.goBack()}
                        showOnLoad
                    />
                </View>
                <View style={{paddingTop: 60, paddingLeft: 10}}>
                    <Text style={styles.titleText}>TỪ KHÓA HOT</Text>
                    
                </View>
            </View> 
            
        )
    }
}

export default ArtistScene;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
      }
})
