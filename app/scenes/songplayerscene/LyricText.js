import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
export class LyricText extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let textColor = 'white'
        if (this.props.currentPosition != null){
            if (this.props.currentPosition >= this.props.time)
            {
                textColor = '#D269FF'
            }
        }
        else{
            console.log("currentPosition null")
        }
        return(
            <Text style={{fontSize: 15, textAlign: 'center', color: textColor}}>{this.props.text}</Text>
        )
    }
}

function mapStateToProps(state) {
    return {
      totalLength: state.songPlayer.totalLength,
      currentPosition: state.songPlayer.currentPosition,
    }
  }
  
  export default connect(mapStateToProps)(LyricText);

const styles = StyleSheet.create({
    container:{
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 10
    },
    image:{
        width: 70,
        height: 70
    },
    songButton:{
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
    },
    songInfo:{
        flexDirection: "column",
        justifyContent: "center",
        flex: 1
    },
    songName:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 20,
        flex:1
    },
    songIndex:{
        fontSize: 15,
        color: 'white',
    },
    artistName:{
        fontSize: 15,
        color: 'white',
        paddingLeft: 20,
        flex: 1
    },
    settingButton: {
        paddingRight: 5
    },
    title:{
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
      },
});