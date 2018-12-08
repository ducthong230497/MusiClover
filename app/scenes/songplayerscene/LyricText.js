import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
class LyricText extends Component{
    constructor(props){
        super(props)
        this.state = {
            textColor: "white"
        }
    }
    render(){
        
        if (this.props.currentPosition != null){
            //console.log("go here")
            if ((this.props.currentPosition + 1 >= this.props.lyricTime) && this.state.textColor == "white")
            {
                //console.log(this.props.text + " - " + this.props.currentPosition + " - " + this.props.lyricTime)
                this.setState({textColor: '#D269FF'})
            }
        }
        else{
            console.log("currentPosition null")
        }
        return(
            <Text style={{fontSize: 15, textAlign: 'center', color: this.state.textColor}}>{this.props.text}</Text>
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