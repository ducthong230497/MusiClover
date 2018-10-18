import React, {Component} from 'react'
import {View,StyleSheet, Dimensions, Image} from 'react-native'
import Firebase from 'react-native-firebase';
import {connect} from 'react-redux'

class Loading extends Component{


    /**
     * When the App component mounts, we listen for any authentication
     * state changes in Firebase.
     * Once subscribed, the 'user' parameter will either be null 
     * (logged out) or an Object (logged in)
     */
    componentDidMount() {
        this.authSubscription = Firebase.auth().onAuthStateChanged((user) => {
            this.props.dispatch({type: 'SetUser', user: user});
            this.getUserCollection(user.email);
            this.props.onLoadDone();
        });
    }

    /**
     * Don't forget to stop listening for authentication state changes
     * when the component unmounts.
     */
    componentWillUnmount() {
        this.authSubscription();
        this.databaseSubscription();
    }

    getUserCollection(email)
    {
        this.userCollection = Firebase.firestore().collection(email);

        this.databaseSubscription = this.userCollection.doc("OnlineData").collection('Playlists').onSnapshot((querySnapshot)=>{
            const playlists = [];
            querySnapshot.forEach((doc) => {             
                const { name, imgUrl, songCount,songs } = doc.data();
                playlists.push({
                    name: name,
                    imgUrl: imgUrl,
                    songCount: songCount,
                    songs: songs
                });
            });

            this.props.dispatch({type: 'SetOnlinePlaylists', onlinePlaylists: playlists})
        }) 
    }

    render(){

        let imgFolderPath = '../resources/img/'; 

        return(
        <View style = {styles.container}>
            <Image
                style={styles.image}
                source={require(imgFolderPath + 'logo.png')}
            />
        </View>
        )

    }
}

export default connect()(Loading);


const { width } = Dimensions.get('window');
const imageSize = width/3;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgb(4,4,4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: imageSize,
        height: imageSize,
    },
});