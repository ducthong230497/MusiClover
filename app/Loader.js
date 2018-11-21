import React, {Component} from 'react'
import {View,StyleSheet, Dimensions, Image} from 'react-native'
import Firebase from 'react-native-firebase';
import {connect} from 'react-redux'
import {AsyncStorage} from 'react-native'

//Load Firebase data (User, OnlineData)
class Loading extends Component{

    constructor(props)
    {
        super(props);

        this.state = {
            isLoadingPlaylists: true,
            isLoadingSongs: true
        }
    }

    /**
     * When the App component mounts, we listen for any authentication
     * state changes in Firebase.
     * Once subscribed, the 'user' parameter will either be null 
     * (logged out) or an Object (logged in)
     */
    componentDidMount() {
        //load online data from firebase
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
        
        //load offline data
        this.retrieveData('playlists').then(playlists=>{
            if(playlists==null) playlists = [];
            this.props.dispatch({type: 'SetOfflinePlaylists', offlinePlaylists: playlists});
        });
        this.retrieveData('songs').then(songs=>{
            if(songs ==null) songs = [];
            this.props.dispatch({type: 'SetOfflineSongs', offlineSongs: songs});
            this.props.dispatch({type: 'SetDownloadSongs', downloadSongs: songs});
        });
    }

    retrieveData = async (name) => {
        try {
          let data = await AsyncStorage.getItem(name);
          if(data !==null)
          {
            return JSON.parse(data);
          }
         } catch (error) {
            console.log('Something wrong!' + error);
         }
    }

    /**
     * Don't forget to stop listening for authentication state changes
     * when the component unmounts.
     */
    componentWillUnmount() {
        this.authSubscription();

        this.playlistsSubscription();
        this.songsSubscription();

    }

    getUserCollection(email)
    {
        if(this.playlistsSubscription)
        {
            //stop listening first for sure
            this.playlistsSubscription();
            this.playlistsSubscription = null;
        }

        let userCollection = Firebase.firestore().collection(email).doc("OnlineData");

        this.playlistsSubscription = userCollection.collection('Playlists').onSnapshot((querySnapshot)=>{
            let onlinePlaylists = [];
            //let onlineSongs = [];
            querySnapshot.forEach((doc) => {             
                const { name, imgUrl, songCount,songs } = doc.data();

                onlinePlaylists.push({
                    name: name,
                    imgUrl: imgUrl,
                    songCount: songCount,
                    songs: songs
                });

                //onlineSongs = onlineSongs.concat(songs);

            });

            this.props.dispatch({type: 'SetOnlinePlaylists', onlinePlaylists: onlinePlaylists})
            //this.props.dispatch({type: 'SetOnlineSongs', onlineSongs: onlineSongs})
            this.setState({isLoadingPlaylists: false});
        })
        

        if(this.songsSubscription)
        {
            //stop listening first for sure
            this.songsSubscription();
            this.songsSubscription = null;
        }

        this.songsSubscription = userCollection.onSnapshot((doc)=>{
            let songs = doc.data().songs;
            if(songs==null) songs = [];
            this.props.dispatch({type: 'SetOnlineSongs', onlineSongs: songs})
            this.setState({isLoadingSongs: false});
        })
    }

    render(){

        if(!this.state.isLoadingPlaylists && !this.state.isLoadingSongs)
        {
            this.props.onLoadDone();
        }

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