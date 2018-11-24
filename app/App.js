import React, { Component } from 'react';
import { View } from 'react-native';
import {Provider} from 'react-redux'
import reduxStore from './redux/store' 
import {createBottomTabNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements'
//scenes
import SongPlayerMaximizer from './scenes/songplayerscene/SongPlayerMaximizer';
import SongPlayerMinimizer from './scenes/songplayerscene/SongPlayerMinimizer';
import SongPlayer from './scenes/songplayerscene/SongPlayer';
import SearchScene from './scenes/searchscene/Search'
import PersonalScene from './scenes/personalscene/Personal'
import ArtistScene from './scenes/artistscene/Artist'
import ArtistInfo from './scenes/artistscene/ArtistInfo'
import HomeScene from './scenes/homescene/Home'
import SettingScene from './scenes/settingscene/Setting'

import Loader from './Loader'

export default class App extends Component{

  constructor(props)
  {
    super(props);

    this.state = {
      loading: true,
      isLoaderVisible: true 
    }
  }

  onLoadDone()
  {
    setTimeout(() => {
      this.setState({loading: false, isLoaderVisible: false});
    }, 1000);
  }

  render()
  {
    return (
        <Provider store = {reduxStore}>
          <View style = {styles.container}>	
          
              <Loader 
                onLoadDone={this.onLoadDone.bind(this)}
                isVisible = {this.state.isLoaderVisible}
              />

              {this.state.loading
              ?null
              :<View style = {styles.container}>
                <AppNavigator></AppNavigator>
                <SongPlayer></SongPlayer>
                <SongPlayerMaximizer></SongPlayerMaximizer>
                <SongPlayerMinimizer></SongPlayerMinimizer>
              </View>
              }

            </View>
        </Provider>
    );
  }

}

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScene,
      navigationOptions:{
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon name = 'home' color = {tintColor}></Icon>
        )
      }
    },
    Artist:{
      screen: ArtistScene,
      navigationOptions:{
        tabBarLabel: 'Artist',
        tabBarIcon: ({tintColor}) => (
          <Icon name = 'person' color = {tintColor}></Icon>
        )
      }
    },
    Personal: {
      screen: PersonalScene,
      navigationOptions:{
        tabBarLabel: 'Personal',
        tabBarIcon: ({tintColor}) => (
          <Icon name = 'person' color = {tintColor}></Icon>
        )
      }
    },
    Search: {
      screen: SearchScene,
      navigationOptions:{
        tabBarLabel: 'Search',
        tabBarIcon: ({tintColor}) => (
          <Icon name = 'search' color = {tintColor}></Icon>
        )
      }
    },
    Settings: {
      screen: SettingScene,
      navigationOptions:{
        tabBarLabel: 'Settings',
        tabBarIcon: ({tintColor}) => (
          <Icon name = 'settings' color = {tintColor}></Icon>
        )
      }
    }
  },
  { //router config
    initialRouteName: 'Home',
    navigationOptions:{
      tabBarVisible: true,
    },
    tabBarOptions:{
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'rgba(30,30,30,255)',
      },
    },
  }
);

// const AppNavigator = createStackNavigator({
//   Main: {
//       screen: BottomNavigator,
//       navigationOptions: ()=>({
//           header:null,      

//       })
//   },
//   SongPlayer: {
//       screen: SongPlayer,
//       navigationOptions: ()=>({
//           header: null,
//       })
//   },
// },
// );

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  }
};