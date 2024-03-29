import React, {Component} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {createStackNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements'

import CategoryButton from './children/CategoryButton'
import AOnlinePlaylist from './AOnlinePlaylist' 
import AOfflinePlaylist from './AOfflinePlaylist' 
import OnlinePlaylists from './OnlinePlaylists'
import OfflinePlaylists from './OfflinePlaylists'
import OnlineSongs from './OnlineSongs'
import OfflineSongs from './OfflineSongs'
import DownloadHistory from './DownloadHistory'

class Personal extends Component{

    constructor(props)
    {
        super(props);
    }

    onOnlinePlaylistsButtonPress()
    {
        this.props.navigation.navigate('OnlinePlaylists');
    }

    onOnlineSongsButtonPress()
    {
        this.props.navigation.navigate('OnlineSongs')
    }

    render(){

        return (
            <View style = {styles.container} >
                <View style ={styles.subcontainer}>
                    <Text style = {styles.header}>ONLINE MUSIC</Text>
                    <CategoryButton 
                        text = 'Playlists' 
                        iconName = 'queue-music' 
                        onPress = {this.onOnlinePlaylistsButtonPress.bind(this)}>
                    </CategoryButton>
                    <CategoryButton 
                        text = 'Songs' 
                        iconName = 'music-note' 
                        onPress = {this.onOnlineSongsButtonPress.bind(this)}>
                    </CategoryButton>
                </View>
                <View style ={styles.subcontainer}>
                    <Text style = {styles.header}>OFFLINE MUSIC</Text>
                    <CategoryButton 
                        text = 'Playlists' 
                        iconName = 'queue-music' 
                        onPress = {()=>this.props.navigation.navigate('OfflinePlaylists')}>
                    </CategoryButton>
                    <CategoryButton 
                        text = 'Songs' 
                        iconName = 'music-note' 
                        onPress = {()=>this.props.navigation.navigate('OfflineSongs')}>>
                    </CategoryButton>
                    <CategoryButton 
                        text = 'Download History' 
                        iconName = 'cloud-download' 
                        onPress = {()=>this.props.navigation.navigate('DownloadHistory')}>>
                    </CategoryButton>
                </View>
            </View>
        )

    }
}

export default StackNavigator = createStackNavigator({
    Personal: {
        screen: Personal,
        navigationOptions: ()=>({
            header:null,      

        })
    },
    OnlinePlaylists: {
        screen: OnlinePlaylists,
        navigationOptions: ()=>({
            headerTitle:'Online Playlists',     
        })
    },
    OfflinePlaylists: {
        screen: OfflinePlaylists,
        navigationOptions: ()=>({
            headerTitle:'Offline Playlists',     
        })
    },
    OnlineSongs: {
        screen: OnlineSongs,
        navigationOptions: ()=>({
            headerTitle:'Online Songs',     
        })
    },
    OfflineSongs: {
        screen: OfflineSongs,
        navigationOptions: ()=>({
            headerTitle:'Offline Songs',     
        })
    },
    DownloadHistory: {
        screen: DownloadHistory,
        navigationOptions: ()=>({
            headerTitle:'Download History',     
        })
    },
    AOnlinePlaylist:{
        screen: AOnlinePlaylist,
        navigationOptions: ()=>({
            headerTitle:'Playlist',     
        })
    },
    AOfflinePlaylist:{
        screen: AOfflinePlaylist,
        navigationOptions: ()=>({
            headerTitle:'Playlist',     
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
    container:{
        flex: 1,
        backgroundColor: 'rgb(4,4,4)'
    },
    subcontainer:{
        justifyContent: 'flex-start',
    },
    header:{
        textAlign: 'left',
        color: 'rgba(255, 255, 255, 255)',
        fontWeight: 'bold',
        fontSize: 40,
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 0.4,
    }
});


