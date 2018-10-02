import React, { Component } from 'react';

import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';

class Header extends Component{
  render(){
    let imgFolderPath = '../../../resources/img/'; 

    return(
      <View style={styles.container}>
        <TouchableOpacity onPress = {this.props.onHideButtonPress}>
          <Image style={styles.button}
            source={require(imgFolderPath + 'ic_keyboard_arrow_down_white.png')} />
        </TouchableOpacity>
        <Text 
          style={styles.message}>{this.props.message.toUpperCase()}
        </Text>
        <TouchableOpacity>
          <Image style={styles.button}
            source={require(imgFolderPath + 'ic_queue_music_white.png')} />
        </TouchableOpacity>
      </View>
      );
    }
}

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
  },
  message: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.72)',
    fontWeight: 'bold',
    fontSize: 10,
  },
  button: {
    opacity: 0.72
  }
});