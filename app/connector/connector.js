export async function getTop100(url)
{
    //getDataForSearching("lac troi")
    getDataFromKeyEncrypt("68584e88cf4d193d9a0f6e799c6228e5", typeEnum.SONG)
    let listSong = [];
    url = url == null ? 'https://www.nhaccuatui.com/playlist/top-100-nhac-tre-hay-nhat-va.m3liaiy6vVsF.html' : url 
    await fetch(url).then((response) => {
            let re = /<ul class="list_song_in_album">([\s\S]*?)<\/ul>/ig;

            let result = response._bodyInit.match(re)
            //console.log(result[0])

            let regexListSong = /<li([\s\S]*?)<\/li>/ig
            let listItemSong = result[0].toString().match(regexListSong)
            //console.log(listItemSong[0])

            let regexSongItem = /<meta content="(.*?)"/ig

            listItemSong.forEach(element => {
                //let singer = element.toString().match(/titleplay="(.*?)"/ig)
                let singerName = /titleplay="(.*?)"/ig.exec(element.toString())[1].toString().split("-")[1].trim()
                //console.log(singer)

                let match = element.toString().match(regexSongItem)
                let songName = match[0].toString().replace("<meta content=\"", "").replace("\"", "")
                let songURL = match[1].toString().replace("<meta content=\"", "").replace("\"", "")

                // let xmlURL = GetXmlURL(songURL)
                // console.log(xmlURL)
                // GetXmlURL(songURL).then(xmlURL=>{
                //     //console.log(xmlURL)
                //     GetData(xmlURL).then(data => {
                //         mp3URL = data.mp3URL
                //         avatar = data.img
                //         Test(mp3URL, avatar, data.mp3URL, data.img)
                //     })
                // })

                //console.log(mp3URL)
                //console.log(avatar)
                let songInfo = { 
                    songName: songName, 
                    artist: singerName,
                    songURL: songURL
                }
                listSong.push(songInfo)
            });
            //GetData("https://www.nhaccuatui.com/flash/xml?html5=true&key1=9b8d0bd51148f40900a2f15ecb9ef6ba")
        }).catch((error) => {
            console.error(error);
        });
        //getTop100Avatar(url)
        return listSong;
}

export async function getXmlURL(url){
    let xmlURL
    //console.log("url: "+url)
    await fetch(url).then((response) => {
        let regXmlURL = /xmlURL = "(.*)"/
        //xmlURL = (response._bodyInit.toString().match(regXmlURL).toString().replace("xmlURL = \"", "").replace("\"", ""));
        xmlURL = response._bodyInit.toString().match(regXmlURL)[1].toString()
        //console.log("inside: "+xmlURL)
    }).catch(err=>console.error(err))
    //console.log("before return:"+ xmlURL)
    return xmlURL
}

//
export async function getDataFromXmlURL(xmlURL){
    let data = {}
    await fetch(xmlURL).then(response => {
        let regexLocation = /<location>([\s\S]*?)<\/location>/
        let regexAvatar = /<avatar([\s\S]*?)<\/avatar>/
        let regexCDATA = /<!\[CDATA\[([\s\S]*?)\]\]>/

        //let mp3URL = response._bodyInit.toString().match(regexLocation).toString().match(regexCDATA)[1].toString().replace("<![CDATA[", "").replace("]]>", "")
        //let avatar = response._bodyInit.toString().match(regexAvatar).toString().match(regexCDATA)[1].toString().replace("<![CDATA[", "").replace("]]>", "")
        let mp3URL = response._bodyInit.toString().match(regexLocation).toString().match(regexCDATA)[1].toString()
        let avatar = response._bodyInit.toString().match(regexAvatar).toString().match(regexCDATA)[1].toString()
        //console.log("location: " +mp3URL+ " end")
        data = {URL: mp3URL, img: avatar}
    }).catch(err=>console.error(err))
    return data
}

// encryptkey is used for crawling data on mobile website
export async function getEncryptKey(url){
    let encryptKey
    await fetch(url).then(response => {
        let regexEncryptKey = /encryptkey="([\s\S]*?)"/
        encryptKey = response._bodyInit.match(regexEncryptKey)[1].toString()
    })
    return encryptKey
}

var typeEnum = {
    SONG: 1,
    PLAYLIST: 2,
    VIDEO: 3, // we dont use this for now
  };
var mediaInfoUrl = "https://m.nhaccuatui.com/ajax/get-media-info?key1=&key2=&key3=&ip="

export async function getDataFromKeyEncrypt(encryptKey, Enum){
    let url
    if(Enum == typeEnum.SONG)
        url = mediaInfoUrl.replace("key1=", "key1="+encryptKey)
    else if(Enum == typeEnum.PLAYLIST)
        url = mediaInfoUrl.replace("key2=", "key2="+encryptKey)
    else if(Enum == typeEnum.VIDEO)
        url = mediaInfoUrl.replace("key3=", "key3="+encryptKey)
    console.log(url)

    try {
        let response = await fetch(
            url
        );
        let responseJson = await response.json();
        console.log(responseJson.data.location)
        return responseJson.data // in this variable we have 'singerTitle' 'avatar' 'title'
    } catch (error) {
        console.error(error);
    }
}

export async function getTop100Avatar(url){
    let avatar
     await fetch(url).then(response => {
        let regexAvatar = /<link rel="image_src" href="([\s\S]*?)"/;
        
        avatar = response._bodyInit.toString().match(regexAvatar)[1].toString()
    }).catch(err => console.error(err))
    // ==console.log("avatar: " + avatar)
    return avatar
}

/*
===========================================================================================================
    * this search function return json data containing 'song' 'singer' 'playlist' 'video'
    * remember to check if its length is greater than 0 before using it (ex: reponseJson.song.length > 0)
    * each has 3 properties: 'singer' 'name' 'url'
    * note that this url is mobile which start with 'https://m.nhaccuatui.com/'
    * we will use another function to crawl data from this url
===========================================================================================================
*/
export async function getDataForSearching(strSearch){
    strSearch = strSearch.replace(" ", "%20")
    let result = {}
    let str = "https://m.nhaccuatui.com/ajax/search?q=" + strSearch
    console.log(str)

    try {
        let response = await fetch(
            str
        );
        let responseJson = await response.json();
        console.log(responseJson.data.song[0].url)
        return responseJson.data
    } catch (error) {
        console.error(error);
    }
}

/*
===========================================================================================================
===========================================================================================================
*/

export async function getListArtist(){
    let strListArtist
    let listArtist = []
    await fetch('https://m.nhaccuatui.com/nghe-si.html').then(response => {
        //console.log("response: " + response._bodyInit)
        let regexListArtist = /<ul id="ul_listItem">([\s\S]*?)<\/ul>/ig;
        //let regexListArtist = /<div class="box_title_genre">([\s\S]*?)<\/div>/ig;
        
        //strListArtist = response._bodyInit.toString().match(regexListArtist).toString().replace('<div class="box_title_genre">', "").replace('</div>', '').trim()
        strListArtist = regexListArtist.exec(response._bodyInit.toString())[1].toString().trim()
        //console.log(strListArtist)

        let regexArtist = /<li class="artist_item_single">([\s\S]*?)<\/li>/ig
        let listArtistInString = regexArtist.exec(strListArtist)
        listArtistInString.forEach(element => {
            console.log(element)
        });
    })
    return strListArtist
}