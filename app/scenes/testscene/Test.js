import React, {Component} from 'react'
import {View,Text ,StatusBar} from 'react-native'


export default class Search extends Component{

    componentDidMount(){
        return fetch('https://www.nhaccuatui.com/flash/xml?html5=true&key1=1086ec88341c5050fc515be71ec1b844')
          .then((response) => {
            console.log(response._bodyInit)
            let re = new RegExp("<location>...</location>");
            let a = re.test(response._bodyInit);
            console.log(a);
            re.test()
          }).catch((error) =>{
            console.error(error);
          });
      }

    render(){
        console.log(123)
        return (
            <View style = {{flex: 1,alignItems: 'center', justifyContent: 'center' }} >
               <Text>this is Test scene</Text>
            </View>


        )

    }

}
