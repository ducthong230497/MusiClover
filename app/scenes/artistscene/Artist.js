import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {getTop100, getListArtist, getArtistInfo} from '../../connector/connector'
import ArtistButton from './ArtistButton';
import {connect} from 'react-redux';
import {createStackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements'
import ArtistInfo from './ArtistInfo';


class ArtistScene extends Component {

    constructor(props){
        super(props);
        this.state = {
            listArtist: []
        };
        
    }

    componentDidMount() {
        getListArtist().then(result => {
            console.log(result.length)
            this.setState({listArtist: [...this.state.listArtist].concat(result)})
        })
    }
    onArtistPress(link){
        console.log(link)

        getArtistInfo(link).then(result => {
            console.log(result.listSongs.length)
            this.props.dispatch({type: 'SetSinger', singerInfo: result})
        })

        this.props.navigation.navigate('ArtistInfo')
    }
    renderArtist = ({item}) => (
        //<Text style = {styles.title}>"aaa"</Text>
        <ArtistButton
            name = {item.name}
            imgUrl = {item.image}
            link = {item.link}
            onPress = {this.onArtistPress.bind(this)}
        />
    )

    render() {
        //let singerInfo = this.props.playlists.find(info => playlist.name === 'Home')
        return (
            <View style = {styles.container}>
                <FlatList
                    data = {this.state.listArtist}
                    renderItem = {this.renderArtist.bind(this)}
                    keyExtractor = {item => item.name}
                    numColumns={2}
                />
            </View>
        )
    }
}

const Artist =  connect()(ArtistScene);

export default ArtistNavigator = createStackNavigator(
    {
    ArtistScene: {
        screen: Artist,
        navigationOptions: ()=>({
            header:null,      

        })
    },
    ArtistInfo:{
        screen: ArtistInfo,
        navigationOptions: ()=>({
            headerTitle:'Artist',     
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
}
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(4,4,4)',
        flex: 1
      },
      title:{
        fontSize: 12,
        marginTop: 5,
        marginBottom: 2,
        color: 'white',
    }
})
