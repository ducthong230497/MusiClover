import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, DrawerLayoutAndroid, TouchableHighlight} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class MyDrawer extends Component{
  openDrawer() {
    this.refs['MYDRAWER'].openDrawer()
}

  closeDrawer() {
  this.refs['MYDRAWER'].closeDrawer()
}

  render() {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#3d87ff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
        <TouchableHighlight onPress={()=>this.closeDrawer()}>
                <Text>{'Close Drawer'}</Text>
          </TouchableHighlight>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
        ref={'MYDRAWER'}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableHighlight onPress={()=>this.openDrawer()}>
                <Text>{'Open Drawer'}</Text>
          </TouchableHighlight>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 50, height: 50, backgroundColor:'powderblue', margin: 0}}></View>
          <View style={{width: 50, height: 50, backgroundColor:'skyblue', margin: 0}}></View>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <MyDrawer>
        <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        
      </View>
      </MyDrawer>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
