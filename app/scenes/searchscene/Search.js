import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SearchBar from 'react-native-searchbar'
import { Icon } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation'
import { TagSelect } from 'react-native-tag-select'


export default class Search extends Component{
    render(){
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
                    <TagSelect
                        data={data}
                        max={3}
                        itemStyle={styles.container}
                        itemLabelStyle={styles.label}
                        itemStyleSelected={styles.containerSelected}
                        itemLabelStyleSelected={styles.labelSelected}
                    />
                </View>
            </View> 
            
        )
    }

    // _handleResults(results) {
    //     this.setState({ results });
    //   }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        paddingBottom: 10,
      },
    container: {
        borderWidth: 0.8,
        borderColor: 'lightgray',    
        backgroundColor: 'white',
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

// const items = [
//     1337,
//     'janeway',
//     {
//       lots: 'of',
//       different: {
//         types: 0,
//         data: false,
//         that: {
//           can: {
//             be: {
//               quite: {
//                 complex: {
//                   hidden: [ 'gold!' ],
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     [ 4, 2, 'tree' ],
//   ];

