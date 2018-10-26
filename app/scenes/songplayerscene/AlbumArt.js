import React, { Component } from 'react';

import {View,StyleSheet,Image,TouchableOpacity,Dimensions} from 'react-native';

class AlbumArt extends Component {

  render(){

    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={{uri: this.props.url}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default AlbumArt;

const { width, height } = Dimensions.get('window');
const imageSize = width - 48;

const styles = StyleSheet.create({
  container: {
    flex: 10,
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: "center",
  },
  image: {
    width: imageSize,
    height: imageSize,
  },
})