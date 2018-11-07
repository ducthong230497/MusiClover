import React, {Component} from 'react'
import {StyleSheet, View, Text, FlatList, TouchableHighlight} from 'react-native'
import {connect} from 'react-redux'
import ProgressPie from 'react-native-progress/Pie'
import {Icon} from 'react-native-elements'

class DownloadingSongs extends Component{

    renderSongs = ({index, item}) => (
        <View style={styles.songContainer}>
                <TouchableHighlight underlayColor = 'rgb(150,150,150)'>
                    <View style = {styles.songButton}>
                        <Text style = {styles.songIndex}>{index + 1}</Text>
                        <View style = {styles.songInfo}>
                            <Text style = {styles.songName}>{item.songName}</Text>
                            <Text style = {styles.artistName}>{item.artist}</Text>
                        </View>
                        {item.progress===1?
                        <Icon name ='done' size = {30} color ='green' ></Icon>
                        :<ProgressPie progress={item.progress} size={30} color = "white"></ProgressPie>}
                    </View>
                </TouchableHighlight>
            </View>
    );


    render(){

        return (
            <View style = {styles.container}>
                <FlatList
                        data={this.props.downloadingSongs}
                        renderItem={this.renderSongs.bind(this)}
                        keyExtractor = {(item, index)=>index.toString()}>
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(4,4,4)'
    },
    header:{
        color: "white",
        alignSelf: "center",
        margin: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    songContainer:{
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 10
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
});

function mapStateToProps(state){
    return {
        downloadingSongs: state.download.downloadingSongs
    }
}

export default connect(mapStateToProps)(DownloadingSongs);



