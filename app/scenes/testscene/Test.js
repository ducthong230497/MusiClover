import React, {Component} from 'react'
import {View,Text ,StatusBar} from 'react-native'

export default class Search extends Component{

    componentDidMount(){
        return fetch('https://www.nhaccuatui.com/flash/xml?html5=true&key1=1086ec88341c5050fc515be71ec1b844')
          .then((response) => {
            //console.log(response._bodyInit)
            let re = /<location>\n\s\s\s\s\s\s\s\s(.*)\n\s\s\s\s<\/location>/ig;
            
            let result = response._bodyInit.match(re);
            console.log(result[0])

            let regexString = /(<([^>]+)>)/ig;

            let cdataURL = result[0].match(regexString)
            console.log(cdataURL[1])

            let url = cdataURL[1].toString().replace("<![CDATA[", "").replace("]]>","")
            console.log(url)
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
