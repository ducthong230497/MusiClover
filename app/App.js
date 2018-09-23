import React, { Component } from 'react';
import {Provider} from 'react-redux'
import reduxStore from './redux/store' 
import {createBottomTabNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements'
//scenes
import SongPlayer from './scenes/songplayerscene/SongPlayer';
import Search from './scenes/searchscene/Search'
import Personal from './scenes/personalscene/Personal'
import Test from './scenes/testscene/Test'


export const TRACKS = [
  {
    title: 'Stressed Out',
    artist: 'Twenty One Pilots',
    albumArtUrl: "http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg",
    audioUrl: "https://aredir.nixcdn.com/NhacCuaTui968/CoAySeKhongYeuAnhNhuEm-ThuMinh-5662334.mp3?st=0VXfsGDoDfGZC0ueE5-DZQ&e=1537547254",
  },
  {
    title: 'Love Yourself',
    artist: 'Justin Bieber',
    albumArtUrl: "http://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
    audioUrl: 'http://srv2.dnupload.com/Music/Album/Justin%20Bieber%20-%20Purpose%20(Deluxe%20Version)%20(320)/Justin%20Bieber%20-%20Purpose%20(Deluxe%20Version)%20128/05%20Love%20Yourself.mp3',
  },
  {
    title: 'Hotline Bling',
    artist: 'Drake',
    albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
    audioUrl: 'http://dl2.shirazsong.org/dl/music/94-10/CD%201%20-%20Best%20of%202015%20-%20Top%20Downloads/03.%20Drake%20-%20Hotline%20Bling%20.mp3',
  },
];

class SongScene extends Component {
  render() {
    return (
      <Provider store = {reduxStore}>
        <SongPlayer tracks={TRACKS} />
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

class PersonalScene extends Component {
  render() {
    return (
      <Provider store = {reduxStore}>
        <Personal />
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
      screen: SongScene,
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