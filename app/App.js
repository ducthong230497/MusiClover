import React, { Component } from 'react';
import {Provider} from 'react-redux'
import reduxStore from './redux/store' 
import {createBottomTabNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements'
//scenes
import SongPlayer from './scenes/songplayerscene/SongPlayer';
import Search from './scenes/searchscene/Search'
import PersonalScene from './scenes/personalscene/Personal'
import Test from './scenes/testscene/Test'
import SongPlayerAnimation from './scenes/songplayerscene/SongPlayerAnimation'

class SongScene extends Component {
  render() {
    return (
      <Provider store = {reduxStore}>
        <SongPlayer tracks={null} />
      </Provider>
    )
  }
}

class SearchScene extends Component {
  render() {
    return (
      <Provider store = {reduxStore}>
        <Search />
      </Provider>
    )
  }
}

class TestScene extends Component{
  render(){
    return (
      <Provider> 
        <Test/>
      </Provider>
    )
  }
}

export default createBottomTabNavigator(
  {
    Home: {
      screen: SongPlayerAnimation,
      navigationOptions:{
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon name = 'home' color = {tintColor}></Icon>
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
    Test:{
      screen: Test,
      
    }
  },
  { //router config
    navigationOptions:{
      tabBarVisible: true,
    },
    tabBarOptions:{
      activeTintColor: 'white',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'rgba(30,30,30,255)',
      },
    }

  }
);