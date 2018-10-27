import React, { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'

class TrackDetails extends Component{

  render (){

    //let imgFolderPath = '../../../resources/img/'; 

    return(
      <View style={styles.container}>
        <TouchableOpacity onPress = {this.props.onFavoriteButtonPress}>
          {/* <Image style={styles.button} source={require(imgFolderPath +'ic_add_circle_outline_white.png')} /> */}
          {this.props.inFavoriteList?
          <Icon name = "favorite" size = {24} color = "white"></Icon>
          :<Icon name = "favorite-border" size = {24} color = "white"></Icon>}
        </TouchableOpacity>
        <View style = {styles.detailsWrapper}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.artist}>{this.props.artist}</Text>
        </View>
        <TouchableOpacity onPress={this.props.onMoreButtonPress}>
          <View style={styles.moreButton}>
            {/* <Image style={styles.moreButtonIcon} source={require(imgFolderPath+'ic_more_horiz_white.png')} /> */}
            <Icon name = "more-horiz" size = {24} color = "white"></Icon>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default TrackDetails;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    paddingRight: 20,
  },
  detailsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  artist: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    opacity: 0.72,
  },
  moreButton: {
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 2,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButtonIcon: {
    height: 17,
    width: 17,
  }
});