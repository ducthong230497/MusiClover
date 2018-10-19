import React, {Component} from 'react'
import {View,StyleSheet, Dimensions, Image} from 'react-native'
import Firebase from 'react-native-firebase';
import {connect} from 'react-redux'

//Load Firebase data (User, OnlineData)
class Loading extends Component{

    constructor(props)
    {
        super(props);

    }

    /**
     * When the App component mounts, we listen for any authentication
     * state changes in Firebase.
     * Once subscribed, the 'user' parameter will either be null 
     * (logged out) or an Object (logged in)
     */
    componentDidMount() {
        this.authSubscription = Firebase.auth().onAuthStateChanged((user) => {
            this.props.dispatch({type: 'SetUser', user: user});
            if(user)
            {
                this.getUserCollection(user.email);
            }
            else
            {
                this.props.onLoadDone();
            }
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
        if(this.databaseSubscription)
        {
            //stop listening first for sure
            this.databaseSubscription();
            this.databaseSubscription = null;
        }

        this.databaseSubscription = Firebase.firestore().collection(email).doc("OnlineData").collection('Playlists').onSnapshot((querySnapshot)=>{
            const onlinePlaylists = [];
            const onlineSongs = [];
            querySnapshot.forEach((doc) => {             
                const { name, imgUrl, songCount,songs } = doc.data();

                onlinePlaylists.push({
                    name: name,
                    imgUrl: imgUrl,
                    songCount: songCount,
                    songs: songs
                });
                
                onlineSongs.push(songs);
            });

            this.props.dispatch({type: 'SetOnlinePlaylists', onlinePlaylists: onlinePlaylists, onlineSongs: onlineSongs})

            this.props.onLoadDone();
        }) 
    }

    render(){

        if(!this.props.isVisible)
        {
            return null;
        }

        let imageURI = '../resources/img/logo.png'; 

        return(
        <View style = {styles.container}>
            <Image
                style={styles.image}
                source={require(imageURI)}
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